"use strict";
const apiKeyModel = require("../models/apiKey.model");
const crypto = require("crypto");

const createApikey = async (permission) => {
  const newKey = apiKeyModel.create({
    key: crypto.randomBytes(64).toString("hex"),
  });

  return newKey;
};

const findById = async (key) => {
  const objKey = await apiKeyModel.findOne({ key, status: true }).lean();
  console.log("🚀 ~ objKey:", objKey)
  return objKey;
};

module.exports = {
  findById,
  createApikey,
};
