const {
  insertsDataFromJson,
  searchByDui,
  deleteAllData,
  createJson,
  index,
} = require("../controllers/culturalAgent.controller");
const { Router } = require("express");

const router = Router();

router.get("/api/bandesal/v1/insertJson", insertsDataFromJson);
router.post("/api/bandesal/v1/searchByDui", searchByDui);
router.get("/api/bandesal/v1/deleteAllData", deleteAllData);
router.get("/api/bandesal/v1/createJson", createJson);
router.get("/api/bandesal/v1/", index);

module.exports = router;
