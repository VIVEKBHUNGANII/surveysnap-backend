const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const surveySchema = new Schema(
  {
    surveyName: {
      type: String,
    },
    surveyDescription: {
      type: String,
    },
    surveyStatus: {
      type: String,
    },
    SurveyType: {
      type: String,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("surveys", surveySchema);
