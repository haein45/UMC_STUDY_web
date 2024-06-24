import React from 'react';
import InputTodo from './components/InputTodo';
import TodoList from './components/TodoList';  // Make sure to import .jsx

function App() {
  return (
    <div className="App">
      <h1>Todo List</h1>
      <InputTodo />
      <TodoList />
    </div>
  );
}

export default App;
