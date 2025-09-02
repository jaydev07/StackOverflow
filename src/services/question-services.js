const Question = require('../models/question');
const HttpError = require('../utils/http-error');

const createQuestion = async (input, userId) => {
    try {
        const { title, body, tags } = input;
        const newQuestion = await Question.create({ 
            title, 
            body, 
            tags: tags || [], 
            userId: userId 
        });

        await newQuestion.save();
        
        return newQuestion;
    }catch(err) {
        throw new HttpError(err.message, 500);
    }
}

module.exports = {
    createQuestion
}