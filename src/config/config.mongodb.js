const dev = {
  app: {
    port: process.env.PORT || 3052,
  },
  db: {
    host: process.env.DEV_DB_HOST || "127.0.0.1",
    port: process.env.DEV_DB_PORT || 27017,
    name: process.env.DEV_DB_NAME || "ecommerce_dev",
  },
};

const production = {
  app: {
    port: process.env.PRODUCT_DB_HOST || 3053,
    port: process.env.PRODUCT_DB_PORT || 27017,
    name: process.env.PRODUCT_DB_NAME || "ecommerce_production",
  },
};

const config = { dev, production };
const env = process.env.NODE_ENV || "dev";

console.log(config[env], env);
module.exports = config[env];
