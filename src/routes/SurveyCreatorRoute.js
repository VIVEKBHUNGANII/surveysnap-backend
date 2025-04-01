const routes = require("express").Router();
const surveyCreatorController = require("../controllers/SurveyCreatorController");

routes.post("/addsurveycreator", surveyCreatorController.addSurveyCreator);
routes.get("/allsurveycreators", surveyCreatorController.getAllSurveyCreators);

module.exports = routes;
