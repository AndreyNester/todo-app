/* eslint-disable jsx-a11y/interactive-supports-focus */

/* eslint-disable jsx-a11y/click-events-have-key-events */
import { formatDistanceToNow } from 'date-fns';
import React from 'react';

import './Task.css';

export default class Task extends React.Component {
  static defaultProps = {
    updateInterval: 10000,
  };

  static propTypes = {
    updateInterval: (props, propName, componentName) => {
      const value = props[propName];
      if (typeof value === 'number') return null;
      return new TypeError(`${componentName}: ${propName} must be number!`);
    },
  };

  state = {
    // eslint-disable-next-line react/no-unused-state
    text: () => {
      const { propText } = this.props;
      return propText;
    },
    created: 'less than 5 seconds',
  };

  componentDidMount() {
    const { updateInterval, createdAt } = this.props;
    this.timerId = setInterval(() => {
      this.setState({
        created: formatDistanceToNow(new Date(createdAt), {
          includeSeconds: true,
        }),
      });
    }, updateInterval);
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  onTextChanged = (e) => {
    this.setState({
      // eslint-disable-next-line react/no-unused-state
      text: () => {
        return e.target.value;
      },
    });
  };

  onKeyUp = (e, id) => {
    const { onEditTask, text } = this.props;
    if (e.code === 'Enter') {
      onEditTask(id, e.target.value);
    }

    if (e.code === 'Escape') {
      onEditTask(id, text);
    }
  };

  render() {
    const { onDeleted, id, onComplited, complited, onEdit, editing } = this.props;
    const { text, created } = this.state;

    return (
      // eslint-disable-next-line no-nested-ternary
      <li className={editing ? 'editing' : complited ? 'completed' : null}>
        <form htmlFor={id} className="view">
          <input id={id} type="checkbox" className="toggle" onChange={() => onComplited(id)} checked={complited} />
          <label htmlFor={id}>
            <span
              id="1"
              // eslint-disable-next-line jsx-a11y/aria-role, jsx-a11y/role-has-required-aria-props
              role="custom checkbox"
              className="description"
              onClick={() => {
                onComplited(id);
              }}
            >
              {text()}
            </span>
            <span id={id} className="created">
              Created {created} ago
            </span>
          </label>
          <button
            id={id}
            type="button"
            className="icon icon-edit"
            onClick={() => {
              onEdit(id);
            }}
          />
          <button
            id={id}
            type="button"
            className="icon icon-destroy"
            onClick={() => {
              onDeleted(id);
            }}
          />
        </form>
        {editing ? (
          <input
            id={id}
            type="text"
            className="edit"
            value={text()}
            onChange={(e) => {
              this.onTextChanged(e);
            }}
            onKeyUp={(e) => {
              this.onKeyUp(e, id);
            }}
          />
        ) : null}
      </li>
    );
  }
}
