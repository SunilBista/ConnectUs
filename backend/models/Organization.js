const mongoose = require("mongoose");

const organizationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
});

const Organization = mongoose.model("organization", organizationSchema);
module.exports = Organization;
