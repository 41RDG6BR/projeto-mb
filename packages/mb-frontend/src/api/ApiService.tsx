// ApiService.ts
import axios from 'axios'

const apiUrl = process.env.REACT_APP_API_URL

const ApiService = {
  getRegisters: async () => {
    try {
      const response = await axios.get(`${apiUrl}/registros`)
      return response.data
    } catch (error: any) {
      console.error('Erro ao obter registros do backend:', error.message)
      throw error
    }
  },

  deleteRegister: async (id: number) => {
    try {
      await axios.delete(`${apiUrl}/registros/${id}`)
    } catch (error: any) {
      console.error('Erro ao excluir registro:', error.message)
      throw error
    }
  },

  postRegister: async (register: {
    id: string
    bimester: string
    disciplina: string
    nota: number
  }) => {
    try {
      const response = await axios.post(`${apiUrl}/registros`, register)
      return response.data
    } catch (error: any) {
      console.error('Erro ao enviar dados para o servidor:', error.message)
      throw error
    }
  },
}

export default ApiService
