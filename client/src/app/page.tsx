"use client";

import { fetchAuth } from "@/services/auth";
import { useRouter } from "next/navigation";

// components
import { Input } from "@/components/Input";
import { Form } from "@/components/Form";

export default function Login() {
  const router = useRouter();

  const handleLogin = async (data: any) => {
    const success = await fetchAuth(data);
    if (success) {
      router.push("/products");
    } else {
      alert("Erro ao autenticar. Verifique suas credenciais.");
    }
  };

  return (
    <>
      <div
        className="w-screen h-screen items-center justify-center flex bg-cover bg-center p-2"
        style={{ backgroundImage: "url('/wallpaper.jpg')" }}
      >
        <Form
          formTitle="Faça login na sua conta"
          buttonLabel="Entrar"
          formAction={handleLogin}
          formMethod="POST"
        >
          <Input
            id="username-input"
            type="username"
            label="Matrícula"
            name="username"
            placeholder="00000"
          />
          <Input
            id="password-input"
            type="password"
            label="Senha"
            name="password"
            placeholder="••••••••"
          />
        </Form>
      </div>
    </>
  );
}
