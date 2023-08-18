import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

export const Signup = () => {


  
  const navigate = useNavigate();
  const [image, setImage] = useState(null);

  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
    username: "",
    
  });
  const { email, password, username} = inputValue;
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };
  const onFileSelect = (e) => {
    console.log(e.target.files[0]);
    setImage(e.target.files[0]);
  };
  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
    });
  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-right",
    });

    const handleSubmit = async (e) => {
      e.preventDefault();
    


      const formData = new FormData();
    formData.append("image", image);

    const result = await axios.post(
      "http://localhost:7000/upload-image",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    console.log(">>>",result)
    const { data:{imagePath=''} ={} } = result;



      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        handleError("Invalid email format");
        return;
      }
    
     
     
    
      if (password.length < 8) {
        handleError("Password must be at least 8 characters long");
        return;
      }
      if (username.length < 6) {
        handleError("Username must be at least 8 characters long");
        return;
      }


      try {
        const usernameResponse = await axios.post(
          "http://localhost:7000/check-username",
          { username: inputValue.username }
        );
        const { isValidUsername, error } = usernameResponse.data;
      
        if (!isValidUsername) {
          handleError("Profane"); // Display the profanity error
          return;
        }
      
        // Rest of the code
      } catch (error) {
        console.log("API Error:", error);
        handleError("An error occurred while checking the username, it might conain profanity.");
      }
      

    
      try {
        const { data } = await axios.post(
          "http://localhost:7000/signup",
          {
            ...inputValue,
            image: imagePath, 
          },
          { withCredentials: true }
        );
        const { success, message } = data;
        if (success) {
          handleSuccess(message);
          setTimeout(() => {
            navigate("/");
          }, 1000);
        } else {
          handleError(message);
        }
      } catch (error) {
        console.log(error);
      }
      setInputValue({
        ...inputValue,
        email: "",
        password: "",
        username: "",
      });
    };
    
  
    

  return (
    <div className="form_container">
      <h2>Signup Account</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            placeholder="Enter your email"
            onChange={handleOnChange}
          />
        </div>
        <div>
          <label htmlFor="email">Username</label>
          <input
            type="text"
            name="username"
            value={username}
            placeholder="Enter your username"
            onChange={handleOnChange}
          />
        </div>
      
        <div>
          <label htmlFor="image">Profile Photo</label>
          <input
            type="file"
            name="image"
            onChange={onFileSelect}
          />
        </div>
        
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            placeholder="Enter your password"
            onChange={handleOnChange}
          />
        </div>
        
        <button type="submit">Submit</button>
        <span>
          Already have an account? <Link to={"/login"}>Login</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
};

