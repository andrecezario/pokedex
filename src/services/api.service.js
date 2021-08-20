import axios from 'axios'
import { Loading, Notify, QSpinnerIos } from 'quasar'

const ApiService = {

  async get (resource) {
    try {
      Loading.show({ spinner: QSpinnerIos, spinnerSize: 30, backgroundColor: 'grey-7' })
      const retorno = await axios.get(resource)
      Loading.hide()
      return retorno
    } catch (e) {
      Notify.create({
        color: 'negative',
        message: (e.response && e.response.data && e.response.data.mensagem) ? e.response.data.mensagem : 'Erro buscando dados'
      })
      Loading.hide()
      return false
    }
  },
}

export default ApiService
