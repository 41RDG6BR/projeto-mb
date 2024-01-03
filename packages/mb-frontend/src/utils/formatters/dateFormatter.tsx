const formatarData = (data: Date | string | undefined): string => {
  if (!data) {
    return 'Data não disponível'
  }

  const dataObj = data instanceof Date ? data : new Date(data)

  if (isNaN(dataObj.getTime())) {
    return `Data inválida: ${data}`
  }

  const dia = dataObj.getDate().toString().padStart(2, '0')
  const mes = (dataObj.getMonth() + 1).toString().padStart(2, '0')
  const ano = dataObj.getFullYear()
  return `${dia}/${mes}/${ano}`
}

export default formatarData
