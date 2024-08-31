const express = require("express");
const router = express.Router();

const { createForm } = require("../controller/form");

router.post("/submit", createForm);

module.exports = router;
