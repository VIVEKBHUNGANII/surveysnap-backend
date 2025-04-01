const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const optionsSchema = new Schema({
  text: {
    type: String,
  },
});

const questionSchema = new Schema({
  question: {
    type: String,
  },
  options: [optionsSchema],
  surveyId: {
    type: Schema.Types.ObjectId,
    ref: "surveys",
  },
});

module.exports = mongoose.model("survey questions", questionSchema);
