"use client";

import { Form } from "@/components/Form";
import { Frame } from "@/components/Frame";
import { Input } from "@/components/Input";

export default function Home() {
  return (
    <>
      <Frame displayNavBar={false} displayFooter={true}>
        <Form formTitle="Login" formAction={() => {}} formMethod="POST">
          <Input
            id="matricula-input"
            type="text"
            label="Matrícula"
            name="register"
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
