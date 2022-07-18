const bcrypt = require("bcryptjs");

function hashPassword(password) {
  return bcrypt.hashSync(password);
}

module.exports = hashPassword;
