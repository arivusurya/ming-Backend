const cron = require("node-cron");

const { verifyUserEmail } = require("./version/v1/controllers/user.controller");

const initiateCrons = () => {
  cron.schedule("* * * * *", () => {
    verifyUserEmail();
  });
};

module.exports = {
  initiateCrons,
};
