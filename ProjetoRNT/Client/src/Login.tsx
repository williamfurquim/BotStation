import { useState } from "react";
import { supabase } from "./lib/supabase";
import './Styles/index.css'

export default function Login() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState<string>("");
    const [msg, setMsg] = useState("O projeto está esbarrando nas limitações do plano gratuito do Supabase, por tanto utilize: william@email.com | Senha: 123123");

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault();

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password: senha,
        });

        if (error) {
            console.error(error.message);
            setMsg("Houve um erro: " + error.message);
        }
    }

    async function handleRegister() {
        const { error } = await supabase.auth.signUp({
            email,
            password: senha,
        });

        if (error) {
            console.error(error.message);
            setMsg("Houve um erro: " + error.message);
        }
    }

    return (
        <div className="body">
            <form onSubmit={handleLogin}>
                <h1>Login</h1>

                <input
                    type="email"
                    placeholder="Digite o seu E-mail"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Digite a sua senha"
                    required
                    onChange={(e) => setSenha(e.target.value)}
                />

                <button type="submit">Entrar</button>
                <button type="button" onClick={handleRegister}>
                    Criar conta
                </button>

                {msg && <p style={{textAlign: "center"}}>{msg}</p>}
            </form>
        </div>
    );
}