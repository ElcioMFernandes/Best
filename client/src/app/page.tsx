"use client";

import { User } from "@/types/user";
import request from "@/services/fetch";
import { fetchAuth } from "@/services/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Login = () => {
  const options = [
    { name: "Tubos", code: "101" },
    { name: "TIC", code: "114" },
  ];

  const router = useRouter();

  const [enabled, setEnabled] = useState(false);
  const [username, setUsername] = useState("");
  const [register, setRegister] = useState("");
  const [password, setPassword] = useState("");
  const [estabelecimento, setEstabelecimento] = useState("");
  const [status, setStatus] = useState("Entre com sua matrícula e senha");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const response = await fetchAuth({
      username: username,
      password: password,
    });

    if (response) {
      console.log("OK");
      const user: User = await request({ endpoint: "users/me", method: "GET" });

      if (user.password_changed) {
        router.push("/products");
      } else {
        router.push("/user");
      }
    } else {
      setStatus("Verifique suas credenciais.");
    }
  };

  useEffect(() => {
    setUsername(`${estabelecimento}-${register.padStart(5, "0")}`);
  }, [register, estabelecimento]);

  return (
    <>
      <div
        className="flex flex-col justify-center items-center h-screen"
        style={{
          backgroundImage: 'url("/wallpaper.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <form
          onSubmit={handleSubmit}
          className="flex flex-col p-4 gap-2 bg-neutral-200 dark:bg-neutral-700 rounded-lg shadow shadow-neutral-700/50 border-neutral-800 border-opacity-30"
        >
          <p>{status}</p>
          <div className="flex flex-col">
            <div className="flex flex-col">
              <label htmlFor="">Estabelecimento</label>
              <div
                onClick={() => {
                  setEnabled(!enabled);
                }}
                className="p-1 rounded bg-neutral-300 dark:bg-neutral-600 focus:outline-none cursor-pointer"
              >
                {estabelecimento || "Selecione seu estabelecimento"}
              </div>
              {enabled && (
                <ul className="bg-neutral-300 dark:bg-neutral-600 rounded mt-1">
                  {options.map((option, index) => (
                    <li
                      key={index}
                      onClick={() => {
                        setEstabelecimento(option.code);
                        setEnabled(false);
                      }}
                      className="cursor-pointer p-1 hover:bg-neutral-400 dark:hover:bg-neutral-500"
                    >
                      {option.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <div className="flex flex-col">
            <label htmlFor="register">Matrícula</label>
            <input
              id="register"
              type="text"
              required
              value={register}
              maxLength={5}
              onChange={(e: any) => setRegister(e.target.value)}
              className="p-1 rounded bg-neutral-300 dark:bg-neutral-600 focus:outline-none"
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
              className="p-1 rounded bg-neutral-300 dark:bg-neutral-600 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="py-2 bg-blue-500 shadow-lg px-10 shadow-blue-500/50 rounded hover:bg-blue-600 text-white"
          >
            Entrar
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
