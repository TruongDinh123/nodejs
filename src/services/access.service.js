"use strict";
const Shop = require("../models/shop.model");
const { BadRequestError } = require("../core/error.response");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const KeyTokenService = require("./keyToken.service");
const { getInfoData } = require("../utils");
const { createTokenPair } = require("../auth/authUtils");
const { findByEmail } = require("../services/user.service");

class AccessService {
  static signUp = async ({ name, email, password }) => {
    try {
      const holderShop = await Shop.findOne({ email }).lean();
      if (holderShop) {
        throw new BadRequestError("Account already exists");
      }
      const passwordHash = await bcrypt.hash(password, 10);

      const newShop = await Shop.create({
        email,
        name,
        password: passwordHash,
      });

      if (newShop) {
        //chuyển đổi chuỗi byte ngẫu nhiên có độ dài 64bytes thành một chuỗi ký tự để sử dụng
        const privateKey = crypto.randomBytes(64).toString();
        const publicKey = crypto.randomBytes(64).toString();

        const keyShop = await KeyTokenService.createKeyToken({
          shopId: newShop._id,
          publicKey,
          privateKey,
        });

        if (!keyShop) {
          return {
            code: "xxx",
            message: "Error: key account",
          };
        }

        const tokens = await createTokenPair(
          { shopId: newShop._id, email },
          publicKey,
          privateKey
        );

        return {
          code: 201,
          message: {
            account: getInfoData({
              fileds: ["_id", "email", "name"],
              object: newShop,
            }),
            tokens,
          },
          user: newShop,
        };
      }
      return {
        code: 200,
        metadata: null,
      };
    } catch (error) {
      return {
        code: "xxx",
        message: error.message,
        status: "error",
      };
    }
  };

  static logIn = async ({ email, password, refreshToken = null } = null) => {
    const foundShop = await findByEmail({ email });
    if (!foundShop) {
      throw new BadRequestError("Couldn't find an account for " + email);
    }
    const match = bcrypt.compare(password, foundShop.password);
    if (!match) {
      throw new BadRequestError("Couldn't compare password");
    }

    const privateKey = crypto.randomBytes(64).toString("hex");
    const publicKey = crypto.randomBytes(64).toString("hex");

    const { _id: userId } = foundShop;

    const tokens = await createTokenPair(
      { userId, email },
      publicKey,
      privateKey
    );
    await KeyTokenService.createKeyToken({
      refreshToken: tokens.refreshToken,
      privateKey,
      publicKey,
      userId,
    });

    return {
      account: getInfoData({
        fileds: ["_id", "email", "name", "roles"],
        object: foundShop,
      }),
      tokens,
    };
  };
}

module.exports = AccessService;
