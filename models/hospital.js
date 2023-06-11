import { config } from "dotenv";
config();
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const HospitalSchema = mongoose.Schema({
  hospital_name: {
    type: String,
    required: [true, "Please provide name"],
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide valid email",
    ],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    minlength: 6,
  },
  gender: {
    type: String,
    // required: [true, "Please provide gender"],
  },
  contact_number: {
    type: String,
    // required: [true, "Please provide Contact Number"],
  },
});

HospitalSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

HospitalSchema.methods.createJWT = function () {
  const token = jwt.sign({ userId: this._id, name: this.name }, "abcdef", {
    expiresIn: "30d",
  });
  console.log(token);
  return token;
};

HospitalSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

const HospitalModel = mongoose.model("Hospital", HospitalSchema);

export default HospitalModel;
