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

utils.panelProductStructure = (data) => ({
  productId: data?.productId ?? 0,
  name: data?.name ?? "",
  description: data?.description ?? "",
  image: data?.image ?? "",
  images: data?.images ?? "",
  weight: data?.weight ?? 0,
  price: data?.price ?? 0,
  type: data?.type ?? "",
  status: data?.status ?? "",
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

utils.courier = (courier) => ({
  courier_name: courier.courier_name,
  price: courier.freight_charge,
  estimated_delivery_days: courier.estimated_delivery_days,
  etd: courier.etd,
});

utils.ShiprocketOrder = (order, item, weight) => {
  let Body = {};

  // console.log(helperUtils.decrypt(order?.addresss?.phoneNumber));
  if (weight < 0.5) {
    weight = 0.5;
  }
  const date = new Date();
  Body.order_id = order?.orderId;
  (Body.order_date = date.toLocaleString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  })),
    (Body.pickup_location = "Primary");
  Body.channel_id = "4003873";
  Body.comment = "MingMorshels Cookies";
  Body.billing_customer_name = order?.addresss?.firstName;
  Body.billing_last_name = order?.addresss?.lastName;
  Body.billing_address = order?.addresss?.address;
  Body.billing_address_2 = order?.addresss?.apartment || " ";
  Body.billing_city = order?.addresss?.city;
  Body.billing_pincode = order?.addresss?.pinCode;
  Body.billing_state = order?.addresss?.state;
  Body.billing_country = order?.addresss?.country;
  Body.billing_email = order?.addresss?.contact;
  Body.billing_phone = helperUtils.decrypt(order?.addresss?.phoneNumber);
  Body.shipping_is_billing = true;
  Body.shipping_customer_name = "";
  Body.shipping_last_name = "";
  Body.shipping_address = "";
  Body.shipping_address_2 = "";
  Body.shipping_city = "";
  Body.shipping_pincode = "";
  Body.shipping_country = "";
  Body.shipping_state = "";
  Body.shipping_email = "";
  Body.shipping_phone = "";
  Body.order_items = item;
  Body.payment_method = "Prepaid";
  Body.shipping_charges = 0;
  Body.giftwrap_charges = 0;
  Body.transaction_charges = 0;
  Body.total_discount = 0;
  Body.sub_total = order?.Productcost;
  Body.length = 10;
  Body.breadth = 15;
  Body.height = 20;
  Body.weight = weight;
  return Body;
};

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

utils.AdminOrderItem = (data) => {
  const orderItem = [];
  data.map((e) => {
    orderItem.push({
      name: e?.product?.name,
      price: e?.product?.price,
      quantity: e?.quantity,
      amount: e?.product?.price * e?.quantity,
    });
  });
  return orderItem;
};

utils.AdminActiveOrder = (data) => {
  let Orders = [];

  data.map((e) => {
    Orders.push({
      orderId: e?.orderId,
      User: e?.user?.userName,
      amount: e?.amount,
      Item: utils.AdminOrderItem(e?.orderItems),
      payId: e?.paymentId,
      status: e?.status,
      isFreeShip: e?.isFreeShipping,
      address: `${e?.addresss?.firstName}${e?.addresss?.lastName}, ${e?.addresss?.address},${e?.addresss?.apartment},${e?.addresss?.city},${e?.addresss?.state},${e?.addresss?.pinCode}`,
      // billingPhone:
      //   e?.addresss?.phoneNumber === null || e?.addresss?.phoneNumber === ""
      //     ? ""
      //     : helperUtils.decrypt(e?.phoneNumber),
      status: e?.status,
      shppingmethod: e?.shippingMethod,
      shippingPrice: e?.shippingCost,
      Date: e?.date,
    });
  });
  return Orders;
};

utils.structureOrderData = (orders) => {
  const structuredOrders = orders.map((order) => {
    const structuredOrder = {
      orderId: order.orderId,
      userEmail: order.user.email,
      address: order?.address?.address,
      phoneNumber: order?.address?.phoneNumber,
      isFreeShipping: order.isFreeShipping,
      amount: order.amount,
      shippingPrice: order.shippingCost,
      status: order.status,
      date: order.date, // Include the date property
      orderItems: order.orderItems.map((item) => ({
        productName: item?.product?.name,
        quantity: item?.quantity,
        amount: item?.product?.price * item?.quantity,
      })),
    };

    if (order.awbcode) {
      structuredOrder.awbcode = order.awbcode;
    }

    return structuredOrder;
  });

  return structuredOrders;
};

utils.AdminUser = (data) => {
  let user = [];
  data.map((e) => {
    user.push({
      userid: e?.userId,
      userName: e?.userName,
      email: e?.email,
      Phone:
        e?.phoneNumber === null || e?.phoneNumber === ""
          ? ""
          : helperUtils.decrypt(e?.phoneNumber),
      status: e?.status,
    });
  });
  return user;
};

module.exports = utils;
