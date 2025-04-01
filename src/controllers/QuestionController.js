const questionModel = require("../models/QuestionModel");

const addQuestion = async (req, res) => {
  console.log(req.body);
  try {
    const addedQuestion = await questionModel.create(req.body);

    res.status(201).json({
      message: "question created successfully",
      data: addedQuestion,
    });
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
};

const allQuestions = async (req, res) => {
  try {
    const allQuestions = await questionModel.find();

    res.status(200).json({
      message: "fetch all questions successfully",
      data: allQuestions,
    });
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
};

const allQuestionBySurveyId = async (req, res) => {
  try {
    const allQuestionById = await questionModel
      .find({ surveyId: req.params.surveyId })
      .populate("surveyId");

    res.status(200).json({
      message: "fetch all question by surveyId",
      data: allQuestionById,
    });
  } catch (err) {
    res.status(500).json({
      message: "error",
      data: err,
    });
  }
};

module.exports = {
  addQuestion,
  allQuestions,
  allQuestionBySurveyId,
};
