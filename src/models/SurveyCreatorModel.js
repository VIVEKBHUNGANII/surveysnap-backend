const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const surveyCreatorSchema = new Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  age: {
    type: Number,
  },
  status: {
    tpye: Boolean,
  },
  roleId: {
    type: Schema.Types.ObjectId,
    ref: "roles",
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
});

module.exports = mongoose.model("survey creators", surveyCreatorSchema);
