import { useEffect, useState, useContext } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "./lib/supabase";
import Login from "./Login";
import { apiFetch } from "./services/api";
import "./Styles/index.css";
import AdicionarUsuario from "./Componentes/AdicionarUsuario";
import { Context } from "./Context/Context";
import BarraPesquisa from "./Componentes/BarraPesquisa";
import Modal from "./Componentes/Modal";
import type { Usuario } from "./types/Usuario";

function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [idade, setIdade] = useState<number>(0);

  const { usuarios, setUsuarios } = useContext(Context);
  const [erro, setErro] = useState("");

  const [usuariosEditando, setUsuariosEditando] =
    useState<Usuario | null>(null);
  const [loading, setLoading] = useState(false);

  const [buscar, setBuscar] = useState("");
  const [usuarioModal, setUsuarioModal] =
    useState<Usuario | null>(null);

  const controleModal = (user: Usuario | null = null) => {
    setUsuarioModal(user);
  };

  const realizarBuscar = (termo: string) => {
    setBuscar(termo);
  };

  const carregarUsuarios = async () => {
    try {
      const result = await apiFetch("/usuarios");
      setUsuarios(result.data);
    } catch (error: any) {
      console.error(error);
      setErro(error.message);
    }
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErro("");
    setLoading(true);

    try {
      if (usuariosEditando) {
        await apiFetch(`/usuarios/${usuariosEditando.id}`, {
          method: "PUT",
          body: JSON.stringify({ nome, email, idade }),
        });
      } else {
        await apiFetch("/usuarios", {
          method: "POST",
          body: JSON.stringify({ nome, email, idade }),
        });
      }

      setUsuariosEditando(null);
      setNome("");
      setEmail("");
      setIdade(0);
      await carregarUsuarios();

    } catch (error: any) {
      setErro(error.message);
    }

    setLoading(false);
  }

  function editarUsuarios(user: Usuario) {
    setUsuariosEditando(user);
    setNome(user.nome);
    setEmail(user.email);
    setIdade(user.idade);
  }

  const usuariosFiltrados = usuarios.filter((user: Usuario) =>
    user.nome.toLowerCase().includes(buscar.toLowerCase())
  );

  useEffect(() => {
    async function getSession() {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
      setAuthLoading(false);

      if (data.session) {
        carregarUsuarios();
      }
    }

    getSession();

    const { data: listener } =
      supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session);

        if (session) {
          carregarUsuarios();
        } else {
          setUsuarios([]);
        }
      });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  if (authLoading) {
    return <p>Carregando autenticação...</p>;
  }

  if (!session) {
    return <Login />;
  }

  return (
    <div className="body">
      <form onSubmit={handleSubmit}>
        <h1>Cadastro de Usuários</h1>
        <p>Adicione a si mesmo!</p>
        {erro && <p className="erro">{erro}</p>}

        <input
          type="text"
          required
          placeholder="Digite o seu nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />

        <input
          type="email"
          required
          placeholder="Digite o seu E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="number"
          required
          placeholder="Digite a sua idade"
          value={idade}
          onChange={(e) => setIdade(Number(e.target.value))}
        />

        <button type="submit" disabled={loading}>
          {loading
            ? "Carregando..."
            : usuariosEditando
            ? "Salvar Alteração"
            : "Enviar"}
        </button>

        <button
          type="button"
          onClick={async () => {
            await supabase.auth.signOut();
          }}
        >
          Sair
        </button>
      </form>

      <BarraPesquisa onSearch={realizarBuscar} />

      <section className="usuarios-cadastrador">
        {usuariosFiltrados.length > 0 ? (
          usuariosFiltrados.map((user: Usuario) => (
            <div key={user.id}>
              <AdicionarUsuario
                user={user}
                editarUsuarios={editarUsuarios}
                controleModal={controleModal}
              />
            </div>
          ))
        ) : (
          <p className="p-nenhum">Nenhum usuário cadastrado.</p>
        )}
      </section>

      {usuarioModal && (
        <Modal
          user={usuarioModal}
          controleModal={() => controleModal(null)}
        />
      )}
    </div>
  );
}

export default App;