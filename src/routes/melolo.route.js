const {
  getMeloloLatest,
  getMeloloTrending,
  meloloSearch,
} = require("../controllers/melolo.controller");

const route = require("express").Router();

route.get("/melolo/latest", getMeloloLatest);
route.get("/melolo/trending", getMeloloTrending);
route.get("/melolo/search", meloloSearch);

module.exports = route;
