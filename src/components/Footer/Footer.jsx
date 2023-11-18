import React from 'react';

import TaskFilter from '../TasksFilter/TaskFilter';
import './Footer.css';

function Footer({ itemsCount, onFilter, onClearComplete }) {
  return (
    <footer className="footer">
      <span className="todo-count">{itemsCount} items left </span>
      <TaskFilter onFilter={onFilter} />
      <button
        type="button"
        onClick={() => {
          onClearComplete();
        }}
        className="clear-completed"
      >
        Clear completed
      </button>
    </footer>
  );
}

export default Footer;
