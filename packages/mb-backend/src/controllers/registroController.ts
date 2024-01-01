export const getRegistros = (req: Request, res: Response): void => {
  const registers = Array.from(registrosMap.values());
  res.json(registers);
};

