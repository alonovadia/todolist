import React, { useState } from 'react';
import './App.css';

interface TodoItem {
    text: string;
    completed: boolean;
    date: string;
    dueDate: Date | null;
}

function App() {
    const [todoList, setTodoList] = useState<TodoItem[]>([]);
    const [todo, setTodo] = useState<string>('');
    const [dueDate, setDueDate] = useState<string>('');
    const [filterCompleted, setFilterCompleted] = useState<boolean>(false);

    const handleAddTodo = () => {
        if (todo.trim() !== '') {
            const parsedDueDate = dueDate ? new Date(dueDate) : null;
            setTodoList([...todoList, { text: todo, completed: false, date: new Date().toLocaleString(), dueDate: parsedDueDate }]);
            setTodo('');
            setDueDate('');
        }
    }

    const toggleCompletion = (index: number) => {
        const updatedTodos = [...todoList];
        updatedTodos[index].completed = !updatedTodos[index].completed;
        setTodoList(updatedTodos);
    }

    const deleteTodo = (index: number) => {
        const updatedTodos = [...todoList];
        updatedTodos.splice(index, 1);
        setTodoList(updatedTodos);
    }

    const clearCompleted = () => {
        setTodoList(todoList.filter(todo => !todo.completed));
    }

    const handleFilterToggle = () => {
        setFilterCompleted(!filterCompleted);
    }

    return (
        <div className="App">
            <div className="header">
                <h1>Todo List</h1>
            </div>
            <div className="input-container">
                <input
                    className="todo-input"
                    placeholder="Enter something to do..."
                    value={todo}
                    onChange={(e) => setTodo(e.target.value)}
                />
                <button className="add-button" onClick={handleAddTodo}>
                    +
                </button>
            </div>
            <div className="input-container">
                <input
                    type="datetime-local"
                    className="due-date-input"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    required
                />
                <p className="due-date-label">Due Date</p>
            </div>
            <div className="filter-container">
                <button className="filter-button" onClick={clearCompleted}>
                    Clear Completed
                </button>
                <button className="filter-button" onClick={handleFilterToggle}>
                    {filterCompleted ? 'Show All' : 'Show Active'}
                </button>
            </div>
            <div className="todo-list">
                {todoList
                    .filter(todo => !filterCompleted || (filterCompleted && !todo.completed))
                    .map((todo, index) => (
                        <div
                            key={index}
                            className={`todo-card ${todo.completed ? 'completed' : ''}`}
                            onClick={() => toggleCompletion(index)}
                        >
                            <p className="todo-date">{todo.date}</p>
                            <h3 className="todo-text">{todo.text}</h3>
                            {todo.dueDate && (
                                <p className="todo-due-date">Due: {todo.dueDate.toLocaleString()}</p>
                            )}
                            <div className="button-container">
                                <button className="complete-button">
                                    {todo.completed ? 'Undo' : 'Complete'}
                                </button>
                                <button className="delete-button" onClick={() => deleteTodo(index)}>
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
}

export default App;
