// src/types.ts
export enum Bimester {
  PRIMEIRO = "PRIMEIRO",
  SEGUNDO = "SEGUNDO",
  TERCEIRO = "TERCEIRO",
  QUARTO = "QUARTO",
}
  
export enum Disciplina {
  BIOLOGIA = "Biologia",
  ARTES = "Artes",
  GEOGRAFIA = "Geografia",
  SOCIOLOGIA = "Sociologia",
}

export interface Register {
  id: string;
  bimester: Bimester;
  disciplina: Disciplina;
  nota: number;
  criadoEm: Date;
  atualizadoEm: Date;
}
