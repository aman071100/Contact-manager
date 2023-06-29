const express = require("express");
const router = express.Router();
const {getAllContacts,
       createContacts,
       getContact,
       updateContact,
       deleteContact} = require("../controllers/contactController");
const validateToken = require("../middleware/validateTokenHandler");

router.use(validateToken);
router.route("/").get(getAllContacts).post(createContacts);
router.route("/:id").get(getContact).put(updateContact).delete(deleteContact);

module.exports = router;