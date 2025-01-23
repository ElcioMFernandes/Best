"use client";

import { Frame } from "@/components/Frame";
import { Input } from "@/components/Input";
import { Form } from "@/components/Form";
import { fetchAuth } from "@/services/auth";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleLogin = async (data: any) => {
    const success = await fetchAuth(data);
    if (success) {
      router.push("/home");
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
            label="Estabelecimento - Matrícula"
            name="username"
            placeholder="000-00000"
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
