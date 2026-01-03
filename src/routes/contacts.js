const express = require("express");
const {
  listContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
} = require("../controllers/contactsController");

const router = express.Router();

router.get("/", listContacts);
router.get("/:id", getContact);
router.post("/", createContact);
router.patch("/:id", updateContact);
router.delete("/:id", deleteContact);

module.exports = router;
