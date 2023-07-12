const crypto = require("crypto");
const utils = {};

const algorithm = process.env.CRYPTO_ALGO;
const key = process.env.CRYPTO_KEY;
const iv = Buffer.alloc(16).fill(0);

utils.generateRandomNumber = (length) => {
  let number;
  while (!number) {
    const id = parseInt(Math.random().toString().substr(2, length)).toString();
    if (id.length === length) number = id;
  }
  return number;
};

utils.shuffle = (array) => {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

utils.encrypt = (text) => {
  let cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
  let encrypted = cipher.update(text?.toString());
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return encrypted?.toString("hex");
};

utils.decrypt = (text) => {
  let encryptedText = Buffer.from(text, "hex");
  let decipher = crypto.createDecipheriv(
    algorithm,
    Buffer.from(key),
    Buffer.from(iv, "hex")
  );
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted?.toString();
};

utils.FindProductCost = (cartitems) => {
  let productcost = 0;
  cartitems.map((e) => {
    productcost += e.product.price * e.quantity;
  });
  return productcost;
};

utils.cartitems = (orderId, cart) => {
  let cartitems = [];
  cart.map((e) => {
    cartitems.push({
      orderId: orderId,
      productId: e.productId,
      quantity: e.quantity,
    });
  });
  return cartitems;
};

utils.findWeight = (cartitems) => {
  let weight = 0;
  for (let e of cartitems) {
    weight += e.product.weight * e.quantity;
  }
  return weight / 1000;
};

module.exports = utils;
