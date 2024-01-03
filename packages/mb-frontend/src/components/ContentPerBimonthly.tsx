import '../styles/ContentPerBimonthly.css'

interface ContentPerBimonthlyProps {
  bimester: string
}

const ContentPerBimonthly: React.FC<ContentPerBimonthlyProps> = ({
  bimester,
}) => {
  let conteudo

  switch (bimester) {
    case 'PRIMEIRO':
      conteudo = <p>Bimestre 1</p>
      break
    case 'SEGUNDO':
      conteudo = <p>Bimestre 2</p>
      break
    case 'TERCEIRO':
      conteudo = <p>Bimestre 3</p>
      break
    case 'QUARTO':
      conteudo = <p>Bimestre 4</p>
      break
    default:
      conteudo = <p>Bimestre</p>
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
