"use strict";

const shopModel = require("../models/shop.model");

const findByEmail = async ({
  email,
  select = {
    email: 1,
    password: 1,
    lastName: 1,
    roles: 1,
    status: 1,
  },
}) => {
  return await shopModel.findOne({ email }).select(select).lean();
};

const findById = async (shopId) => {
  try {
    const shop = await shopModel.findById(shopId);
    return shop;
  } catch (error) {
    throw new Error();
  }
};

module.exports = {
  findByEmail,
  findById,
};
