import { api } from "./axiosconfig"

export const PersonApi = {
  getAll: async function () {
    const response = await api.request({
      url: `/persons/`,
      method: "GET",
    })

    return response.data
  },
}
