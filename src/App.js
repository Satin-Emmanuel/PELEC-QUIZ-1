import { useEffect, useState } from "react";
import "./App.css";

function App() {

  // State for users
  const [users, setUsers] = useState([]);

  // Loading state
  const [loading, setLoading] = useState(true);

  // Error state
  const [error, setError] = useState(false);

  // Fetch users
  useEffect(() => {

    async function fetchUsers() {

      try {

        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch");
        }

        const data = await response.json();

        // Get first 5 users
        setUsers(data.slice(0, 5));

      } catch (error) {

        setError(true);

      } finally {

        setLoading(false);

      }
    }

    fetchUsers();

  }, []);

  // Loading message
  if (loading) {
    return <h2>Loading users...</h2>;
  }

  // Error message
  if (error) {
    return <h2>Failed to fetch users.</h2>;
  }

  return (
    <div className="container">

      <h1>User List</h1>

      {users.map((user) => (
        <div key={user.id} className="card">

          <h2>{user.name}</h2>

          <p>
            <strong>Email:</strong> {user.email}
          </p>

          <p>
            <strong>Company:</strong> {user.company.name}
          </p>

        </div>
      ))}

    </div>
  );
}

export default App;