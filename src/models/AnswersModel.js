// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// const answerSchema = new Schema({
//   questionId: {
//     type: Schema.Types.ObjectId,
//     ref: "survey questions",
//   },
//   ans: {
//     type: String,
//   },
// });

// module.exports = mongoose.model("survey answers", answerSchema);

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const answerSchema = new Schema(
  {
    surveyId: {
      type: Schema.Types.ObjectId,
      ref: "surveys", // Reference to the Survey collection
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "users", // Reference to the User collection
      required: true,
    },
    answers: [
      {
        questionId: {
          type: Schema.Types.ObjectId,
          ref: "survey questions", // Reference to the SurveyQuestions collection
          required: true,
        },
        ans: {
          type: Schema.Types.Mixed, // Supports text, number, or array responses
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("survey_answers", answerSchema);
