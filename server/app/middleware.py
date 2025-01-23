import json
from .models import RequestLog
from django.http import RawPostDataException

class RequestLoggingMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)
        self.log_request(request)
        return response

    def log_request(self, request):
        try:
            if request.method == 'POST':
                body = request.body.decode('utf-8')
            else:
                body = ''
        except RawPostDataException:
            body = ''

        RequestLog.objects.create(
            method=request.method,
            endpoint=request.path,
            ip_address=self.get_client_ip(request),
            headers=json.dumps(dict(request.headers)),
            body=body
        )

    def get_client_ip(self, request):
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            ip = x_forwarded_for.split(',')[0]
        else:
            ip = request.META.get('REMOTE_ADDR')
        return ip