import React, { useState, useContext } from "react";
import '../Styles/AdicionarUsuario.css';
import { Context } from '../Context/Context';
import type { Usuario } from '../types/Usuario';
import { apiFetch } from "../services/api";

interface AdicionarUsuarioProps {
  user: Usuario;
  editarUsuarios: (user: Usuario) => void;
  controleModal: (user: Usuario) => void;
}

const AdicionarUsuario: React.FC<AdicionarUsuarioProps> = ({ user, editarUsuarios, controleModal }) => {
  const { setUsuarios } = useContext(Context);
  const [erroRemover, setErroRemover] = useState<string>("");

  const removerUser = async (id: number) => {
    const confirmar = confirm("Você tem certeza que deseja excluir esse usuário?");
    if (!confirmar) return;

    setErroRemover("");

    try {
      await apiFetch(`/usuarios/${id}`, {
        method: "DELETE",
      });

      // Atualizar lista local após exclusão
      setUsuarios(prev => prev.filter(u => u.id !== id));
    } catch (error: any) {
      setErroRemover("Erro ao excluir usuário!");
      console.error(error.message);
    }
  };

  return (
    <div className='card'>
      <div>
        <img src={`https://robohash.org/${user.id}?set=set1`} alt=""
          onClick={() => controleModal(user)} />
      </div>

      <div>
        {erroRemover && <p className="erro">{erroRemover}</p>}
        <p><strong>Nome:</strong> {user.nome}</p>
        <p><strong>E-mail:</strong> {user.email}</p>
        <p><strong>Idade:</strong> {user.idade}</p>
      </div>

      <div className='botoesCrud'>
        <button onClick={(e) => {
          e.stopPropagation();
          removerUser(user.id);
        }}>
          <i className="fa-solid fa-trash"></i>
        </button>

        <button onClick={(e) => {
          e.stopPropagation();
          editarUsuarios(user);
        }}>
          <i className="fa-solid fa-pencil"></i>
        </button>
      </div>
    </div>
  )
}

export default AdicionarUsuario;