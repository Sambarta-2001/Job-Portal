import express from "express";
import mongoose from "mongoose";
import { JobsModel } from "../models/Jobs.js";
import { UserModel } from "../models/Users.js";
import { verifyToken } from "./user.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const result = await JobsModel.find({});
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create a new recipe
router.post("/", verifyToken, async (req, res) => {
  const Job = new JobsModel({
    _id: new mongoose.Types.ObjectId(),
    Company_Name: req.body.Company_Name,
    image: req.body.image,
    Requirements: req.body.Requirements,
    Experience: req.body.Experience,
    Company_URL: req.body.Company_URL,
    Deadline: req.body.Deadline,
    userOwner: req.body.userOwner,
  });
  console.log(Job);

  try {
    const result = await Job.save();
    res.status(201).json({
      PostedJob: {
        Company_Name: result.Company_Name,
        image: result.image,
        Requirements: result.Requirements,
        Experience: result.Experience,
        _id: result._id,
      },
    });
  } catch (err) {
    // console.log(err);
    res.status(500).json(err);
  }
});

// Get a recipe by ID
router.get("/:JobId", async (req, res) => {
  try {
    const result = await JobsModel.findById(req.params.JobId);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Save a Recipe
router.put("/", async (req, res) => {
  const Job = await JobsModel.findById(req.body.JobID);
  const user = await UserModel.findById(req.body.userID);
  try {
    user.savedRecipes.push(Job);
    await user.save();
    res.status(201).json({ savedJobs: user.savedJobs });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get id of saved recipes
router.get("/savedJobs/ids/:userId", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userId);
    res.status(201).json({ savedJobs: user?.savedJobs });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Get saved recipes
router.get("/savedJobs/:userId", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userId);
    const savedJobs = await JobsModel.find({
      _id: { $in: user.savedJobs },
    });

    console.log(savedJobs);
    res.status(201).json({ savedJobs });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

export { router as JobsRouter };
