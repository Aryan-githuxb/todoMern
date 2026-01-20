import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import TodoCard from "../components/TodoCard";

export default function DashboardPage({ token, setToken, darkMode, setDarkMode }) {
  const [lists, setLists] = useState([]);
  const [newListTitle, setNewListTitle] = useState("");
  const [isChecklist, setIsChecklist] = useState(true);
  const username = localStorage.getItem("username");
  const headers = { Authorization: token };

  useEffect(() => { fetchLists(); }, []);

  const fetchLists = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/lists", { headers });
      setLists(data);
    } catch (err) { if (err.response?.status === 403) logout(); }
  };

  const createList = async () => {
    if (!newListTitle.trim()) return;
    await axios.post("http://localhost:5000/lists", { title: newListTitle, type: isChecklist ? "checklist" : "simple" }, { headers });
    setNewListTitle("");
    fetchLists();
  };

  const deleteList = async (id) => {
    await axios.delete(`http://localhost:5000/lists/${id}`, { headers });
    fetchLists();
  };

  const addItem = async (listId, listItems, text) => {
    const newItems = [...listItems, { text, completed: false }];
    await axios.put(`http://localhost:5000/lists/${listId}`, { items: newItems }, { headers });
    fetchLists();
  };

  const toggleItem = async (listId, listItems, itemIndex) => {
    const newItems = [...listItems];
    newItems[itemIndex].completed = !newItems[itemIndex].completed;
    await axios.put(`http://localhost:5000/lists/${listId}`, { items: newItems }, { headers });
    fetchLists();
  };

  const logout = () => {
    localStorage.clear();
    setToken(null);
  };

  return (
    <div>
      <Navbar username={username} darkMode={darkMode} setDarkMode={setDarkMode} onLogout={logout} />
      <div className="main-content">
        <div className="create-section">
          <input type="text" placeholder="Add a new list title..." value={newListTitle} onChange={(e) => setNewListTitle(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && createList()} />
          <div className="checkbox-option">
            <input type="checkbox" id="mode-check" checked={isChecklist} onChange={(e) => setIsChecklist(e.target.checked)} />
            <label htmlFor="mode-check">Checklist</label>
          </div>
          <button className="yellow-btn" style={{ width: "100px", marginTop: 0 }} onClick={createList}>Add</button>
        </div>

        <div className="grid">
          {lists.map(list => (
            <TodoCard key={list._id} list={list} onDelete={deleteList} onAddItem={addItem} onToggleItem={toggleItem} />
          ))}
        </div>
      </div>
    </div>
  );
}