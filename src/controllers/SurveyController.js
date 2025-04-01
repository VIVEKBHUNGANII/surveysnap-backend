const surveyModel = require("../models/SurveyModel");

const addSurvey = async (req, res) => {
  try {
    const savedSurvey = await surveyModel.create(req.body);
    res.status(201).json({
      message: "survey create successfully",
      data: savedSurvey,
    });
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
};

const getAllSurveys = async (req, res) => {
  try {
    const surveys = await surveyModel.find().populate("userId");
    // console.log(surveys);

    res.status(200).json({
      message: "all surveys fetched successfully",
      data: surveys,
    });
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
};

const getSurveysByUserId = async (req, res) => {
  try {
    console.log(req.params.userId);
    const surveyByUserId = await surveyModel
      .find({ userId: req.params.userId })
      .populate("userId");
    console.log(surveyByUserId);

    if (surveyByUserId.length === 0) {
      res.status(404).json({ message: "No survey found" });
    } else {
      res.status(200).json({
        message: "survey fetched successfully by userId",
        data: surveyByUserId,
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "this is error",
      data: err,
    });
  }
};

module.exports = {
  getAllSurveys,
  addSurvey,
  getSurveysByUserId,
};
