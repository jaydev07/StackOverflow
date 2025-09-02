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

const searchQuestionsByTag = async (tag, page = 1, limit = 10) => {
    try {
        const pageNum = parseInt(page) || 1;
        const limitNum = parseInt(limit) || 10;
        const skip = (pageNum - 1) * limitNum;
        
        const query = tag ? { tags: { $in: [tag] } } : {};
        
        // Execute query with pagination
        const questions = await Question.find(query)
            .populate('userId', 'username email') // Populate user details
            .sort({ createdAt: -1 }) // Sort by newest first
            .skip(skip)
            .limit(limitNum)
            .lean();
        
        // Get total count for pagination info
        const totalQuestions = await Question.countDocuments(query);
        const totalPages = Math.ceil(totalQuestions / limitNum);
        
        return {
            questions,
            pagination: {
                currentPage: pageNum,
                totalPages,
                totalQuestions,
                hasNextPage: pageNum < totalPages,
                hasPrevPage: pageNum > 1,
                limit: limitNum
            }
        };
    } catch (err) {
        throw new HttpError(err.message, 500);
    }
}

module.exports = {
    createQuestion,
    searchQuestionsByTag
}