import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './style.css'

const TodoComponent = () => {
  const navigate = useNavigate();
  const [todos, setTodos] = useState([]);
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [newTodoDescription, setNewTodoDescription] = useState('');
  const [editTodo, setEditTodo] = useState({ id: '', title: '', description: '' });

  // Inside useEffect to fetch todos
useEffect(() => {
    const userId = localStorage.getItem('userId');
    const storedTodos = localStorage.getItem('todos');
  
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    } else {
      axios.get(`http://localhost:8000/auth/todo?userId=${userId}`)
        .then((response) => {
          setTodos(response.data);
          localStorage.setItem('todos', JSON.stringify(response.data)); 
        })
        .catch((error) => {
          console.error('Error fetching TODO items:', error);
        });
    }
  }, []);
  

  const addTodo = () => {
    const userId = localStorage.getItem('userId'); 
    console.log(userId, 'id');
    axios.post('http://localhost:8000/auth/todo', {
      userId: userId, 
      title: newTodoTitle,
      description: newTodoDescription
    })
    .then((response) => {
      setTodos([...todos, response.data]);
      setNewTodoTitle('');
      setNewTodoDescription('');
      localStorage.setItem('todos', JSON.stringify([...todos, response.data])); 
    })
    .catch((error) => {
      console.error('Error adding TODO item:', error);
    });
  };

  const editTodoItem = (id, title, description) => {
    axios.put(`http://localhost:8000/auth/todo/${id}`, { title, description })
      .then((response) => {
        const updatedTodos = todos.map((todo) => (todo._id === id ? response.data : todo));
        setTodos(updatedTodos);
        setEditTodo({ id: '', title: '', description: '' });
      })
      .catch((error) => {
        console.error('Error editing TODO item:', error);
      });
  };

  const deleteTodo = (id) => {
    axios.delete(`http://localhost:8000/auth/todo/${id}`)
      .then(() => {
        const updatedTodos = todos.filter((todo) => todo._id !== id);
        setTodos(updatedTodos);
      })
      .catch((error) => {
        console.error('Error deleting TODO item:', error);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="todo-container" style={{ marginTop: '200px' }}>
      <button className="btn" onClick={handleLogout}>
        Logout
      </button>
      <h2>Todo List</h2>
     
      <div className="add-todo">
        <input
          type="text"
          placeholder="Title"
          style={{ marginBottom: '10px' }}
          value={newTodoTitle}
          onChange={(e) => setNewTodoTitle(e.target.value)}
        />
        <br />
        <input
          type="text"
          placeholder="Description"
          value={newTodoDescription}
          onChange={(e) => setNewTodoDescription(e.target.value)}
        />
        <button className="add-btn" style={{marginBottom:"50px"}} onClick={addTodo}>Add</button>
      </div>
      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo._id} className="todo-item">
            {editTodo.id === todo._id ? (
              <div className="edit-todo">
                <input
                  type="text"
                  value={editTodo.title}
                  onChange={(e) => setEditTodo({ ...editTodo, title: e.target.value })}
                />
                <br />
                <input
                  type="text"
                  value={editTodo.description}
                  onChange={(e) => setEditTodo({ ...editTodo, description: e.target.value })}
                />
                <button className="save-btn" onClick={() => editTodoItem(editTodo.id, editTodo.title, editTodo.description)}>Save</button>
              </div>
            ) : (
              <div className="display-todo" >
                <p>{todo.title}</p>
                <p>{todo.description}</p>
                <div className="btn-group">
                  <button className="edit-btn" onClick={() => setEditTodo({ id: todo._id, title: todo.title, description: todo.description })}>Edit</button>
                  <button className="delete-btn" onClick={() => deleteTodo(todo._id)}>Delete</button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoComponent;
