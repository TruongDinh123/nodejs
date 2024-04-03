"user strict";

const AccessService = require("../services/access.service");
const { SuccessReponse } = require("../core/success.reponse");

class AccessController {
  signup = async (req, res, next) => {
    return res.status(201).json(await AccessService.signUp(req.body));
  };
}

module.exports = new AccessController();
