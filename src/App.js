import { formatDistanceToNow } from 'date-fns';
import React from 'react';

import './App.css';
import Footer from './components/Footer/Footer';
import NewTaskForm from './components/NewTaskForm/NewTaskForm';
import TaskList from './components/TaskList/TaskList';

export default class App extends React.Component {
  todoList = [];

  state = {
    todoList: this.todoList,
  };

  onDeleted = (id) => {
    const idxD = this.todoList.findIndex((el) => el.id === id);
    const beforeD = this.todoList.slice(0, idxD);
    const afterD = this.todoList.slice(idxD + 1);

    this.todoList = [...beforeD, ...afterD];

    this.setState(({ todoList }) => {
      const idx = todoList.findIndex((el) => el.id === id);

      const before = todoList.slice(0, idx);
      const after = todoList.slice(idx + 1);

      return {
        todoList: [...before, ...after],
      };
    });
  };

  onComplited = (id) => {
    const idxD = this.todoList.findIndex((el) => el.id === id);
    this.todoList[idxD] = {
      ...this.todoList[idxD],
      complited: !this.todoList[idxD].complited,
    };

    this.setState(({ todoList }) => {
      const idx = todoList.findIndex((el) => el.id === id);
      const newArr = [...todoList];
      newArr[idx] = {
        ...this.todoList[idxD],
      };

      return {
        todoList: newArr,
      };
    });
  };

  addItem = (text) => {
    const createTime = new Date();

    this.todoList = [
      ...this.todoList,
      {
        id: this.todoList.length === 0 ? 1 : Math.max(...this.todoList.map((el) => el.id)) + 1,
        text,
        complited: false,
        createdAt: `${
          createTime.getMonth() + 1
        }.${createTime.getDate()}.${createTime.getFullYear()} ${createTime.getHours()}:${createTime.getMinutes()}:${createTime.getSeconds()}`,
        editing: false,
      },
    ];

    this.setState({
      todoList: this.todoList,
    });
  };

  onFilter = (key) => {
    switch (key) {
      case 'All':
        this.setState({
          todoList: this.todoList,
        });
        break;

      case 'Active':
        this.setState({
          todoList: this.todoList.filter((el) => !el.complited),
        });
        break;

      case 'Completed':
        this.setState({
          todoList: this.todoList.filter((el) => el.complited),
        });
        break;

      default:
        break;
    }
  };

  activeCounter = () => {
    return this.todoList.filter((el) => !el.complited).length;
  };

  dateUpdate = () => {
    if (this.todoList.length) {
      this.setState(() => {
        return {
          todoList: this.todoList.map((el) => {
            return {
              ...el,
              createdAt: formatDistanceToNow(new Date('06.05.2000 00:00:00'), {
                includeSeconds: true,
              }),
            };
          }),
        };
      });
    }
  };

  onEdit = (id) => {
    const idxD = this.todoList.findIndex((el) => el.id === id);
    this.todoList[idxD] = {
      ...this.todoList[idxD],
      editing: !this.todoList[idxD].editing,
    };

    this.setState(({ todoList }) => {
      const idx = todoList.findIndex((el) => el.id === id);
      const newArr = [...todoList];
      newArr[idx] = {
        ...this.todoList[idxD],
      };

      return {
        todoList: newArr,
      };
    });
  };

  onEditTask = (id, text) => {
    const idxD = this.todoList.findIndex((el) => el.id === id);
    this.todoList[idxD] = {
      ...this.todoList[idxD],
      text,
      editing: !this.todoList[idxD].editing,
    };

    this.setState(({ todoList }) => {
      const idx = todoList.findIndex((el) => el.id === id);
      const newArr = [...todoList];
      newArr[idx] = {
        ...this.todoList[idxD],
      };

      return {
        todoList: newArr,
      };
    });
  };

  onClearComplete = () => {
    this.todoList = this.todoList.filter((el) => !el.complited);

    this.setState({
      todoList: this.todoList,
    });
  };

  render() {
    const { todoList } = this.state;

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>

          <NewTaskForm addItem={this.addItem} />
        </header>
        <section className="main">
          <TaskList
            dateUpdate={this.dateUpdate}
            todoList={todoList}
            onDeleted={this.onDeleted}
            onComplited={this.onComplited}
            onEdit={this.onEdit}
            onEditTask={this.onEditTask}
          />

          <Footer
            onClearCompleted={this.onClearCompleted}
            onFilter={this.onFilter}
            onClearComplete={this.onClearComplete}
            itemsCount={this.activeCounter()}
          />
        </section>
      </section>
    );
  }
}
