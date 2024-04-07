"use strict";

const express = require("express");
const accessController = require("../../controller/access.controller");
const { apiKey, asyncHandler } = require("../../auth/checkAuthen");
const router = express.Router();

router.post("/shop/signup", accessController.signup);
router.post("/shop/api-key", accessController.apiKey);
router.post("/shop/login", apiKey, asyncHandler(accessController.login));
module.exports = router;
