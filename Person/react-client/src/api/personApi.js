import { api } from "./axiosconfig"

export const PersonApi = {
  getAll: async function () {
    const response = await api.request({
      url: `/persons/`,
      method: "GET",
    })

    return response.data
  },
  get: async function (personId) {
    if (!personId) return {};
    const response = await api.request({
      url: `/persons/` + personId,
      method: "GET",
    })

    return response.data
  },
  create: async function (person) {
    const response = await api.request({
      url: `/persons`,
      method: "POST",
      data: person,
    })

    return response.data
  },
  update: async function (personId, person) {
    await api.request({
      url: `/persons/` + personId,
      method: "PUT",
      data: person,
    })
  },
}
