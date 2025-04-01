const answerModel = require("../models/AnswersModel");
const mongoose = require("mongoose");

const addAnswer = async (req, res) => {
  try {
    const addedAnswer = await answerModel.create(req.body);

    res.status(201).json({
      message: "answer added successfully",
      data: addedAnswer,
    });
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
};

const allAnswers = async (req, res) => {
  try {
    const allAnswers = await answerModel.find();

    res.status(200).json({
      message: "fetch all questions answers successfully",
      data: allAnswers,
    });
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
};

const saveAnswers = async (req, res) => {
  try {
    console.log("Received Data:", JSON.stringify(req.body, null, 2));

    let { userId, surveyId, answers } = req.body;

    console.log(" User ID:", userId, "| Type:", typeof userId);
    console.log(" Survey ID:", surveyId, "| Type:", typeof surveyId);

    // Validate userId
    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }

    if (typeof userId !== "string") {
      return res.status(400).json({ message: "userId must be a string" });
    }

    if (!mongoose.isValidObjectId(userId)) {
      console.log(" Invalid userId:", userId);
      return res.status(400).json({ message: "Invalid userId format" });
    }

    //  Convert userId to ObjectId
    userId = new mongoose.Types.ObjectId(userId);

    //  Validate surveyId
    if (!surveyId) {
      return res.status(400).json({ message: "surveyId is required" });
    }

    if (typeof surveyId !== "string") {
      return res.status(400).json({ message: "surveyId must be a string" });
    }

    if (!mongoose.isValidObjectId(surveyId)) {
      console.log(" Invalid surveyId:", surveyId);
      return res.status(400).json({ message: "Invalid surveyId format" });
    }

    //  Convert surveyId to ObjectId
    surveyId = new mongoose.Types.ObjectId(surveyId);

    //  Validate and convert questionId inside answers
    const formattedAnswers = answers.map((answer, index) => {
      if (!answer.questionId) {
        throw new Error(`questionId is missing at index ${index}`);
      }

      if (typeof answer.questionId !== "string") {
        throw new Error(`questionId must be a string at index ${index}`);
      }

      if (!mongoose.isValidObjectId(answer.questionId)) {
        throw new Error(`Invalid questionId format: ${answer.questionId}`);
      }

      return {
        questionId: new mongoose.Types.ObjectId(answer.questionId),
        ans: answer.ans,
      };
    });

    //  Save to database
    const newEntry = new answerModel({
      userId,
      surveyId,
      answers: formattedAnswers,
    });
    await newEntry.save();

    res.status(201).json({ message: "Answers saved successfully" });
  } catch (error) {
    console.error(" Error saving answers:", error);
    res.status(500).json({ message: error.message });
  }
};

const getAllAnsBySurveyId = async (req, res) => {
  try {
    const allansbysurveyid = await answerModel
      .find({
        surveyId: req.params.surveyId,
      })
      .populate("surveyId")
      .populate("userId", "_id firstName lastName email");
    res.status(200).json({
      message: "ans fetch successfully with surveyid",
      data: allansbysurveyid,
    });
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
};
const getAllAnsByQuestionId = async (req, res) => {
  try {
    const allansbyquestionid = await answerModel
      .find({
        "answers.questionId": req.params.questionId,
      })
      .populate("surveyId");

    res.status(200).json({
      message: "ans fetch successfully with questionid",
      data: allansbyquestionid,
    });
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
};

module.exports = {
  addAnswer,
  allAnswers,
  saveAnswers,
  getAllAnsBySurveyId,
  getAllAnsByQuestionId,
};
