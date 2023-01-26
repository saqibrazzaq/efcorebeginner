import { api } from "./axiosconfig"

export const AddressLabelApi = {
  search: async function (searchParams) {
    const response = await api.request({
      url: "/addressLabels/search",
      method: "GET",
      params: searchParams,
    })

    return response.data
  },
  get: async function (addressLabelId) {
    if (!addressLabelId) return {};
    const response = await api.request({
      url: `/addressLabels/` + addressLabelId,
      method: "GET",
    })

    return response.data
  },
  create: async function (addressLabel) {
    const response = await api.request({
      url: `/addressLabels`,
      method: "POST",
      data: addressLabel,
    })

    return response.data
  },
  update: async function (addressLabelId, addressLabel) {
    await api.request({
      url: `/addressLabels/` + addressLabelId,
      method: "PUT",
      data: addressLabel,
    })
  },
  delete: async function (addressLabelId) {
    const response = await api.request({
      url: `/addressLabels/` + addressLabelId,
      method: "DELETE",
    })

    return response.data
  },
}