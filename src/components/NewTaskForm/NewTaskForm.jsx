import React from 'react';

import './NewTaskForm.css';

export default class NewTaskForm extends React.Component {
  state = {
    text: '',
  };

  onTextChanged = (e) => {
    this.setState({
      text: e.target.value,
    });
  };

  onSubmit = (e) => {
    const { text } = this.state;
    const { addItem } = this.props;

    e.preventDefault();
    if (text) {
      addItem(text);

      this.setState(() => {
        return {
          text: '',
        };
      });
    }
  };

  render() {
    const { text } = this.state;

    return (
      <form
        onSubmit={(e) => {
          this.onSubmit(e);
        }}
      >
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          value={text}
          onChange={(e) => {
            this.onTextChanged(e);
          }}
        />
      </form>
    );
  }
}
