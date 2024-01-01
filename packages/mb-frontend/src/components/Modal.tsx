import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import RegisterButtons from './RegisterButtons';
import { Register } from '../types';
import '../styles/Modal.css';
import XIcon from '../icons/XIcon';
import ApiService from '../api/ApiService';
import Input from './Input';
import CustomButton from './CustomButton';

Modal.setAppElement('#root');

interface ConteudoPorBimestreProps {
  bimester: string;
}

interface ModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onConfirm: (newNote: number, novoBimestre: string) => void;
  bimester: string;
}

const ConteudoPorBimestre: React.FC<ConteudoPorBimestreProps> = ({ bimester }) => {
  let conteudo;

  switch (bimester) {
    case 'PRIMEIRO':
      conteudo = <p>Bimestre 1</p>;
      break;
    case 'SEGUNDO':
      conteudo = <p>Bimestre 2</p>;
      break;
    case 'TERCEIRO':
      conteudo = <p>Bimestre 3</p>;
      break;
    case 'QUARTO':
      conteudo = <p>Bimestre 4</p>;
      break;
    default:
      conteudo = <p>Bimestre</p>;
  }

  return (
    <>
      <div style={{
        position: 'absolute',
        marginTop: '13px',
        marginLeft: '47px',
        width: '218px',
        height: '65px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        flexShrink: '0',
      }}>
        <h1 style={{
          color: '#FFF',
          fontFamily: 'Montserrat',
          fontSize: '32px',
          fontStyle: 'normal',
          fontWeight: 500,
          lineHeight: '18px',
        }}>
          {conteudo}
        </h1>
      </div>

      <div style={{
        position: 'absolute',
        marginLeft: '53px',
        marginTop: '79px',
        color: '#FFF',
        fontFamily: 'Montserrat',
        fontSize: '18px',
        fontStyle: 'normal',
        fontWeight: 500,
        lineHeight: '18px',
      }}>
        Disciplina
      </div>
    </>
  );
};

const ModalContent: React.FC<{
  newNote: number | null;
  loading: boolean;
  handleNotaChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  enviarParaBackend: () => Promise<void>;
}> = ({ newNote, loading, handleNotaChange, enviarParaBackend }) => (
  <div>
    <div style={{ paddingLeft: '53px' }}>
      <h2 className='nota-title'>Nota</h2>
      <Input
        type="number"
        value={newNote || ''}
        onChange={handleNotaChange}
        placeholder="7.4"
      />
    </div>
    <div>
      <CustomButton
        onClick={enviarParaBackend}
        disabled={loading}
        className='button-container'
        style={{
          display: 'flex',
          width: '134px',
          height: '48px',
          padding: '16px 32px',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '10px',
          flexShrink: '0',
          '@media (max-width: 768px)': {
            display: 'block',
          },
        }}
      >
        Confirmar
      </CustomButton>
    </div>
  </div>
);

const ModalComponent: React.FC<ModalProps> = ({ isOpen, onRequestClose, onConfirm, bimester }) => {
  const [registroSelecionado, setRegistroSelecionado] = useState<Register | null>(null);
  const [newNote, setnewNote] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!isOpen) {
      setRegistroSelecionado(null);
      setnewNote(null);
    }
  }, [isOpen]);

  const handleRegistroClick = (register: Register) => {
    setRegistroSelecionado(register);
  };

  const handleNotaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setnewNote(Number(event.target.value));
  };

  const enviarParaBackend = async () => {
    if (registroSelecionado && newNote !== null && bimester) {
      setLoading(true);
      try {
        const response = await ApiService.postRegister({
          id: registroSelecionado.id,
          bimester,
          disciplina: registroSelecionado.disciplina,
          nota: newNote,
        });
        onConfirm(newNote, bimester);
      } catch (error: any) {
        console.error('Erro ao enviar dados para o servidor:', error.message);
      } finally {
        setLoading(false);
        setRegistroSelecionado(null);
        setnewNote(null);
        onRequestClose();
      }
    }
  };

  return (
    <Modal
      className='modal'
      style={{
        overlay: {
          width: '100%',
          height: '100%',
          background: 'rgba(15, 15, 15, 0.5)',
          position: 'fixed',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        },
        content: {
          width: '678px',
          height: '379px',
          margin: 'auto',
          background: '#0F0F0F',
          position: 'relative',
        },
      }}
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel='Modal Edição'
    >
      <div className='close' onClick={onRequestClose}>
        <XIcon />
      </div>
      <ConteudoPorBimestre bimester={bimester} />
      <div className="registro-buttons-container">
        <RegisterButtons onRegistroClick={handleRegistroClick} loading={loading} />
      </div>
      {isOpen && <ModalContent newNote={newNote} loading={loading} handleNotaChange={handleNotaChange} enviarParaBackend={enviarParaBackend} />}
    </Modal>
  );
};

export default ModalComponent;
