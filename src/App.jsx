import React, { useState } from "react";

function App() {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([
    {
      id: "57e88809-a7fe-4b50-b4c5-eb8c0baad8b0",
      text: "fvcxz",
      completed: false,
    },
    {
      id: "5faa0c07-be58-42c9-aab1-a5776d2dcd85",
      text: "jkhgfdcsxz",
      completed: false,
    },
  ]);
  const [editingId, setEditingId] = useState(null);
  const [editInput, setEditInput] = useState("");

  const addTodo = () => {
    if (!input.trim()) return;
    setTodos([
      ...todos,
      { id: crypto.randomUUID(), text: input, completed: false },
    ]);
    setInput("");
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const startEdit = (id, text) => {
    setEditingId(id);
    setEditInput(text);
  };

  const saveEdit = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, text: editInput } : todo
      )
    );
    setEditingId(null);
    setEditInput("");
  };

  const filterFun = () => {
    setTodos([...todos].sort((a, b) => a.text.localeCompare(b.text)));
  };

  const completedCount = todos.filter((todo) => todo.completed).length;
  const uncompletedCount = todos.length - completedCount;

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>To Do List</h1>
      <div style={styles.inputArea}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a task"
          style={styles.input}
        />
        <button onClick={addTodo} style={styles.addButton}>
          Add
        </button>
      </div>
      <button onClick={filterFun}>Filter</button>
      <h2 style={styles.taskListTitle}>Task List</h2>
      <ul style={styles.list}>
        {todos.map((todo) => (
          <li key={todo.id} style={styles.listItem}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleComplete(todo.id)}
            />
            {editingId === todo.id ? (
              <>
                <input
                  value={editInput}
                  onChange={(e) => setEditInput(e.target.value)}
                  style={styles.editInput}
                />
                <button
                  onClick={() => saveEdit(todo.id)}
                  style={styles.saveButton}
                >
                  Save
                </button>
              </>
            ) : (
              <span
                style={{
                  ...styles.taskText,
                  textDecoration: todo.completed ? "line-through" : "none",
                  color: todo.completed ? "gray" : "black",
                }}
              >
                {todo.text}
              </span>
            )}
            <button
              onClick={() => deleteTodo(todo.id)}
              style={styles.deleteButton}
            >
              Delete
            </button>
            {editingId !== todo.id && (
              <button
                onClick={() => startEdit(todo.id, todo.text)}
                style={styles.editButton}
              >
                Edit
              </button>
            )}
          </li>
        ))}
      </ul>
      <div style={styles.footer}>
        Completed: {completedCount} | Uncompleted: {uncompletedCount}
      </div>
    </div>
  );
}
const styles = {
  container: {
    backgroundColor: "#f5f5f5",
    color: "#333",
    padding: 20,
    borderRadius: 10,
    width: 450,
    margin: "40px auto",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  },
  title: {
    textAlign: "center",
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  inputArea: {
    display: "flex",
    justifyContent: "center",
    gap: 10,
    marginBottom: 20,
  },
  input: {
    padding: 10,
    fontSize: 16,
    flex: 1,
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
  addButton: {
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "10px 16px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  taskListTitle: {
    textAlign: "center",
    marginBottom: 10,
    fontSize: "20px",
  },
  list: {
    listStyle: "none",
    padding: 0,
  },
  listItem: {
    backgroundColor: "#ffffff",
    marginBottom: 10,
    padding: 10,
    display: "flex",
    alignItems: "center",
    gap: 10,
    borderRadius: "5px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  editInput: {
    padding: 8,

    fontSize: 16,
    flex: 1,
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
  saveButton: {
    backgroundColor: "#2196F3",
    color: "white",
    border: "none",
    padding: "8px 12px",
    borderRadius: "5px",
    cursor: "pointer",
  },
  deleteButton: {
    backgroundColor: "#f44336",
    color: "white",
    border: "none",
    padding: "8px 12px",
    borderRadius: "5px",
    cursor: "pointer",
  },
  editButton: {
    backgroundColor: "#FF9800",
    color: "white",
    border: "none",
    padding: "8px 12px",
    borderRadius: "5px",
    cursor: "pointer",
  },
  footer: {
    marginTop: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
};

export default App;
