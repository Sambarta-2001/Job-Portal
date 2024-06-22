import React, { useState } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export const CreateJob = () => {
  const userID = useGetUserID();
  const [cookies, _] = useCookies(["access_token"]);
  const [Jobs, setJobs] = useState({
    CompanyName: "",
    Position: "",
    Requirements: [],
    Skills: "",
    CompanyUrl: "",
    Duration: 0,
    userOwner: userID,
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setJobs({ ...Jobs, [name]: value });
  };

  const handleRequirementChange = (event, index) => {
    const { value } = event.target;
    const Requirements = [...Jobs.Requirements];
    Requirements[index] = value;
    setJobs({ ...Jobs, Requirements });
  };

  const handleAddRequirement = () => {
    const Requirements = [...Jobs.Requirements, ""];
    setJobs({ ...Jobs, Requirements });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(
        "http://localhost:3000/Jobs",
        { ...Jobs },
        {
          headers: { authorization: cookies.access_token },
        }
      );

      alert("Job Created");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="create-recipe">
      <h2>Create Job</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="CompanyName">Company Name</label>
        <input
          type="text"
          id="CompanyName"
          name="CompanyName"
          value={Jobs.CompanyName}
          onChange={handleChange}
        />
        <label htmlFor="Position">Position</label>
        <textarea
          id="Position"
          name="Position"
          value={Jobs.Position}
          onChange={handleChange}
        ></textarea>
        <label htmlFor="Requirements">Requirements</label>
        {Jobs.Requirements.map((Requirements, index) => (
          <input
            key={index}
            type="text"
            name="Requirements"
            value={Requirements}
            onChange={(event) => handleRequirementChange(event, index)}
          />
        ))}
        <button type="button" onClick={handleAddRequirement}>
          Add Requirement
        </button>
        <label htmlFor="Skills">Skills</label>
        <textarea
          id="Skills"
          name="Skills"
          value={Jobs.Skills}
          onChange={handleChange}
        ></textarea>
        <label htmlFor="CompanyUrl">Company URL</label>
        <input
          type="text"
          id="CompanyUrl"
          name="CompanyUrl"
          value={Jobs.CompanyUrl}
          onChange={handleChange}
        />
        <label htmlFor="Duration">Duration</label>
        <input
          type="number"
          id="Duration"
          name="Duration"
          value={Jobs.Duration}
          onChange={handleChange}
        />
        <button type="submit">Create Job</button>
      </form>
    </div>
  );
};
