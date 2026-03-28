const api = require("express").Router();
const melolo = require("./melolo.route");

// register all router
api.use(melolo);

module.exports = api;
