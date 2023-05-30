const { Router } = require("express");
const {
  // createMessageExpress,
  getMessages,
} = require("../controllers/messageController");

const router = Router();

router.get("/", getMessages);

// router.post("/", createMessageExpress);

module.exports = router;
