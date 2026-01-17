export default function TodoCard({ list, onDelete, onAddItem, onToggleItem }) {
  return (
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h3>{list.title}</h3>
        <button onClick={() => onDelete(list._id)} style={{ color: '#d32f2f', background: 'none', cursor: 'pointer' }}>✕</button>
      </div>

      {list.items.map((item, idx) => (
        <div key={idx} className="list-item">
          {list.type === "checklist" && (
            <input 
              type="checkbox" 
              checked={item.completed} 
              onChange={() => onToggleItem(list._id, list.items, idx)} 
            />
          )}
          <span className={item.completed ? "strikethrough" : ""}>{item.text}</span>
        </div>
      ))}

      <input 
        className="add-item-input" 
        placeholder="+ Add task" 
        onKeyDown={(e) => {
          if (e.key === 'Enter' && e.target.value) {
            onAddItem(list._id, list.items, e.target.value);
            e.target.value = "";
          }
        }} 
      />
    </div>
  );
}