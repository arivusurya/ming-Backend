const utils = {};

utils.webProductStructure = (data) => ({
  productId: data?.productId ?? 0,
  name: data?.name ?? "",
  description: data?.description ?? "",
  image: data?.image ?? "",
  weight: data?.weight ?? 0,
  price: data?.price ?? 0,
});

module.exports = utils;
