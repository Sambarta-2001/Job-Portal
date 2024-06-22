import React, { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import axios from "axios";

export const Home = () => {
  const [Jobs, setJobs] = useState([]);
  const [savedJobs, setSavedJobs] = useState([]);

  const userID = useGetUserID();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get("http://localhost:3001/recipes");
        setJobs(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchSavedJobs = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/Jobs/savedJobs/ids/${userID}`
        );
        setSavedJobs(response.data.savedJobs);
      } catch (err) {
        console.log(err);
      }
    };

    fetchJobs();
    fetchSavedJobs();
  }, []);

  const saveJobs = async (JobID) => {
    try {
      const response = await axios.put("http://localhost:3001/Jobs", {
        JobID,
        userID,
      });
      setSavedJobs(response.data.savedJobs);
    } catch (err) {
      console.log(err);
    }
  };

  const isJobSaved = (id) => savedJobs.includes(id);

  return (
    <div>
      <h1>JobMart</h1>
      <ul>
        {Jobs.map((Job) => (
          <li key={Jobs._id}>
            <div>
              <h2>{Jobs.name}</h2>
              <button
                onClick={() => saveJobs(Job._id)}
                disabled={isJobSaved(Job._id)}
              >
                {isJobSaved(Job._id) ? "Saved" : "Save"}
              </button>
            </div>
            <div className="Skills">
              <p>{Job.Skills}</p>
            </div>
            <img src={Job.CompanyUrl} alt={Job.CompanyName} />
            <p>Duration {Job.Duration} Timeframe</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
