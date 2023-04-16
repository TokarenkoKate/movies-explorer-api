require('dotenv').config();

const { JWT_SECRET = 'JTW_SECRET' } = process.env;
const { PORT = 3000 } = process.env;
const { DB_ADDRESS = 'mongodb://localhost:27017/bitfilmsdb' } = process.env;
const { NODE_ENV = 'production' } = process.env;

module.exports = {
  JWT_SECRET,
  PORT,
  DB_ADDRESS,
  NODE_ENV,
};
