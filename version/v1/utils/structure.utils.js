const helperUtils = require("../utils/helperUtils");
const utils = {};

utils.webProductStructure = (data) => ({
  productId: data?.productId ?? 0,
  name: data?.name ?? "",
  description: data?.description ?? "",
  image: data?.image ?? "",
  weight: data?.weight ?? 0,
  price: data?.price ?? 0,
  type: data?.type ?? "",
});

utils.userStructure = (data) => ({
  userId: data?.userId ?? 0,
  addressId: data?.addressId ?? 0,
  firstName: data?.firstName ?? "",
  lastName: data?.lastName ?? "",
  userName: data?.userName ?? "",
  email: data?.email ?? "",
  password: data?.password ?? "",
  accessToken: data?.accessToken ?? "",
  phoneNumber: helperUtils.decrypt(data?.phoneNumber) ?? "",
  status: data?.status ?? "",
  dateTime: data?.dateTime ?? "",
  date: data?.date ?? "",
});

utils.addressStructure = (data) => ({
  addressId: data?.addressId,
  name: data?.name ?? "",
  address: data?.address ?? "",
  apartment: data?.apartment ?? "",
  city: data?.city ?? "",
  state: data?.state ?? "",
  country: data?.country ?? "",
  pinCode: data?.pinCode ?? 0,
  defaultStatus: data?.defaultStatus ?? "",
  phoneNumber: helperUtils.decrypt(data?.phoneNumber) ?? "",
});

module.exports = utils;
