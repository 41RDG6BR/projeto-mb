import React, { useState, useEffect } from 'react'
import Modal from './components/Modal/Modal'
import CardList from './components/CardList/CardList'
import ResponsiveButton from './components/ResponsiveButton/ResponsiveButton'
import ApiService from './api/ApiService'
import PlusIcon from '../src/assets/icons/PlusIcon'
import ContentPerBimonthly from './components/ContentPerBimonthly/ContentPerBimonthly'

const App: React.FC = () => {
  const [modalAberto, setModalAberto] = useState<boolean>(false)
  const [registers, setRegistros] = useState<any[]>([])
  const [forceUpdate, setForceUpdate] = useState<boolean>(false)
  const [isInitialPage, setInitialPage] = useState(true);
  const [bimestreSelecionado, setBimestreSelecionado] =
    useState<string>('PRIMEIRO')

  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 768);
  const mobileButtonWidth = '50px'

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleAdicionarClick = (novoBimestre: string) => {
    setBimestreSelecionado(novoBimestre)
    setModalAberto(true)
    setInitialPage(true);
  }

  const handleConfirmar = () => {
    setForceUpdate((prev) => !prev)
  }

  const handleDelete = async (id: number) => {
    try {
      await ApiService.deleteRegister(id)
      setForceUpdate((prev) => !prev)
    } catch (error) {
      if (error instanceof Error) {
        console.error('Erro ao excluir registro:', error.message)
      } else {
        console.error('Erro ao excluir registro:', error)
      }
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await ApiService.getRegisters()
        setRegistros(data)
      } catch (error) {
        if (error instanceof Error) {
          console.error('Erro ao obter registros do backend:', error.message)
        } else {
          console.error('Erro ao obter registros do backend:', error)
        }
      }
    }

    fetchData()
  }, [forceUpdate])

  const renderContainer = (bimester: string) => {
    const bimonthlyRecords = registers.filter(
      (register) => register.bimester === bimester,
    )

    return (
<div style={{ width: isMobile ? '440px' : '800px' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '10px', // Ajuste o espaçamento conforme necessário
        }}
      >
       <ContentPerBimonthly bimester={bimester} isInitialPage={isInitialPage} />
        <ResponsiveButton
          marginRightMobile='37px'
          mobileButtonWidth={mobileButtonWidth}
          isMobile={isMobile}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '10px',
          }}
          onClick={() => handleAdicionarClick(bimester)}
        >
          {isMobile ? <PlusIcon /> : 'Lançar nota'}
        </ResponsiveButton>
      </div>

      {bimonthlyRecords.length > 0 && (
        <CardList registers={bimonthlyRecords} onDelete={handleDelete} />
      )}
    </div>
    )
    
  }

  const bimesters = ['PRIMEIRO', 'SEGUNDO', 'TERCEIRO', 'QUARTO']

  return (
    <div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          minHeight: '100vh',
          backgroundColor: '#0F0F0F',
          overflow: 'auto',
        }}
      >
        {bimesters.map((bimester) => renderContainer(bimester))}

        <Modal
          isInitialPage={isInitialPage}
          onConfirm={handleConfirmar}
          isOpen={modalAberto}
          onRequestClose={() => setModalAberto(false)}
          bimester={bimestreSelecionado}
        />
      </div>
    </div>
  )
}

export default App
