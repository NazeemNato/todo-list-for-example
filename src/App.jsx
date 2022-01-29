import React, { useState, useEffect } from "react";

export default function App() {
  const [data, setData] = useState([]);

  const [text, setText] = useState("");
  // without -> [] -> every seconds state update
  // with -> [] -> initial state or first time state update
  // with -> [text] -> every time state update when text changes
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("todo")) || [];
    setData(data);
  },[]);

  const addTodo = (e) => {
    e.preventDefault();
    let todo = {
      id: Date.now(),
      text,
    };
    localStorage.setItem("todo", JSON.stringify([...data, todo]));
    setData([...data, todo]);
    setText("");
  };

  const removeTodo = (id) => {
    const newData = data.filter((todo) => todo.id !== id);
    localStorage.setItem("todo", JSON.stringify(newData));
    setData(newData);
  };

  return (
    <div>
      <h1>Todo List</h1>
      <form onSubmit={addTodo}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button>Add</button>
      </form>
      <ul>
        {data.map((item) => (
          <li key={item.id}>
            {item.text}
            <button onClick={() => removeTodo(item.id)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
