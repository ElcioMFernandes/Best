"use client";

import useAuth from "@/hooks/useAuth";
import { useEffect, useState } from "react";

const UserPage = () => {
  const isLoading = useAuth();

  const [status, setStatus] = useState(false);
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");

  useEffect(() => {
    const hasLowerCase = /[a-z]/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (confirmation !== password) {
      setStatus(false);
      setMessage("Senhas não coincidem");
    } else if (password.length < 8) {
      setStatus(false);
      setMessage("Senha muito curta");
    } else if (
      !hasLowerCase ||
      !hasUpperCase ||
      !hasSpecialChar ||
      !hasNumber
    ) {
      setStatus(false);
      setMessage("Senha fraca, tente outra");
    } else {
      setStatus(true);
      setMessage("");
    }
  }, [password, confirmation]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    alert(`Formulário enviado: ${password}, ${confirmation}`);
    setPassword("");
    setConfirmation("");
    setStatus(false);
  };

  const accessToken = sessionStorage.getItem("accessToken");

  return (
    <>
      {accessToken ? (
        <div
          className="flex flex-col h-screen justify-center items-center"
          style={{
            backgroundImage: 'url("/wallpaper.jpg")',
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <form
            onSubmit={handleSubmit}
            className="flex flex-col p-4 gap-2 bg-neutral-200 dark:bg-neutral-700 rounded-lg"
          >
            <p>Informe sua nova senha</p>
            <label htmlFor="password">Senha</label>
            <input
              id="password"
              type="password"
              value={password}
              className="p-1 rounded bg-neutral-300 dark:bg-neutral-600 focus:outline-none"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <label htmlFor="confirmation">Confirmar senha</label>
            <input
              id="confirmation"
              type="password"
              value={confirmation}
              onChange={(e) => {
                setConfirmation(e.target.value);
              }}
              className="p-1 rounded bg-neutral-300 dark:bg-neutral-600 focus:outline-none"
            />
            {status ? <></> : <p className="text-red-500 shake">{message}</p>}
            <button
              className={`${
                status && password !== ""
                  ? "bg-green-500 shadow-green-500/50"
                  : "bg-red-500 shadow-red-500/50"
              } py-2 shadow-lg rounded`}
              disabled={status && password !== "" ? false : true}
              type="submit"
            >
              Enviar
            </button>
          </form>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default UserPage;
