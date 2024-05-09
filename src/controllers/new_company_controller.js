const NewCompany = require("../models/new_company_model");

//For Creating New Company
const createNewCompany = async (req, res) => {
  try {

    const newComp = req.body;


    console.log(newComp);

    // Handle image data if present
    if (newComp.logo1 && newComp.logo1.length > 0) {
      newComp.logo1 = newComp.logo1.map((image) => ({
        data: Buffer.from(image.data, "base64"),
        contentType: image.contentType,
        filename: image.filename,
      }));
    }
    if (newComp.logo2 && newComp.logo2.length > 0) {
      newComp.logo2 = newComp.logo2.map((image) => ({
        data: Buffer.from(image.data, "base64"),
        contentType: image.contentType,
        filename: image.filename,
      }));
    }

    const company = await NewCompany.create(newComp);

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

    // Handle image data if present
    if (company.logo1 && company.logo1.length > 0) {
      company.logo1 = company.logo1.map((image) => ({
        data: Buffer.from(image.data, "base64"),
        contentType: image.contentType,
        filename: image.filename,
      }));
    }
    if (company.logo2 && company.logo2.length > 0) {
      company.logo2 = company.logo2.map((image) => ({
        data: Buffer.from(image.data, "base64"),
        contentType: image.contentType,
        filename: image.filename,
      }));
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
    const company = await NewCompany.findById(req.params.id);
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


