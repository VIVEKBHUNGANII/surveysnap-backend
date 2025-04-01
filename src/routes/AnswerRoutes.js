const routes = require("express").Router();
const answerController = require("../controllers/AnswersController");

// routes.post("/addanswers", answerController.addAnswer);
routes.post("/addanswers", answerController.saveAnswers);
routes.get("/allanswer", answerController.allAnswers);
routes.get("/allansbysurveyid/:surveyId", answerController.getAllAnsBySurveyId);
routes.get(
  "/allansbyquestionid/:questionId",
  answerController.getAllAnsByQuestionId
);

module.exports = routes;
