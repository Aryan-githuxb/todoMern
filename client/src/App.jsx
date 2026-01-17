import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import DashboardPage from "./pages/DashboardPage";

export default function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [darkMode, setDarkMode] = useState(localStorage.getItem("theme") === "dark");

  useEffect(() => {
    document.body.className = darkMode ? "dark-mode" : "";
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/" 
          element={!token ? 
            <AuthPage setToken={setToken} darkMode={darkMode} setDarkMode={setDarkMode} /> : 
            <Navigate to="/dashboard" />
          } 
        />
        <Route 
          path="/dashboard" 
          element={token ? 
            <DashboardPage token={token} setToken={setToken} darkMode={darkMode} setDarkMode={setDarkMode} /> : 
            <Navigate to="/" />
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}











































































































// import { useState, useEffect } from "react";
// import axios from "axios";
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// // Axios Configuration
// axios.defaults.baseURL = "http://localhost:5000";

// // Logo Component
// const Logo = () => (
//   <div className="logo-text">
//     Mellow<span>Todo</span>
//   </div>
// );

// function App() {
//   const [token, setToken] = useState(localStorage.getItem("token"));
//   const [darkMode, setDarkMode] = useState(localStorage.getItem("theme") === "dark");

//   useEffect(() => {
//     document.body.className = darkMode ? "dark-mode" : "";
//     localStorage.setItem("theme", darkMode ? "dark" : "light");
//   }, [darkMode]);

//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route 
//           path="/" 
//           element={!token ? 
//             <Auth setToken={setToken} darkMode={darkMode} setDarkMode={setDarkMode} /> : 
//             <Navigate to="/dashboard" />
//           } 
//         />
//         <Route 
//           path="/dashboard" 
//           element={
//             token ? (
//               <Dashboard 
//                 token={token} 
//                 setToken={setToken} 
//                 darkMode={darkMode} 
//                 setDarkMode={setDarkMode} 
//               />
//             ) : (
//               <Navigate to="/" />
//             )
//           } 
//         />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// // --- AUTH COMPONENT ---
// function Auth({ setToken, darkMode, setDarkMode }) {
//   const [isLogin, setIsLogin] = useState(true);
//   const [username, setUsername] = useState(""); 
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [message, setMessage] = useState({ text: "", type: "" });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage({ text: "", type: "" });

//     try {
//       if (isLogin) {
//         const { data } = await axios.post("/auth/login", { email, password });
//         localStorage.setItem("token", data.token);
//         localStorage.setItem("username", data.username);
//         setToken(data.token);
//       } else {
//         await axios.post("/auth/signup", { username, email, password });
//         setIsLogin(true);
//         setUsername("");
//         setEmail("");
//         setPassword("");
//         setMessage({ text: "Success! Now login with your email.", type: "success" });
//       }
//     } catch (err) {
//       setMessage({ text: err.response?.data?.error || "Invalid Credentials", type: "error" });
//     }
//   };

//   return (
//     <div className="auth-container">
//       {/* Dark Mode Toggle for Auth Page */}
//       <div style={{ position: "absolute", top: "20px", right: "40px" }}>
//         <button className="toggle-btn" onClick={() => setDarkMode(!darkMode)}>
//           {darkMode ? "☀️ Light" : "🌙 Dark"}
//         </button>
//       </div>

//       <form className="auth-box" onSubmit={handleSubmit}>
//         <Logo />
//         <p style={{ margin: "10px 0 25px 0", color: "#666" }}>
//           {isLogin ? "Sign in to MellowTodo" : "Create your account"}
//         </p>
        
//         {message.text && (
//           <p style={{ 
//             color: message.type === "error" ? "#d32f2f" : "#16a34a", 
//             fontSize: "0.85rem", padding: "10px", borderRadius: "10px",
//             backgroundColor: message.type === "error" ? "#ffefef" : "#f0fdf4"
//           }}>
//             {message.text}
//           </p>
//         )}
        
//         {!isLogin && (
//           <input type="text" placeholder="Full Name" value={username} onChange={e => setUsername(e.target.value)} required />
//         )}
//         <div style={{ height: "15px" }}></div>
//         <input type="text" placeholder="Email Address" value={email} onChange={e => setEmail(e.target.value)} required />
//         <div style={{ height: "15px" }}></div>
//         <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
        
//         <button className="yellow-btn">{isLogin ? "Login" : "Sign Up"}</button>
        
//         <p style={{ marginTop: "20px", fontSize: "0.9rem", cursor: "pointer", color: "#EAB308" }} 
//            onClick={() => { setIsLogin(!isLogin); setMessage({ text: "", type: "" }); }}>
//           {isLogin ? "Need an account? Sign up" : "Already have an account? Login"}
//         </p>
//       </form>
//     </div>
//   );
// }

// // --- DASHBOARD COMPONENT ---
// function Dashboard({ token, setToken, darkMode, setDarkMode }) {
//   const [lists, setLists] = useState([]);
//   const [newListTitle, setNewListTitle] = useState("");
//   const [isChecklist, setIsChecklist] = useState(true);
//   const username = localStorage.getItem("username");
//   const headers = { Authorization: token };

//   useEffect(() => { fetchLists(); }, []);

//   const fetchLists = async () => {
//     try {
//       const { data } = await axios.get("/lists", { headers });
//       setLists(data);
//     } catch (err) { if (err.response?.status === 403) logout(); }
//   };

//   const createList = async () => {
//     if (!newListTitle.trim()) return;
//     await axios.post("/lists", { title: newListTitle, type: isChecklist ? "checklist" : "simple" }, { headers });
//     setNewListTitle("");
//     fetchLists();
//   };

//   const deleteList = async (id) => {
//     await axios.delete(`/lists/${id}`, { headers });
//     fetchLists();
//   };

//   const addItem = async (listId, listItems, text) => {
//     const newItems = [...listItems, { text, completed: false }];
//     await axios.put(`/lists/${listId}`, { items: newItems }, { headers });
//     fetchLists();
//   };

//   const toggleItem = async (listId, listItems, itemIndex) => {
//     const newItems = [...listItems];
//     newItems[itemIndex].completed = !newItems[itemIndex].completed;
//     await axios.put(`/lists/${listId}`, { items: newItems }, { headers });
//     fetchLists();
//   };

//   const logout = () => {
//     localStorage.clear();
//     setToken(null);
//   };

//   return (
//     <div>
//       <nav className="nav-bar">
//         <Logo />
//         <div className="nav-right">
//           <button className="toggle-btn" onClick={() => setDarkMode(!darkMode)}>
//             {darkMode ? "☀️ Light" : "🌙 Dark"}
//           </button>
//           <span className="user-info">Hi, {username}</span>
//           <button className="logout-btn" onClick={logout}>Logout</button>
//         </div>
//       </nav>

//       <div className="main-content">
//         <div className="create-section">
//           <input type="text" placeholder="Add a new list title..." value={newListTitle} onChange={(e) => setNewListTitle(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && createList()} />
//           <div className="checkbox-option">
//             <input type="checkbox" id="mode-check" checked={isChecklist} onChange={(e) => setIsChecklist(e.target.checked)} />
//             <label htmlFor="mode-check">Checklist</label>
//           </div>
//           <button className="yellow-btn" style={{ width: "100px", marginTop: 0 }} onClick={createList}>Add</button>
//         </div>

//         <div className="grid">
//           {lists.map(list => (
//             <div key={list._id} className="card">
//               <div style={{ display: 'flex', justifyContent: 'space-between' }}>
//                 <h3>{list.title}</h3>
//                 <button onClick={() => deleteList(list._id)} style={{ color: '#d32f2f', background: 'none', cursor: 'pointer' }}>✕</button>
//               </div>
//               {list.items.map((item, idx) => (
//                 <div key={idx} className="list-item">
//                   {list.type === "checklist" && <input type="checkbox" checked={item.completed} onChange={() => toggleItem(list._id, list.items, idx)} />}
//                   <span className={item.completed ? "strikethrough" : ""}>{item.text}</span>
//                 </div>
//               ))}
//               <input className="add-item-input" placeholder="+ Add task" onKeyDown={(e) => { if (e.key === 'Enter' && e.target.value) { addItem(list._id, list.items, e.target.value); e.target.value = ""; } }} />
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;