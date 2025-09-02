const express = require('express');
const router = express.Router();
const questionControllers = require('../controllers/question-controllers');
const { userAuth } = require('../middlewares/userAuth');
const { questionValidation, searchValidation } = require('../middlewares/question-validators');

// Search questions by tag with pagination
router.get("/search", userAuth, [ searchValidation ], questionControllers.searchQuestionsByTag); // ?tag=&page=&limit=

// Get all questions (keeping the existing route)
// router.get("/", searchValidation, questionControllers.searchQuestionsByTag); // ?tag=&page=&limit=

router.post("/", userAuth, [ questionValidation ], questionControllers.createQuestion);

module.exports = router;