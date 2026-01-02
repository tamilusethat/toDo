import { useEffect, useState } from "react";
import API from "./services/api";

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");

  const fetchTodos = async () => {
    const res = await API.get("/todos");
    setTodos(res.data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async () => {
    if (!title) return;
    await API.post("/todos", { title });
    setTitle("");
    fetchTodos();
  };

  const toggleTodo = async (todo) => {
    await API.put(`/todos/${todo._id}`, {
      completed: !todo.completed,
    });
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await API.delete(`/todos/${id}`);
    fetchTodos();
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">📝 MERN To-Do List</h2>

      <div className="input-group mb-3">
        <input
          className="form-control"
          placeholder="Enter task..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button className="btn btn-primary" onClick={addTodo}>
          Add
        </button>
      </div>

      <ul className="list-group">
        {todos.map((todo) => (
          <li
            key={todo._id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <span
              onClick={() => toggleTodo(todo)}
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
                cursor: "pointer",
              }}
            >
              {todo.title}
            </span>

            <button
              className="btn btn-danger btn-sm"
              onClick={() => deleteTodo(todo._id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
