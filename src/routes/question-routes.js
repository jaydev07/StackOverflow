const express = require('express');
const router = express.Router();
const questionControllers = require('../controllers/question-controllers');
const { userAuth } = require('../middlewares/userAuth');
const { questionValidation } = require('../middlewares/question-validators');
// const { signupValidation, loginValidation } = require('../middlewares/auth-validators');

// router.get("/", questionControllers); // ?search=&tag=&page=&limit=
router.post("/", userAuth, [ questionValidation ], questionControllers.createQuestion);
// router.get("/:id", questionControllers);

// // vote on question
// router.post("/:id/vote", protect, questionControllers);

// // post answer to question
// router.post("/:questionId/answers", protect, questionControllers);

module.exports = router;