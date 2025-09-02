const { body } = require('express-validator');

const questionValidation = [
    body('title')
    .notEmpty().withMessage('Title is required')
    .isLength({ min: 10 }).withMessage('Title must be at least 10 characters long'),

    body('body')
    .notEmpty().withMessage('Body is required')
    .isLength({ min: 10 }).withMessage('Body must be at least 10 characters long'),
];

module.exports = {
    questionValidation
}