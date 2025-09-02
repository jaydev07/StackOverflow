const questionServices = require('../services/question-services');
const HttpError = require('../utils/http-error');
const {validationResult} = require('express-validator');

const createQuestion = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw new HttpError(errors.array()[0].msg, 400);
        }

        const question = await questionServices.createQuestion(req.body, req.user._id);

        res.status(201).json(question);
    } catch (err) {
        next(new HttpError(err.message, err.code || 500));
    }
};

const searchQuestionsByTag = async (req, res, next) => {
    try {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw new HttpError(errors.array()[0].msg, 400);
        }

        const { tag, page, limit } = req.query;
        
        const result = await questionServices.searchQuestionsByTag(tag, page, limit);
        
        res.status(200).json(result);
    } catch (err) {
        next(new HttpError(err.message, err.code || 500));
    }
};

module.exports = {
    createQuestion,
    searchQuestionsByTag
}