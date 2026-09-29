import { useState } from "react";
import "./App.css";

const initialTasks = [
  { id: 1, title: "Learn useState", completed: true },
  { id: 2, title: "Practice array methods", completed: false },
  { id: 3, title: "Build a React project", completed: false },
];

export default function App() {
  const [tasks, setTasks] = useState(initialTasks);
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("all");

  function handleAddTask(e) {
    e.preventDefault();

    if (!input.trim()) {
      return;
    }

    const newTask = {
      id: Date.now(),
      title: input.trim(),
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setInput("");
  }

  function handleDelete(taskId) {
    setTasks(tasks.filter((task) => task.id !== taskId));
  }

  function handleToggle(taskId) {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task,
      ),
    );
  }

  function handleClearCompleted() {
    setTasks(tasks.filter((task) => !task.completed));
  }

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") {
      return !task.completed;
    }

    if (filter === "completed") {
      return task.completed;
    }

    return true;
  });

  const remainingTasks = tasks.filter((task) => !task.completed).length;

  return (
    <main className="page">
      <section className="todo-container">
        <header>
          <span className="eyebrow">REACT PRACTICE</span>

          <h1>TaskFlow</h1>

          <p>Organize your everyday tasks.</p>
        </header>

        <form className="task-form" onSubmit={handleAddTask}>
          <input
            type="text"
            placeholder="What needs to be done?"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <button type="submit">Add Task</button>
        </form>

        <div className="filters">
          <button
            type="button"
            className={filter === "all" ? "active" : ""}
            onClick={() => setFilter("all")}
          >
            All
          </button>

          <button
            type="button"
            className={filter === "active" ? "active" : ""}
            onClick={() => setFilter("active")}
          >
            Active
          </button>

          <button
            type="button"
            className={filter === "completed" ? "active" : ""}
            onClick={() => setFilter("completed")}
          >
            Completed
          </button>
        </div>

        <div className="task-header">
          <span>{remainingTasks} tasks remaining</span>

          <button type="button" onClick={handleClearCompleted}>
            Clear completed
          </button>
        </div>

        <div className="task-list">
          {filteredTasks.length === 0 ? (
            <div className="empty">
              <h3>No tasks found</h3>
              <p>Try adding a new task.</p>
            </div>
          ) : (
            filteredTasks.map((task) => (
              <article
                className={`task ${task.completed ? "completed" : ""}`}
                key={task.id}
              >
                <button
                  type="button"
                  className="check"
                  onClick={() => handleToggle(task.id)}
                >
                  {task.completed ? "✓" : ""}
                </button>

                <span>{task.title}</span>

                <button
                  type="button"
                  className="delete"
                  onClick={() => handleDelete(task.id)}
                >
                  Delete
                </button>
              </article>
            ))
          )}
        </div>
      </section>
    </main>
  );
}
