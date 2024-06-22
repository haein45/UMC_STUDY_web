import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [todos, setTodos] = useState([
    { id: 1, content: "Send E-mail", isDone: false },
    { id: 2, content: "Make Work-Books", isDone: false },
    { id: 3, content: "Sleeping", isDone: true },
    { id: 4, content: "Watching You-Tube", isDone: true },
  ]);

  const addTask = (task) => {
    setTodos([...todos, { id: todos.length + 1, content: task, isDone: false }]);
  };

  const completeTask = (id) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, isDone: true } : todo));
  };

  const deleteTask = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="App">
      <h1>UMC Study Plan</h1>
      <hr/>
      <TaskInput addTask={addTask} />
      <div className="tasks">
        <TaskList title="해야 할 일" tasks={todos.filter(todo => !todo.isDone)} completeTask={completeTask} />
        <TaskList title="해낸 일" tasks={todos.filter(todo => todo.isDone)} deleteTask={deleteTask} />
      </div>
    </div>
  );
};

const TaskInput = ({ addTask }) => {
  const [input, setInput] = useState('');

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      addTask(input);
      setInput('');
    }
  };

  return (
    <input 
      type="text" 
      value={input} 
      placeholder="스터디 계획을 작성해보세요!" 
      onChange={(e) => setInput(e.target.value)} 
      onKeyPress={handleKeyPress} 
    />
  );
};

const TaskList = ({ title, tasks, completeTask, deleteTask }) => (
  <div>
    <h2>{title}</h2>
    <ul>
      {tasks.map(task => (
        <li key={task.id}>
          {task.content} 
          {!task.isDone && <button onClick={() => completeTask(task.id)}>완료</button>}
          {task.isDone && <button onClick={() => deleteTask(task.id)}>삭제</button>}
        </li>
      ))}
    </ul>
  </div>
);

export default App;
