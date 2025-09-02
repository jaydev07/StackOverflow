const questionServices = require('../services/question-services');
const HttpError = require('../utils/http-error');
const {validationResult} = require('express-validator');

const createQuestion = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw new HttpError(errors.array()[0].msg, 400);
        }

        const question = await questionServices.createQuestion(req.body, req.user._id);

        res.status(201).json(question);
    } catch (err) {
        throw new HttpError(err.message, 500);
    }
  };

  module.exports = {
    createQuestion
  }