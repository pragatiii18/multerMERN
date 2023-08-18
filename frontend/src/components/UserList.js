// UserList.js
import React, { useState, useEffect } from "react";
import axios from "axios";

export const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:7000/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  return (
    <div>
      <h2>User List</h2>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            {console.log(user.image)}
            Username: {user.username} <br /> Email: {user.email}
            <img
              src={`http://localhost:7000/images/${user.image}`}
              alt={`${user.username}'s profile`}
              height={100}
              width={100}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
