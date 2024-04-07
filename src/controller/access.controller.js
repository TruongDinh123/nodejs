"user strict";

const AccessService = require("../services/access.service");
const { SuccessReponse } = require("../core/success.reponse");
const { createApikey } = require("../services/apiKey.service");

class AccessController {
  signup = async (req, res, next) => {
    return res.status(201).json(await AccessService.signUp(req.body));
  };

  login = async (req, res, next) => {
    new SuccessReponse({
      metadata: await AccessService.logIn(req.body),
    }).send(res);
  };

  apiKey = async (req, res, next) => {
    return res.status(200).json(await createApikey());
  };
}

module.exports = new AccessController();
