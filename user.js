console.log("this is user file");

const userName = "vivek";
const userAge = 21;

const userFunction = () => {
  console.log("this is called from user function");
};

module.exports = {
  userName,
  userAge,
  userFunction,
};
