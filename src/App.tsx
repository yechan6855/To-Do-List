import React, { useReducer, useState } from 'react';
import './App.css';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

type ActionType =
  | { type: 'ADD_TODO'; text: string }
  | { type: 'REMOVE_TODO'; id: number }
  | { type: 'TOGGLE_TODO'; id: number };

const todoReducer = (state: Todo[], action: ActionType): Todo[] => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state, 
        { id: Date.now(), text: action.text, completed: false}
      ];
    case 'REMOVE_TODO':
      return state.filter(todo => todo.id !== action.id);
    case 'TOGGLE_TODO':
      return state.map(todo =>
        todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
      );
    default:
      return state;
  }
};

const App: React.FC = () => {
  const [todos, dispatch] = useReducer(todoReducer, []);
  const [text, setText] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [showDateInput, setShowDateInput] = useState(false);

  const handleAddTodo = () => {
    if (text.trim()) {
      dispatch({ type: 'ADD_TODO', text });
      setText('');
      setDueDate('');
      setShowDateInput(false);
    }
  };

  const handleRemoveTodo = (id: number) => {
    dispatch({ type: 'REMOVE_TODO', id });
  };

  const handleToggleTodo = (id: number) => {
    dispatch({ type: 'TOGGLE_TODO', id });
  };

  return (
    <div className="App">
      <h1>Todo List</h1>
      <input type="text" value={text} onChange={e => setText(e.target.value)} placeholder="할 일 입력" />
      <input type="date"/>
      <button onClick={handleAddTodo}>할 일 추가</button>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <input 
              type="checkbox" 
              checked={todo.completed} 
              onChange={() => handleToggleTodo(todo.id)} />
            {todo.text} 
            <button onClick={() => handleRemoveTodo(todo.id)}>삭제</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;