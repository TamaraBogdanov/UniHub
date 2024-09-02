import React, { createContext, useState, useContext } from "react";

const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([
    { id: 1, title: "Submit Math Assignment", completed: false },
    { id: 2, title: "Read Chapter 5 for Physics", completed: false },
    { id: 3, title: "Prepare for CS presentation", completed: false },
  ]);

  const addTodo = (title) => {
    setTodos([...todos, { id: Date.now(), title, completed: false }]);
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <TodoContext.Provider value={{ todos, addTodo, toggleTodo, deleteTodo }}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodo = () => useContext(TodoContext);

export default TodoContext;
