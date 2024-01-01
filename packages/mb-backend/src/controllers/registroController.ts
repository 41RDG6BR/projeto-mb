export const getRegistros = (req: Request, res: Response): void => {
  const registers = Array.from(registrosMap.values());
  res.json(registers);
};

export const adicionarRegistro = (req: Request, res: Response): void => {
  const { disciplina, bimester, nota } = req.body;
  const chave = `${disciplina}-${bimester}`;

  if (!validateNote(nota)) {
    res.status(400).json({ mensagem: "A nota deve estar entre 0 e 10." });
    return;
  }

  if (registrosMap.has(chave)) {
    res.status(400).json({ mensagem: "Já existe uma disciplina registrada para este bimestre." });
  } else {
    const novoRegistro: Register = {
      id: Date.now().toString(),
      bimester,
      disciplina,
      nota,
      criadoEm: new Date(),
      atualizadoEm: new Date(),
    };
    registrosMap.set(chave, novoRegistro);
    res.json(novoRegistro);
  }
};
