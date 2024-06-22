import React, { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import axios from "axios";

export const SavedJobs = () => {
  const [savedJobs, setSavedJobs] = useState([]);
  const userID = useGetUserID();

  useEffect(() => {
    const fetchSavedJobs = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/Jobs/savedJobs/${userID}`
        );
        setSavedJobs(response.data.savedJobs);
      } catch (err) {
        console.log(err);
      }
    };

    fetchSavedJobs();
  }, []);
  return (
    <div>
      <h1>Saved Jobs</h1>
      <ul>
        {savedJobs.map((Job) => (
          <li key={Job._id}>
            <div>
              <h2>{Job.CompanyName}</h2>
            </div>
            <p>{Job.Skills}</p>
            <img src={Job.CompanyUrl} alt={Job.CompanyName} />
            <p>Duration {Job.Duration} Timeframe</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
