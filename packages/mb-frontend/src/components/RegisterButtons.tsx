// RegisterButtons.tsx
import React from 'react'
import '../styles/RegisterButtons.css'
import { Register, coresDisciplinas } from '../types'
import data from '../mocks/data'
import CustomButton from './CustomButton'

interface RegisterButtonsProps {
  onRegistroClick: (register: Register) => void
  loading?: boolean
}

const RegisterButtons: React.FC<RegisterButtonsProps> = ({
  onRegistroClick,
  loading,
}) => {
  const handleClick = (register: Register) => {
    onRegistroClick(register)
  }

  return (
    <div className='registro-button-container'>
      {data.map((item, index) => (
        <CustomButton
          disabled={loading}
          key={item.id}
          onClick={() => handleClick(item)}
          className={'registro-button'}
          style={{
            left: `calc(${53 + index * (130 + 23)}px)`,
            backgroundColor: coresDisciplinas[item.disciplina],
            border: `1px solid ${
              coresDisciplinas[item.disciplina] || 'transparent'
            }`,
            zIndex: index + 1,
          }}
        >
          {item.disciplina}
        </CustomButton>
      ))}
    </div>
  )
}

export default RegisterButtons
