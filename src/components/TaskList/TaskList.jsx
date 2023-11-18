import React from 'react';

import Task from '../Task/Task';
import './TaskList.css';

function TaskList({ todoList, onDeleted, onComplited, onEdit, onEditTask }) {
  return (
    <ul className="todo-list">
      {todoList.map((elem) => {
        return (
          <Task
            key={elem.id}
            propText={elem.text}
            complited={elem.complited}
            id={elem.id}
            createdAt={elem.createdAt}
            editing={elem.editing}
            onDeleted={onDeleted}
            onComplited={onComplited}
            onEdit={onEdit}
            onEditTask={onEditTask}
          />
        );
      })}
    </ul>
  );
}

export default TaskList;
