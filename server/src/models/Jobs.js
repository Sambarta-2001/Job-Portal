import mongoose from "mongoose";

const JobsSchema = mongoose.Schema({
  Company: {
    type: String,
    required: true,
  },
  Requirements: [
    {
      type: String,
      required: true,
    },
  ],
  Experience: {
    type: Number,
    required: true,
  },

  CompanyURL: {
    type: String,
    required: true,
  },
  DeadLine: {
    type: Number,
    required: true,
  },
  userOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export const JobsModel = mongoose.model("Jobs", JobsSchema);
