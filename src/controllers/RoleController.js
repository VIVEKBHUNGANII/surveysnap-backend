const roleModel = require("../models/RoleModel");

const getAllRoles = async (req, res) => {
  const roles = await roleModel.find();

  res.json({
    message: "data fetch succesfully",
    data: roles,
  });
};

const addRole = async (req, res) => {
  const savedRoles = await roleModel.create(req.body);
  // console.log(req.body);

  res.json({
    message: "data saves successfully",
    data: savedRoles,
  });
};
const deleteRole = async (req, res) => {
  const deleteRoles = await roleModel.findByIdAndDelete(req.params.id);
  // console.log(req.params.id);

  res.json({
    message: "data deleted successfully",
    data: deleteRoles,
  });
};
const getRoleById = async (req, res) => {
  const foundRoles = await roleModel.findById(req.params.id);
  // console.log(req.params.id);

  res.json({
    message: "data deleted successfully",
    data: foundRoles,
  });
};

module.exports = {
  getAllRoles,
  addRole,
  deleteRole,
  getRoleById,
};
