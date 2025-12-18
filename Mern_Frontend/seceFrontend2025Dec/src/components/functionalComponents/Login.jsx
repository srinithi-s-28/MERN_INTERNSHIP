import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8001/login", formData);
      setMessage("Login successful!");
      console.log(response.data);
    } catch (error) {
      setMessage(error.response?.data?.Message || "Login failed");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {message && <p style={{color: message.includes('successful') ? 'green' : 'red'}}>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label><br />
          <input 
            type="email" 
            name="email" 
            value={formData.email}
            onChange={handleChange}
            required 
          />
        </div>

        <br />

        <div>
          <label>Password</label><br />
          <input 
            type="password" 
            name="password"
            value={formData.password}
            onChange={handleChange}
            required 
          />
        </div>

        <br />

        <button type="submit">Login</button>
      </form>

      <br />

      <p>
        Don't have an account?
        <Link to="/signup"> Sign up</Link>
      </p>
    </div>
  );
}

export default Login;