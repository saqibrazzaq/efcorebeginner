import { TranslationReqEdit, TranslationReqSearch } from "../dtos/Translation";
import { api } from "./axiosconfig"

export const TranslationApi = {
  search: async function (searchParams: TranslationReqSearch) {
    const response = await api.request({
      url: "/translations/search",
      method: "GET",
      params: searchParams,
    })

    return response.data
  },
  get: async function (translationId?: string) {
    if (!translationId) return {};
    const response = await api.request({
      url: `/translations/` + translationId,
      method: "GET",
    })

    return response.data
  },
  create: async function (translation: TranslationReqEdit) {
    const response = await api.request({
      url: `/translations`,
      method: "POST",
      data: translation,
    })

    return response.data
  },
  update: async function (translationId?: string, person?: TranslationReqEdit) {
    await api.request({
      url: `/translations/` + translationId,
      method: "PUT",
      data: person,
    })
  },
  delete: async function (translationId?: string) {
    const response = await api.request({
      url: `/translations/` + translationId,
      method: "DELETE",
    })

    return response.data
  },
}