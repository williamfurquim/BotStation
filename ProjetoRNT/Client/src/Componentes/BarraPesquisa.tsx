import React, { useState } from 'react';
import '../Styles/BarraPesquisa.css';

interface BarraPesquisaProps {
  onSearch?: (termo: string) => void;
}

const BarraPesquisa: React.FC<BarraPesquisaProps> = ({ onSearch }) => {
  const [termo, setTermo] = useState<string>('');

  const digitarBarra = (e: React.ChangeEvent<HTMLInputElement>) => {
    const novoTermo = e.target.value;
    setTermo(novoTermo);

    if (onSearch) onSearch(novoTermo);
  }

  return (
    <input
      type="text"
      className='input-pesquisa'
      placeholder='Busque um usuário pelo nome 🔎'
      onChange={digitarBarra}
      value={termo}
    />
  );
};

export default BarraPesquisa;