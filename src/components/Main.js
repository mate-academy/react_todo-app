import React from 'react';
import Input from './Input';
import List from './List';
import BottomControlPanel from './BottomControlPanel';

class Main extends React.Component {
  state = {
    todos: [],
    id: 1,
    selectedTab: 'All',
  };

  componentDidMount() {
    const todoList = JSON.parse(localStorage.getItem('todoList'));
    if (todoList !== null) {
      const todoIdFromJson = localStorage.getItem('todoId');
      this.setState((prevState) => {
        return {
          ...prevState,
          todos: [...todoList],
          id: +todoIdFromJson,
        };
      });
    }
  }

  componentDidUpdate() {
    localStorage.setItem('todoList', JSON.stringify(this.state.todos));
    localStorage.setItem('todoId', this.state.id);
  }

  toggleAll = () => {
    this.setState(prevState => ({
      ...prevState,
      todos: prevState.todos.map((item) => {
        if (prevState.todos.every(todo => todo.completed)) {
          return { ...item, completed: false };
        }

        return { ...item, completed: true };
      }),
    }));
  };

  toggleOne = (event) => {
    const targetId = +event.target.id;

    this.setState(prevState => ({
      ...prevState,
      todos: prevState.todos.map((item) => {
        if (targetId === item.id) {
          return { ...item, completed: !item.completed };
        }

        return item;
      }),
    }));
  };

  addTodoItem = (todo) => {
    this.setState(prevState => ({
      id: prevState.id + 1,
      todos: [
        {
          id: prevState.id,
          title: todo,
          completed: false,
        },
        ...prevState.todos,
      ],
    }));
  };

  handleFilter = (event) => {
    const tab = event.target;
    const tabName = tab.innerText;


    switch (tabName) {
      case 'All':
        tab.className = 'selected';
        this.setState({
          selectedTab: tabName,
        });
        break;

      case 'Active':
        tab.className = 'selected';
        this.setState({
          selectedTab: tabName,
        });
        break;

      case 'Completed':
        tab.className = 'selected';
        this.setState({
          selectedTab: tabName,
        });
        break;

      default:
    }
  };

  clearItem = (event) => {
    const targetId = +event.target.id;

    this.setState(prevState => ({
      ...prevState,
      todos: [...prevState.todos].filter(item => item.id !== targetId),
    }));
  };

  clearCompleted = () => {
    this.setState(prevState => ({
      ...prevState,
      todos: [...prevState.todos].filter(item => !item.completed),
    }));
  };

  render() {
    return (
      <section className="todoapp">
        <Input
          addTodoItem={this.addTodoItem}
        />

        <List
          items={this.state.todos}
          toggleOne={this.toggleOne}
          toggleAll={this.toggleAll}
          selectedTab={this.state.selectedTab}
          clearItem={this.clearItem}
        />

        <BottomControlPanel
          items={this.state.todos}
          handleFilter={this.handleFilter}
          clearCompleted={this.clearCompleted}
          selectedTab={this.state.selectedTab}
        />
      </section>
    );
  }
}

export default Main;
