const NewCompany = require("../models/new_company_model");

//For Creating New Company
const createNewCompany = async (req, res) => {
  try {
    const company = await NewCompany.create(req.body);

    return res.json({ success: true, message: "Company Created", data: company });
  } catch (ex) {
    return res.json({ success: false, message: ex });
  }
};

//For updating Company

const updateNewCompany = async (req, res) => {
  try {
    const company = await NewCompany.updateOne({ _id: req.params.id }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!company) {
      return res.json({ success: false, message: "Company not found" });
    }
    return res.json({ success: true, data: company });
  } catch (ex) {
    return res.json({ success: false, message: ex });
  }
}

//For Deleting Company
const deleteNewCompany = async (req, res) => {
  try {
    const company = await NewCompany.deleteOne({ _id: req.params.id });
    if (!company) {
      return res.json({ success: false, message: "Company not found" });
    }
    return res.json({ success: true, message: "Company Deleted Successfully!" });
  } catch (ex) {
    return res.json({ success: false, message: ex });
  }
};

const getAllCompany = async (req, res) => {
  try {
    const company = await NewCompany.find({});
    return res.json({ success: true, data: company });
  } catch (ex) {
    return res.json({ success: false, message: ex });
  }
};

const getSingleCompany = async (req, res) => {
  try {
    const company = await NewCompany.findOne({ _id: req.params.id });
    if (!company) {
      return res.json({ success: false, message: "Company not found" });
    }
    return res.json({ success: true, data: company });
  } catch (ex) {
    return res.json({ success: false, message: ex });
  }
};

module.exports = {
  createNewCompany,
  updateNewCompany,
  deleteNewCompany,
  getAllCompany,
  getSingleCompany,
};