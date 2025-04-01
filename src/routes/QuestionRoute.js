const routes = require("express").Router();
const questionController = require("../controllers/QuestionController");

routes.post("/addquestions", questionController.addQuestion);
routes.get("/allquestions", questionController.allQuestions);
routes.get(
  "/allquestionsbysurveyid/:surveyId",
  questionController.allQuestionBySurveyId
);

module.exports = routes;
