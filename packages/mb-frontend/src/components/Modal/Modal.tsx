import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'
import RegisterButtons from '../RegisterButtons/RegisterButtons'
import { Register } from '../../types'
import ContentPerBimonthly from '../ContentPerBimonthly/ContentPerBimonthly'
import ApiService from '../../api/ApiService'
import Input from '../Input/Input'
import XIcon from '../../assets/icons/XIcon'
import ResponsiveButton from '../ResponsiveButton/ResponsiveButton'
import './Modal.css'

Modal.setAppElement('#root')

interface ModalProps {
  isOpen: boolean
  onRequestClose: () => void
  onConfirm: (newNote: number, novoBimestre: string) => void
  bimester: string
}

const ModalComponent: React.FC<ModalProps> = ({
  isOpen,
  onRequestClose,
  onConfirm,
  bimester,
}) => {
  const [registroSelecionado, setRegistroSelecionado] =
    useState<Register | null>(null)
  const [newNote, setNewNote] = useState<number | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const isMobile = window.innerWidth <= 768
  const modalWidth = isMobile ? '396px' : '678px';

  useEffect(() => {
    if (!isOpen) {
      setRegistroSelecionado(null)
      setNewNote(null)
    }
  }, [isOpen])

  const handleRegistroClick = (register: Register) => {
    setRegistroSelecionado(register)
  }

  const handleNotaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewNote(Number(event.target.value))
  }

  const enviarParaBackend = async () => {
    if (registroSelecionado && newNote !== null && bimester) {
      setLoading(true)
      try {
        const response = await ApiService.postRegister({
          id: registroSelecionado.id,
          bimester,
          disciplina: registroSelecionado.disciplina,
          nota: newNote,
        })
        onConfirm(newNote, bimester)
      } catch (error: any) {
        console.error('Erro ao enviar dados para o servidor:', error.message)
      } finally {
        setLoading(false)
        setRegistroSelecionado(null)
        setNewNote(null)
        onRequestClose()
      }
    }
  }

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
          width: modalWidth,
          height: '453px',
          margin: 'auto',
          background: '#0F0F0F',
          position: 'relative',
        },
      }}
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel='Modal Edição'
    >
      <div className='modal__close' onClick={onRequestClose}>
        <XIcon />
      </div>
      <div>
        <ContentPerBimonthly bimester={bimester} />
        <p
          style={{
            position: 'absolute',
            marginTop: '102px',
            marginLeft: '53px',
            color: '#FFF',
            fontFamily: 'Montserrat',
            fontSize: '18px',
            fontStyle: 'normal',
            fontWeight: 500,
            lineHeight: '18px',
          }}
          className='modal-title'
        >
          Disciplina
        </p>
      </div>
      <div className='modal__registro-buttons-container'>
        <RegisterButtons
          onRegistroClick={handleRegistroClick}
          loading={loading}
        />
      </div>
      {isOpen && (
        <div className='modal__input-container'>
          <span className='modal__nota-title'>Nota</span>
          <div className='modal__input-and-button-container'>
            <Input
              type='number'
              value={newNote || ''}
              onChange={handleNotaChange}
              placeholder='7.4'
              className='modal__input'
            />
            <ResponsiveButton
              mobileButtonWidth={'134px'}
              isMobile={isMobile}
              marginRightMobile='31px'
              marginBottonMobile='-24px'
              onClick={enviarParaBackend}
              disabled={loading}
              className='modal__button-container'
              isModal={true}
            >
              {isMobile ? null : 'Confirmar'}
            </ResponsiveButton>
          </div>
        </div>
      )}
    </Modal>
  )
}

export default ModalComponent
