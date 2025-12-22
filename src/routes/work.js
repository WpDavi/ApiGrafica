const express = require("express");
const {
  listWork,
  getWork,
  createWork,
  updateWork,
  deleteWork,
} = require("../controllers/productsController");

const router = express.Router();

router.get("/", listWork);
router.get("/:id", getWork);
router.post("/", createWork);
router.put("/:id", updateWork);
router.delete("/:id", deleteWork);

module.exports = router;
