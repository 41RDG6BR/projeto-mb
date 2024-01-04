import React, { useState, useEffect } from 'react'
import Modal from './components/Modal/Modal'
import CardList from './components/CardList/CardList'
import ResponsiveButton from './components/ResponsiveButton/ResponsiveButton'
import ApiService from './api/ApiService'

const App: React.FC = () => {
  const [modalAberto, setModalAberto] = useState<boolean>(false)
  const [registers, setRegistros] = useState<any[]>([])
  const [forceUpdate, setForceUpdate] = useState<boolean>(false)
  const [bimestreSelecionado, setBimestreSelecionado] =
    useState<string>('PRIMEIRO')

  const handleAdicionarClick = (novoBimestre: string) => {
    setBimestreSelecionado(novoBimestre)
    setModalAberto(true)
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
      <div key={bimester}>
        <ResponsiveButton
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onClick={() => handleAdicionarClick(bimester)}
        >
          Lançar nota
        </ResponsiveButton>
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
