import { AddressLabelReqEdit, AddressLabelReqSearch } from "../dtos/AddressLabel";
import { api } from "./axiosconfig"

export const AddressLabelApi = {
  search: async function (searchParams?: AddressLabelReqSearch) {
    const response = await api.request({
      url: "/addressLabels/search",
      method: "GET",
      params: searchParams,
    })

    return response.data
  },
  get: async function (addressLabelId?: string) {
    if (!addressLabelId) return {};
    const response = await api.request({
      url: `/addressLabels/` + addressLabelId,
      method: "GET",
    })

    return response.data
  },
  create: async function (addressLabel: AddressLabelReqEdit) {
    const response = await api.request({
      url: `/addressLabels`,
      method: "POST",
      data: addressLabel,
    })

    return response.data
  },
  update: async function (addressLabelId?: string, addressLabel?: AddressLabelReqEdit) {
    await api.request({
      url: `/addressLabels/` + addressLabelId,
      method: "PUT",
      data: addressLabel,
    })
  },
  delete: async function (addressLabelId?: string) {
    const response = await api.request({
      url: `/addressLabels/` + addressLabelId,
      method: "DELETE",
    })

    return response.data
  },
}