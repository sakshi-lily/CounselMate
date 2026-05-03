const express = require("express");
const router = express.Router();
const { generateQuestions, saveScore } = require("../controllers/aptitudeController.js");
const isAuthenticated = require("../middleware/authMiddleware.js");

router.get("/generate", isAuthenticated, generateQuestions);


router.post("/score", isAuthenticated, saveScore);

module.exports = router;
