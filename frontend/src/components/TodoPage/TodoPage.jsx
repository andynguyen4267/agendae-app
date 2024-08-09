import React, { useState, useEffect } from "react";
import TodoForm from "../TodoForm/TodoForm";
import VoiceSearch from "../VoiceSearch/VoiceSearch";
import './TodoPage.css';
import axios from 'axios';
import Logo from "../Logo/Logo";
import { useNavigate } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

function TodoPage() {
    const [tasks, setTasks] = useState([]);
    const navigate = useNavigate();

    const user = localStorage.getItem('userId');

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/todos/${user}`);
                console.log(response.data);
                if (Array.isArray(response.data)) {
                    setTasks(response.data);
                } else {
                    console.error("Fetched data is not an array:", response.data);
                }
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };

        if (user) {
            fetchTasks();
        } else {
            console.error("No user found.");
        }
    }, [user]);

    const addTask = async (newTask) => {
        try {
            const response = await axios.post('http://localhost:3001/todos', { userId: user, task: newTask });
            setTasks([...tasks, response.data]);
        } catch (error) {
            console.error("Error adding task:", error);
        }
    };

    const deleteTask = async (id) => {
        try {
            await axios.delete(`http://localhost:3001/todos/${id}`);
            setTasks(tasks.filter((task) => task._id !== id));
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    const completeTask = async (id) => {
        try {
            const taskToComplete = tasks.find(task => task._id === id);
            const updatedTask = { ...taskToComplete, completed: !taskToComplete.completed };
            const response = await axios.put(`http://localhost:3001/todos/${id}`, updatedTask);
            setTasks(tasks.map((task) => (task._id === id ? response.data : task)));
        } catch (error) {
            console.error("Error updating task:", error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('userId');
        navigate('/login');
    };

    const handleOnDragEnd = (result) => {
        if (!result.destination) return;

        const reorderedTasks = Array.from(tasks);
        const [movedTask] = reorderedTasks.splice(result.source.index, 1);
        reorderedTasks.splice(result.destination.index, 0, movedTask);

        setTasks(reorderedTasks);
    };

    return (
        <div className="container">
            <div onClick={() => navigate('/')} className='logo-container position-absolute top-0 start-0 p-3'>
                <Logo />
            </div>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
            <div className="box">
                <VoiceSearch addTask={addTask} />
                <TodoForm addTask={addTask} deleteTask={deleteTask} />
                <DragDropContext onDragEnd={handleOnDragEnd}>
                    <Droppable droppableId="tasks">
                        {(provided) => (
                            <ul className="task-list" {...provided.droppableProps} ref={provided.innerRef}>
                                {tasks.map((task, index) => (
                                    <Draggable key={task._id} draggableId={task._id} index={index}>
                                        {(provided) => (
                                            <li
                                                className="task-item"
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                            >
                                                <span className={`task-text ${task.completed ? 'completed' : ''}`}>
                                                    {task.task}
                                                </span>
                                                <div className="task-buttons">
                                                    <button
                                                        className="complete-btn"
                                                        onClick={() => completeTask(task._id)}
                                                    >
                                                        {task.completed ? 'Undo' : 'Complete'}
                                                    </button>
                                                    <button
                                                        className="delete-btn"
                                                        onClick={() => deleteTask(task._id)}
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </li>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </ul>
                        )}
                    </Droppable>
                </DragDropContext>
            </div>
        </div>
    );
}

export default TodoPage;
