import React from 'react';
import '../Styles/Modal.css';
import type { Usuario } from '../types/Usuario';

interface ModalProps {
  user: Usuario;
  controleModal: () => void;
}

const Modal: React.FC<ModalProps> = ({ user, controleModal }) => {
  return (
    <div className='popup-fundo' onClick={controleModal}>
      <div className='popup-conteudo'>
        <p><strong>{user.nome}</strong></p>
        <p>{user.email}</p>
        <p>Idade {user.idade}</p>

        <h6>Clique para fechar!</h6>
      </div>
    </div>
  );
};

export default Modal;