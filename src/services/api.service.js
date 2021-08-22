import axios from "axios";
import { Loading, Notify, QSpinnerHourglass } from "quasar";

const API = "https://pokeapi.co/api/v2";

const ApiService = {
  async get(resource) {
    try {
      Loading.show({
        spinnerSize: 64,
        spinner: QSpinnerHourglass,
        backgroundColor: "grey-10",
      });
      const result = await axios.get(`${API + resource}`);
      Loading.hide();
      return result;
    } catch (e) {
      Notify.create({
        color: "negative",
        message:
          e.response && e.response.data && e.response.data.mensagem
            ? e.response.data.mensagem
            : "Erro buscando dados",
      });
      Loading.hide();
      return false;
    }
  },
};

export default ApiService;
