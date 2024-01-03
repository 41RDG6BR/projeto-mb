import { Bimester, Disciplina } from "../types/types";

export interface Register {
    id: string;
    bimester: Bimester;
    disciplina: Disciplina;
    nota: number;
    criadoEm: Date;
    atualizadoEm: Date;
}
  