// CardList.tsx
import React from 'react';
import '../styles/CardList.css';
import TrashIcon from '../icons/TrashIcon';
import ChartIcon from '../icons/ChartIcon';
import { Register, coresDisciplinas } from '../types';
import formatData from '../utils/formatters/dateFormatter';

interface CardListProps {
  registers: Register[];
  onDelete: (id: number) => void;
}

const CardList: React.FC<CardListProps> = ({ registers, onDelete }) => {
  return (
    <ul className='card-list'>
      {registers.map((registro) => (
        <li key={registro.id} className='card-item' style={{ backgroundColor: coresDisciplinas[registro.disciplina as keyof typeof coresDisciplinas] }}>
          <div className='delete-container'>
            <div onClick={() => onDelete(Number(registro.id))} className='delete-button'>
              <TrashIcon />
            </div>
          </div>
          <div className='card-content'>
            <h2 className='disciplina'>{registro.disciplina}</h2>
            <p className='data'>{formatData(registro.criadoEm)}</p>
            <div className='nota' style={{ display: 'inline-flex', height: '30px', padding: '5px 66px 5px 13.825px', alignItems: 'center', flexShrink: 0 }}>
              <div className='icon-container' style={{ marginRight: '10px' }}>
                <ChartIcon />
              </div>
              <div className='nota-container'>
                Nota: {registro.nota}
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default CardList;
