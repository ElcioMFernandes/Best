"use client";

import { fetchAuth } from "@/services/auth";
import { useRouter } from "next/navigation";
import { Frame } from "@/components/Frame";
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
      <Frame displayNavBar={false} displayFooter={false}>
        <Form formTitle="Entrar" formAction={handleLogin} formMethod="POST">
          <Input
            id="username-input"
            type="username"
            label="Matrícula"
            name="username"
          />
          <Input
            id="password-input"
            type="password"
            label="Senha"
            name="password"
          />
        </Form>
      </Frame>
    </>
  );
}
