// BiographyForm.js
import React, { useState } from "react";
import axios from "axios";

 export const BiographyForm = ({ userId }) => {
  const [biography, setBiography] = useState("");
  const [message, setMessage] = useState("");

  const handleBiographyChange = (e) => {
    setBiography(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `http://localhost:7000/biography/${userId}`,
        { biography }
      );
      setMessage("Biography updated successfully");
    } catch (error) {
      setMessage("An error occurred while updating biography");
      console.error("Error updating biography:", error);
    }
  };

  return (
    <div>
      <h2>Enter Your Biography</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={biography}
          onChange={handleBiographyChange}
          placeholder="Enter your biography"
          rows={5}
          cols={40}
        />
        <button type="submit">Submit</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

