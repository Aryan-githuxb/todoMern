import { useState } from "react";
import axios from "axios";
import Logo from "../components/Logo";

export default function AuthPage({ setToken, darkMode, setDarkMode }) {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState(""); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState({ text: "", type: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ text: "", type: "" });

    try {
      if (isLogin) {
        const { data } = await axios.post("http://localhost:5000/auth/login", { email, password });
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", data.username);
        setToken(data.token);
      } else {
        await axios.post("http://localhost:5000/auth/signup", { username, email, password });
        setIsLogin(true);
        setUsername(""); setEmail(""); setPassword("");
        setMessage({ text: "Account created! Please login.", type: "success" });
      }
    } catch (err) {
      setMessage({ text: err.response?.data?.error || "Connection error", type: "error" });
    }
  };

  return (
    <div className="auth-container">
      <div style={{ position: "absolute", top: "20px", right: "40px" }}>
        <button className="toggle-btn" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? " Light" : " Dark"}
        </button>
      </div>
      <form className="auth-box" onSubmit={handleSubmit}>
        <Logo />
        <p style={{ margin: "10px 0 25px 0", color: "#666" }}>{isLogin ? "Sign in to MellowTodo" : "Create your account"}</p>
        {message.text && (
          <p style={{ color: message.type === "error" ? "#d32f2f" : "#16a34a", fontSize: "0.85rem", padding: "10px", borderRadius: "10px", backgroundColor: message.type === "error" ? "#ffefef" : "#f0fdf4" }}>
            {message.text}
          </p>
        )}
        {!isLogin && <input type="text" placeholder="Full Name" value={username} onChange={e => setUsername(e.target.value)} required />}
        <div style={{ height: "15px" }}></div>
        <input type="text" placeholder="Email Address" value={email} onChange={e => setEmail(e.target.value)} required />
        <div style={{ height: "15px" }}></div>
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
        <button className="yellow-btn">{isLogin ? "Login" : "Sign Up"}</button>
        <p style={{ marginTop: "20px", fontSize: "0.9rem", cursor: "pointer", color: "#EAB308" }} onClick={() => { setIsLogin(!isLogin); setMessage({ text: "", type: "" }); }}>
          {isLogin ? "Need an account? Sign up" : "Already have an account? Login"}
        </p>
      </form>
    </div>
  );
}