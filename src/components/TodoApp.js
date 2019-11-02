import React from 'react';
import TodoInput from './TodoInput';
import TodoList from './TodoList';
import ControlPanel from './ControlPanel';

class TodoApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: [],
      id: 1,
      selectedTab: 'All',
    };
  }

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
  }

  toggleOne = (event) => {
    const eTargetId = +event.target.id;

    this.setState(prevState => ({
      ...prevState,
      todos: prevState.todos.map((item) => {
        if (eTargetId === item.id && item.completed) {
          return { ...item, completed: false };
        }

        if (eTargetId === item.id && !item.completed) {
          return { ...item, completed: true };
        }

        return item;
      }),
    }));
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
  }

  handleFilter = (event) => {
    document.querySelector('.filters .selected').className = '';
    const tab = event.target;
    const tabName = tab.innerText;

    if (tabName === 'All') {
      tab.className = 'selected';
      this.setState({
        selectedTab: 'All',
      });
    } else if (tabName === 'Active') {
      tab.className = 'selected';
      this.setState({
        selectedTab: 'Active',
      });
    } else if (tabName === 'Completed') {
      tab.className = 'selected';
      this.setState({
        selectedTab: 'Completed',
      });
    }
  }

  clearItem = (event) => {
    const eTargetId = +event.target.id;

    this.setState(prevState => ({
      ...prevState,
      todos: [...prevState.todos].filter(item => item.id !== eTargetId),
    }));
  }

  clearCompleted = () => {
    this.setState(prevState => ({
      ...prevState,
      todos: [...prevState.todos].filter(item => !item.completed),
    }));
  }

  render() {
    return (
      <section className="todoapp">
        <TodoInput
          addTodoItem={this.addTodoItem}
        />

        <TodoList
          items={this.state.todos}
          toggleOne={this.toggleOne}
          toggleAll={this.toggleAll}
          selectedTab={this.state.selectedTab}
          clearItem={this.clearItem}
        />

        <ControlPanel
          items={this.state.todos}
          handleFilter={this.handleFilter}
          clearCompleted={this.clearCompleted}
        />
      </section>
    );
  }
}

export default TodoApp;
