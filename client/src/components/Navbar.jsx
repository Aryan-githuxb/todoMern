import Logo from "./Logo";

export default function Navbar({ username, darkMode, setDarkMode, onLogout }) {
  return (
    <nav className="nav-bar">
      <Logo />
      <div className="nav-right">
        <button className="toggle-btn" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? " Light" : " Dark"}
        </button>
        <span className="user-info">Hi, {username}</span>
        <button className="logout-btn" onClick={onLogout}>Logout</button>
      </div>
    </nav>
  );
}