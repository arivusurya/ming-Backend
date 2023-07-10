const helperUtils = require("../utils/helperUtils");
const utils = {};

utils.webProductStructure = (data) => ({
  productId: data?.productId ?? 0,
  name: data?.name ?? "",
  description: data?.description ?? "",
  image: data?.image ?? "",
  images: data?.images ?? "",
  weight: data?.weight ?? 0,
  price: data?.price ?? 0,
  type: data?.type ?? "",
});

utils.userStructure = (data) => ({
  userId: data?.userId ?? 0,
  addressId: data?.addressId ?? 0,
  userName: data?.userName ?? "",
  email: data?.email ?? "",
  accessToken: data?.accessToken ?? "",
  phoneNumber:
    data?.phoneNumber === null ? "" : helperUtils.decrypt(data?.phoneNumber),
});

utils.addressStructure = (data) => ({
  addressId: data?.addressId,
  contact: data?.contact,
  firstName: data?.firstName,
  lastName: data?.lastName,
  address: data?.address ?? "",
  apartment: data?.apartment ?? "",
  city: data?.city ?? "",
  state: data?.state ?? "",
  country: data?.country ?? "",
  pinCode: data?.pinCode ?? 0,
  defaultStatus: data?.defaultStatus ?? "",
  phoneNumber:
    data?.phoneNumber === null ? "" : helperUtils.decrypt(data?.phoneNumber),
});

utils.getCartStruce = (product, cart) => ({
  productId: product?.productId,
  name: product?.name,
  image: product?.image,
  price: product?.price,
  quantity: cart?.quantity,
  description: product?.description,
  type: product?.type,
  weight: product?.weight,
});

utils.reviewStructure = (data) => ({
  userName: data?.name ?? "",
  email: data?.email ?? "",
  review: data?.review ?? "",
  star: data?.star ?? 0,
});

utils.discountStructure = (data) => ({
  discoutId: data?.discountId ?? 0,
  discountCode: data?.discountCode ?? "",
  amount: data?.amount ?? 0,
  startDate: data?.startDate ?? "",
  endDate: data?.endDate ?? "",
  status: data?.status ?? "",
});

utils.compareDiscountStructure = (data) => ({
  discoutId: data?.discountId ?? 0,
  discountCode: data?.discountCode ?? "",
  amount: data?.amount ?? 0,
});

module.exports = utils;
