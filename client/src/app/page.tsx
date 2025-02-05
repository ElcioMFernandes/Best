"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Input } from "@/components/Input";
import { Dropdown } from "@/components/Dropdown";
import { fetchAuth } from "@/services/auth";

const Login = () => {
  const router = useRouter();

  const estabelecimentos = {
    "101": "Tubos",
    "103": "TEC",
    "114": "TIC",
  };

  const [estabelecimento, setEstabelecimento] = useState(
    Object.keys(estabelecimentos)[0]
  );
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginFail, setLoginFail] = useState(false);
  const [shakeClass, setShakeClass] = useState("");

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
      setLoginFail(true);
      setShakeClass("shake");
      setTimeout(() => setShakeClass(""), 500);
      console.log(JSON.stringify(formData));
    }
  };

  return (
    <div
      className="w-screen h-screen flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('wallpaper.jpg')" }}
    >
      <form
        onSubmit={handleSubmit}
        className="flex w-3/9 flex-col gap-4 shadow-lg p-4 rounded-md border bg-neutral-200 border-neutral-300 dark:border-neutral-700 dark:bg-neutral-800"
      >
        <p className={`${loginFail ? "text-red-500 " + shakeClass : ""}`}>
          {loginFail
            ? "Verifique suas credenciais"
            : "Entre com suas credenciais"}
        </p>
        <Dropdown
          id="estabelecimento"
          label="Estabelecimento"
          options={estabelecimentos}
          value={estabelecimento}
          onChange={setEstabelecimento}
        />
        <Input
          id="username"
          type="num"
          name="username"
          label="Matrícula"
          value={username}
          maxLength={5}
          required={true}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setUsername(e.target.value)
          }
        />
        <p>
          Sua matrícula: {estabelecimento}-{username.padStart(5, "0")}
        </p>
        <Input
          id="password"
          type="password"
          name="password"
          label="Senha"
          value={password}
          required={true}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
        />
        <button
          type="submit"
          className="text-neutral-200 bg-red-500 py-2 rounded-md"
        >
          Entrar
        </button>
      </form>
    </div>
  );
};

export default Login;
