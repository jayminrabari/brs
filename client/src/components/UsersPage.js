import React, { useEffect, useState } from "react";
import usersApi from "../api/users"; 

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError("");

      try {
        const data = await usersApi.fetchUsers(); 
        setUsers(data);
      } catch (err) {
        console.error("Error fetching users:", err);
        setError("Failed to load users. Please try again.");
      }

      setLoading(false);
    };
    
    fetchUsers();
  }, []);

  return (
    <div>
      <h1>Users</h1>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}


      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user, index) => (
              <tr key={user._id}>
                <th scope="row">{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No users found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UsersPage;
