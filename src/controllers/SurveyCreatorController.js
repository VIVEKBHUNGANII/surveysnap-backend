const surveyCreatorModel = require("../models/SurveyCreatorModel");
const bcrypt = require("bcrypt");

const addSurveyCreator = async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    // console.log(hashedPassword);
    req.body.password = hashedPassword;
    const addedCreator = await surveyCreatorModel.create(req.body);
    res.status(201).json({
      message: "user added successfully",
      data: addedCreator,
    });
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
};

const getAllSurveyCreators = async (req, res) => {
  // console.log(req.body);

  try {
    const getAllSurveyCreators = await surveyCreatorModel
      .find()
      .populate("roleId");

    res.status(200).json({
      message: "data fetched successfully",
      data: getAllSurveyCreators,
    });
  } catch (err) {
    res.status(500).json({
      message: "error",
      data: err,
    });
  }
};

module.exports = {
  addSurveyCreator,
  getAllSurveyCreators,
};
