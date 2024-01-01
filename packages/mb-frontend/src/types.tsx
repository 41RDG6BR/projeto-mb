// types.tsx
export type Register = {
  id: string;
  bimester: 'PRIMEIRO' | 'SEGUNDO' | 'TERCEIRO' | 'QUARTO';
  disciplina: 'Biologia' | 'Artes' | 'Geografia' | 'Sociologia';
  nota: number;
  criadoEm: Date;
  atualizadoEm: Date;
};

export const coresDisciplinas: Record<Register['disciplina'], string> = {
  Biologia: '#CC4090',
  Artes: 'rgba(5, 162, 194, 0.20)',
  Geografia: 'rgba(194, 103, 25, 0.20)',
  Sociologia: 'rgba(155, 25, 194, 0.20)',
};
