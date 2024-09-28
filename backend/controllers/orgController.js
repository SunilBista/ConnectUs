const Organization = require("../models/Organization");
const responseService = require("../service/responseService");

const getOrganizationData = async (req, res) => {
  console.log("REQ", req);
  const { id } = req.params;
  try {
    const organization = await Organization.findById(id).populate(
      "members",
      "-password"
    );
    if (!organization) {
      return res
        .status(404)
        .json(responseService.notFoundError("Organization not found"));
    }
    res
      .status(200)
      .json(
        responseService.success("Organization data retrieved", organization)
      );
  } catch (error) {
    res
      .status(500)
      .json(
        responseService.internalServerError("Service not available", error)
      );
  }
};

module.exports = { getOrganizationData };
