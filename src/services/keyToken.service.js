const keyTokenModel = require("../models/key-token.model");

class KeyTokenService {
  static createKeyToken = async ({
    userId,
    publicKey,
    privatekey,
    refreshToken,
  }) => {
    try {
      const filter = {
        user: userId,
      };
      update = {
        publicKey,
        privatekey,
        refreshTokensUsed: [],
        refreshToken,
      };
      options = { upsert: true, new: true };
      const tokens = await keyTokenModel.findByIdAndUpdate(
        filter,
        update,
        options
      );
      return tokens ? tokens.publicKey : null;
    } catch (error) {
      return error;
    }
  };
}

module.exports = KeyTokenService;
