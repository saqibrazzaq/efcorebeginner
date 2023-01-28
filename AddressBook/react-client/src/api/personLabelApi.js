import { api } from "./axiosconfig"

export const PersonLabelApi = {
  search: async function (searchParams) {
    const response = await api.request({
      url: "/personLabels/search",
      method: "GET",
      params: searchParams,
    })

    return response.data
  },
  get: async function (personLabelId) {
    if (!personLabelId) return {};
    const response = await api.request({
      url: `/personLabels/` + personLabelId,
      method: "GET",
    })

    return response.data
  },
  create: async function (personLabel) {
    const response = await api.request({
      url: `/personLabels`,
      method: "POST",
      data: personLabel,
    })

    return response.data
  },
  update: async function (personLabelId, personLabel) {
    await api.request({
      url: `/personLabels/` + personLabelId,
      method: "PUT",
      data: personLabel,
    })
  },
  delete: async function (personLabelId) {
    const response = await api.request({
      url: `/personLabels/` + personLabelId,
      method: "DELETE",
    })

    return response.data
  },
}