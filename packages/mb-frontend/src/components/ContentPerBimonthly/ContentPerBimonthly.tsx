import './ContentPerBimonthly.css'

interface ContentPerBimonthlyProps {
  bimester: string
}

const ContentPerBimonthly: React.FC<ContentPerBimonthlyProps> = ({
  bimester,
}) => {
  let conteudo

  switch (bimester) {
    case 'PRIMEIRO':
      conteudo = 'Bimestre 1'
      break
    case 'SEGUNDO':
      conteudo = 'Bimestre 2'
      break
    case 'TERCEIRO':
      conteudo = 'Bimestre 3'
      break
    case 'QUARTO':
      conteudo = 'Bimestre 4'
      break
    default:
      conteudo = 'Bimestre'
  }

  return (
    <>
      <div className='modal-content'>
        <h1 className='modal-title'>{conteudo}</h1>
      </div>

      <div className='disciplina-text'>Disciplina</div>
    </>
  )
}

export default ContentPerBimonthly
