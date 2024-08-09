import React, { useState } from "react";
import TodoItem from "../TodoItem/TodoItem";

function TodoList({ tasks, deleteTask, completeTask }) {
  return (
    <ul>
      {tasks.map((task) => (
        <TodoItem
          key={task.id}
          task={task}
          deleteTask={deleteTask}
          completeTask={completeTask}
        />
      ))}
    </ul>
  );
};

export default TodoList;