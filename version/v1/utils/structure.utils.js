const utils = {};

utils.webProductStructure = (data) => ({
  productId: data?.productId ?? 0,
  name: data?.name ?? "",
  description: data?.description ?? "",
  image: data?.image ?? "",
  weight: data?.weight ?? 0,
  price: data?.price ?? 0,
});

utils.userStructure = (data) => ({
  userId: data?.userId,
  addressId: data?.addressId,
  firstName: data?.firstName,
  lastName: data?.lastName,
  userName: data?.userName,
  email: data?.email,
  password: data?.password,
  accessToken: data?.accessToken,
  status: data?.status,
  dateTime: data?.dateTime,
  date: data?.date,
});

module.exports = utils;
