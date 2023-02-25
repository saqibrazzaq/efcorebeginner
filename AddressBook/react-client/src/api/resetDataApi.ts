import { LabelReqEdit, LabelReqSearch } from "../dtos/Label";
import { api } from "./axiosconfig"

export const ResetDataApi = {
  createCountries: async function () {
    const response = await api.request({
      url: `/DataReset/add-countries`,
      method: "POST",
    })

    return response.data
  },
  createContacts: async function () {
    const response = await api.request({
      url: `/DataReset/add-contacts`,
      method: "POST",
    })

    return response.data
  },
  deleteAllData: async function () {
    const response = await api.request({
      url: `/DataReset/delete-all`,
      method: "DELETE",
    })

    return response.data
  },
}