const routes = require("express").Router();
const surveyController = require("../controllers/SurveyController");

routes.post("/addsurvey", surveyController.addSurvey);
routes.get("/allsurvey", surveyController.getAllSurveys);
routes.get("/allsurveybyuserid/:userId", surveyController.getSurveysByUserId);

module.exports = routes;
