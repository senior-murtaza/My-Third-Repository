import { useState } from "react";
import "./App.css";

function App() {
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState([]);

  function handleAdd() {
    if (note.trim() === "") return;

    setNotes([...notes, note]);
    setNote("");
  }

  function handleDelete(index) {
    setNotes(notes.filter((_, i) => i !== index));
  }

  return (
    <div className="app">
      <h1>Mini Notes</h1>

      <div className="input-box">
        <input
          type="text"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Write a note"
        />

        <button onClick={handleAdd}>Add</button>
      </div>

      <div>
        {notes.map((note, index) => (
          <div className="note" key={index}>
            <p>{note}</p>
            <button onClick={() => handleDelete(index)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;