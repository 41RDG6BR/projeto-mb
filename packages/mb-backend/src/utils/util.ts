// util.ts
export const validateNote = (nota: number): boolean => {
    return nota >= 0 && nota <= 10 && Number.isInteger(nota * 10);
};