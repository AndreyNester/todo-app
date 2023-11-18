import React from 'react';

import './TaskFilter.css';

export default class TaskFilter extends React.Component {
  state = {
    buttons: {
      all: true,
      active: false,
      completed: false,
    },
  };

  onSwitchButton = (key) => {
    const { onFilter } = this.props;

    switch (key) {
      case 'All':
        onFilter(key);
        this.setState(() => {
          return {
            buttons: {
              all: true,
              active: false,
              completed: false,
            },
          };
        });
        break;

      case 'Active':
        onFilter(key);
        this.setState(() => {
          return {
            buttons: {
              all: false,
              active: true,
              completed: false,
            },
          };
        });
        break;

      case 'Completed':
        onFilter(key);
        this.setState(() => {
          return {
            buttons: {
              all: false,
              active: false,
              completed: true,
            },
          };
        });
        break;

      default:
        break;
    }
  };

  render() {
    const { buttons } = this.state;

    return (
      <ul className="filters">
        <li>
          <button
            type="button"
            className={buttons.all ? 'selected' : ''}
            onClick={() => {
              this.onSwitchButton('All');
            }}
          >
            All
          </button>
        </li>
        <li>
          <button
            type="button"
            className={buttons.active ? 'selected' : ''}
            onClick={() => {
              this.onSwitchButton('Active');
            }}
          >
            Active
          </button>
        </li>
        <li>
          <button
            type="button"
            className={buttons.completed ? 'selected' : ''}
            onClick={() => {
              this.onSwitchButton('Completed');
            }}
          >
            Completed
          </button>
        </li>
      </ul>
    );
  }
}
