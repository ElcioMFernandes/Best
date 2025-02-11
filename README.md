## Preparando o ambiente

Ao fazer a cópia do repositório, você verá que existem dois diretórios principais: `client` e `server`. O `client` contém o frontend e o `server` o backend.

### Configuração do Client (Frontend)
1. Acesse o diretório `client`.
2. Execute o comando:
   ```sh
   npm install
   ```
   Isso instalará todas as dependências do projeto.

### Configuração do Server (Backend)
1. Acesse o diretório `server`.
2. Crie um ambiente virtual com o comando:
   ```sh
   py -m venv venv
   ```
3. Ative o ambiente virtual:
   - No Windows:
     ```sh
     venv\Scripts\activate
     ```
   - No Linux/Mac:
     ```sh
     source venv/bin/activate
     ```
4. Instale as dependências do projeto:
   ```sh
   pip install -r requirements.txt
   ```
   Esse comando instalará todas as bibliotecas listadas no arquivo `requirements.txt` dentro do ambiente virtual.

---

## Django

Django segue o padrão MTV (Model-Template-View), que é uma variação do MVC (Model-View-Controller). Nele temos:
- **Model**: Define a estrutura do banco de dados.
- **View**: Contém a lógica de negócios e manipulação de dados.
- **Template**: Responsável pela renderização da interface para o usuário.

### Comandos Django

- Criar um novo app no projeto Django:
  ```sh
  py manage.py startapp <nome_do_app>
  ```
- Criar um usuário admin:
  ```sh
  py manage.py createsuperuser
  ```
- Criar as migrações para o banco de dados com base nos `models.py`:
  ```sh
  py manage.py makemigrations
  ```
- Aplicar as migrações ao banco de dados:
  ```sh
  py manage.py migrate
  ```
- Iniciar o servidor Django:
  ```sh
  py manage.py runserver
  ```

---

### Iniciar o Servidor Django

Com as dependências instaladas e o ambiente virtual ativo, você pode iniciar o servidor Django. Para que o Django esteja acessível na rede local, utilize o seguinte comando:
```sh
py manage.py runserver 0.0.0.0:8000
```
Isso permitirá que outros dispositivos da mesma rede acessem o servidor através do IP da máquina ou o nome da máquina(Exemplo: laptb601:8000) que o está executando.

Caso precise verificar o IP da máquina no Windows, use:
```sh
ipconfig
```
No Linux/Mac:
```sh
ifconfig
```

### Admin

Para acessar o admin do Django precisa ir até o endpoint seu_ip:8000/admin

Você vai precisar de um usuário admin, então use o comando abaixo em um terminal.

```sh
py manage.py createsuperuser
```

### Documentação

O Django possui duas documentações que são feitas automaticamente conforme o projeto é desenvolvido. Para acessar, vá até um dos endpoints abaixo:

- `seu_ip:8000/redoc`
- `seu_ip:8000/swagger`

## Next.js

O frontend do projeto utiliza Next.js, um framework React para desenvolvimento de aplicações web.

### Configuração do Ambiente

1. Acesse o diretório `client`:
   ```sh
   cd client
   ```
2. Instale as dependências do projeto:
   ```sh
   npm install
   ```
3. Para rodar o ambiente de desenvolvimento, utilize:
   ```sh
   npm run dev
   ```
   Isso iniciará o servidor local do Next.js normalmente em `http://seu_ip:3000/`.

### Build

Para gerar uma versão otimizada do frontend para produção, utilize:
   ```sh
   npm run build
   ```
   Esse comando criará uma pasta `.next` contendo os arquivos otimizados para deploy.

Para iniciar o servidor Next.js em produção, use:
   ```sh
   npm run start
   ```