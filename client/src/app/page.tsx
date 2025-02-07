"use client";

import { fetchAuth } from "@/services/auth";
import request from "@/services/fetch";
import { User } from "@/types/user";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [estabelecimento, setEstabelecimento] = useState("");
  const [register, setRegister] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("Entre com sua matrícula e senha");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const response = await fetchAuth({
      username: register,
      password: password,
    });

    if (response) {
      const user: User = await request({ endpoint: "user", method: "GET" });
      console.log(user);
    } else {
      setStatus("Verifique suas credenciais.");
    }
  };

  useEffect(() => {
    setUsername(`${estabelecimento}-${register}`);
  }, [register, estabelecimento]);

  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen border">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center items-center p-4 border gap-2"
        >
          <p>{status}</p>
          <div className="flex flex-col">
            <label htmlFor="register">Estabelecimento</label>
            <input
              id="estabelecimento"
              type="text"
              required
              value={estabelecimento}
              onChange={(e: any) => setEstabelecimento(e.target.value)}
              className="bg-transparent border"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="register">Matrícula</label>
            <input
              id="register"
              type="text"
              required
              value={register}
              onChange={(e: any) => setRegister(e.target.value)}
              className="bg-transparent border"
            />
          </div>
          <p>Matrícula completa: {username}</p>
          <div className="flex flex-col">
            <label htmlFor="senha">Senha</label>
            <input
              id="senha"
              type="password"
              required
              value={password}
              onChange={(e: any) => setPassword(e.target.value)}
              className="bg-transparent border"
            />
          </div>
          <button
            type="submit"
            className="py-2 bg-blue-500 shadow-lg px-10 shadow-blue-500/50 rounded hover:bg-blue-600"
          >
            Entrar
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
