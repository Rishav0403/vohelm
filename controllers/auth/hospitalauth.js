import Hospital from "../../models/hospital.js";
import { BadRequestError, UnauthenticatedError } from "../../errors/index.js";
import { StatusCodes } from "http-status-codes";

export const hopitalSignup = async (req, res) => {
  const { name, email, password } = req.body;
  console.log(name, email, password);
  try {
    const hospital = await Hospital.create({
      name,
      email,
      password,
      ...req.body,
    });
    const token = hospital.createJWT();
    res
      .status(StatusCodes.CREATED)
      .json({ hospital: { name: hospital.hospital_name }, token });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }
  const hospital = await Hospital.findOne({ email });
  if (!hospital) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
  try {
    const isPasswordCorrect = await hospital.comparePassword(password);
    if (!isPasswordCorrect) {
      throw new UnauthenticatedError("Invalid Credentials");
    }
    const token = hospital.createJWT();
    res
      .status(StatusCodes.OK)
      .json({ user: { name: hospital?.hospital_name }, token });
  } catch (error) {
    res.status(500).send(error);
  }
};

export const verifyOtp = async (req, res) => {};
