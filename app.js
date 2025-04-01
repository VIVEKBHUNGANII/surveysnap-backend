const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(express.json());

app.use(cors());

mongoose.connect("mongodb://localhost:27017/node_internship").then(() => {
  console.log("database connected...");
});

// for roles
const roleRoutes = require("./src/routes/RoleRoute");
app.use(roleRoutes);

//for users
const userRoute = require("./src/routes/UserRoute");
app.use(userRoute);

//for surveys
const surveyRoute = require("./src/routes/SurveyRoute");
app.use("/survey", surveyRoute);

//for survey creators
const surverCreatorRoute = require("./src/routes/SurveyCreatorRoute");
app.use("/creator", surverCreatorRoute);

//for questions
const questionRoute = require("./src/routes/QuestionRoute");
app.use("/question", questionRoute);

//for answers
const answersRoute = require("./src/routes/AnswerRoutes");
app.use("/ans", answersRoute);

const PORT = 3000;
app.listen(PORT, () => {
  console.log("server is running on", PORT);
});
