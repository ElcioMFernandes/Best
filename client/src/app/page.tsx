"use client";

// Next
import { useRouter } from "next/navigation";

// React
import { useState } from "react";

// Components
import { Input } from "@/components/Input";
import { Dropdown } from "@/components/Dropdown";

// Services
import { fetchAuth } from "@/services/auth";

const Login = () => {
  const router = useRouter();

  const estabelecimentos = ["101", "103", "105", "114"];

  const [estabelecimento, setEstabelecimento] = useState(estabelecimentos[0]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const paddedUsername = username.padStart(5, "0");
    const formData = {
      username: `${estabelecimento}-${paddedUsername}`,
      password,
    };
    const response = await fetchAuth(formData);
    if (response) {
      router.push("/products");
    } else {
      alert("Verifique suas credenciais");
      console.log(JSON.stringify(formData));
    }
  };

  return (
    <>
      <div className="w-screen h-screen flex flex-col items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 shadow-lg p-4 rounded-md border border-neutral-700"
        >
          <p>Login</p>
          <Dropdown
            id="estabelecimento"
            label="Estabelecimento"
            options={estabelecimentos}
            value={estabelecimento}
            onChange={setEstabelecimento}
          />
          <Input
            id="username"
            type="text"
            name="username"
            label="Matrícula"
            value={username}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUsername(e.target.value)
            }
          />
          <Input
            id="password"
            type="password"
            name="password"
            label="Senha"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
          />
          <button type="submit" className="bg-red-500 py-2 rounded-md">
            Entrar
          </button>{" "}
        </form>
      </div>
    </>
  );
};

export default Login;
