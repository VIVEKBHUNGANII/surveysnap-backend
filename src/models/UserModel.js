const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
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
    photoUrl: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("users", userSchema);
