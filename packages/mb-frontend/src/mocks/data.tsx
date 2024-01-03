// /mocks/data.tsx

import { Register } from '../types'

const registers: Register[] = [
  {
    id: '1',
    bimester: 'PRIMEIRO',
    disciplina: 'Biologia',
    nota: 80,
    criadoEm: new Date(),
    atualizadoEm: new Date(),
  },
  {
    id: '2',
    bimester: 'SEGUNDO',
    disciplina: 'Artes',
    nota: 90,
    criadoEm: new Date(),
    atualizadoEm: new Date(),
  },
  {
    id: '3',
    bimester: 'TERCEIRO',
    disciplina: 'Geografia',
    nota: 75,
    criadoEm: new Date(),
    atualizadoEm: new Date(),
  },
  {
    id: '4',
    bimester: 'QUARTO',
    disciplina: 'Sociologia',
    nota: 85,
    criadoEm: new Date(),
    atualizadoEm: new Date(),
  },
]

export default registers
