import { api } from "./axiosconfig"

export const TranslationApi = {
  search: async function (searchParams) {
    const response = await api.request({
      url: "/translations/search",
      method: "GET",
      params: searchParams,
    })

    return response.data
  },
  get: async function (translationId) {
    if (!translationId) return {};
    const response = await api.request({
      url: `/translations/` + translationId,
      method: "GET",
    })

    return response.data
  },
  create: async function (translation) {
    const response = await api.request({
      url: `/translations`,
      method: "POST",
      data: translation,
    })

    return response.data
  },
  update: async function (translationId, person) {
    await api.request({
      url: `/translations/` + translationId,
      method: "PUT",
      data: person,
    })
  },
  delete: async function (translationId) {
    const response = await api.request({
      url: `/translations/` + translationId,
      method: "DELETE",
    })

    return response.data
  },
}