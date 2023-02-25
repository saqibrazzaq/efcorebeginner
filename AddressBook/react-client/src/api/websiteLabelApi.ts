import { WebsiteLabelReqEdit, WebsiteLabelReqSearch } from "../dtos/WebsiteLabel";
import { api } from "./axiosconfig"

export const WebsiteLabelApi = {
  search: async function (searchParams: WebsiteLabelReqSearch) {
    const response = await api.request({
      url: "/websiteLabels/search",
      method: "GET",
      params: searchParams,
    })

    return response.data
  },
  get: async function (websiteLabelId?: string) {
    if (!websiteLabelId) return {};
    const response = await api.request({
      url: `/websiteLabels/` + websiteLabelId,
      method: "GET",
    })

    return response.data
  },
  count: async function () {
    const response = await api.request({
      url: `/websiteLabels/count`,
      method: "GET",
    })

    return response.data
  },
  create: async function (websiteLabel: WebsiteLabelReqEdit) {
    const response = await api.request({
      url: `/websiteLabels`,
      method: "POST",
      data: websiteLabel,
    })

    return response.data
  },
  update: async function (websiteLabelId?: string, websiteLabel?: WebsiteLabelReqEdit) {
    await api.request({
      url: `/websiteLabels/` + websiteLabelId,
      method: "PUT",
      data: websiteLabel,
    })
  },
  delete: async function (websiteLabelId?: string) {
    const response = await api.request({
      url: `/websiteLabels/` + websiteLabelId,
      method: "DELETE",
    })

    return response.data
  },
}