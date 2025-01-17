"use client";

import { Frame } from "@/components/Frame";
import { Input } from "@/components/Input";
import { Form } from "@/components/Form";
import { fetchAuth } from "@/services/auth";

export default function Home() {
  return (
    <>
      <Frame displayNavBar={false} displayFooter={false}>
        <Form
          formTitle="Entrar"
          formAction={(data: any) => {
            fetchAuth(data);
          }}
          formMethod="POST"
        >
          <Input
            id="matricula-input"
            type="text"
            label="Estabelecimento - Matrícula"
            name="register"
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
