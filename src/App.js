import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { TodoList } from './components/TodoList/TodoList';

class App extends React.Component {
  state = {
    task: '',
    todos: JSON.parse(localStorage.getItem('state')),
    filtered: [],
    isAnyFiltered: false,
    placeholder: 'What needs to be done?',
    isCheckedAll: false,
    activeLink: 'All',
    isEdit: '',
  };

  handleChange = (event) => {
    const { value } = event.target;

    this.setState({
      task: value.replace(/\s+/g, ' '),
    });
  }

  addTodo = (event) => {
    event.preventDefault();
    const { task } = this.state;

    this.setState(prevState => ({
      todos: [...prevState.todos, {
        id: uuidv4(), task, completed: false,
      }],
      task: '',
      isAnyFiltered: false,
      filtered: [],
      placeholder: 'What needs to be done?',
      activeLink: 'All',
    }));
  }

  changeStatus = (id, status) => {
    const { todos, filtered } = this.state;
    let newListFiltered;

    const newList = todos.map((item) => {
      const newItem = { ...item };

      if (newItem.id === id) {
        newItem.completed = status;
      }

      return newItem;
    });

    if (filtered) {
      newListFiltered = filtered.map((item) => {
        const newItem = { ...item };

        if (newItem.id === id) {
          newItem.completed = status;
        }

        return newItem;
      });
    }

    this.setState({
      todos: [...newList],
      filtered: newListFiltered,
      isCheckedAll: todos.every(item => item.completed === true),
    });
  }

  removeTask = (name) => {
    const { todos, filtered } = this.state;
    const newList = todos.filter(item => item.id !== name);
    let newListFiltered;

    if (filtered) {
      newListFiltered = filtered.filter(item => item.id !== name);
    } else {
      newListFiltered = filtered;
    }

    this.setState({
      todos: [...newList],
      filtered: newListFiltered,
    });
  }

  removeCompleted = () => {
    const { todos, filtered } = this.state;
    const newList = todos.filter(item => item.completed === false);
    let newListFiltered;

    if (filtered) {
      newListFiltered = filtered.filter(item => item.completed === false);
    }

    this.setState({
      todos: [...newList],
      filtered: newListFiltered,
      isCheckedAll: false,
    });
  }

  showAll = (event) => {
    event.preventDefault();
    const { innerText } = event.target;

    this.setState({
      filtered: [],
      isAnyFiltered: false,
      activeLink: innerText,
    });
  }

  showCompleted = (event) => {
    event.preventDefault();
    const { innerText } = event.target;
    const { todos } = this.state;
    const newList = todos.filter(item => item.completed === true);

    this.setState({
      filtered: [...newList],
      isAnyFiltered: true,
      activeLink: innerText,
    });
  }

  showActive = (event) => {
    event.preventDefault();
    const { innerText } = event.target;
    const { todos } = this.state;
    const newList = todos.filter(item => item.completed === false);

    this.setState({
      filtered: [...newList],
      isAnyFiltered: true,
      activeLink: innerText,
    });
  }

  validatedForm = (event) => {
    event.preventDefault();

    this.setState({
      placeholder: 'Please enter the task',
      task: '',
    });
  }

  checkedAll = () => {
    const { todos, isCheckedAll } = this.state;

    const newList = todos.map((item) => {
      const newItem = { ...item };

      if (!isCheckedAll) {
        newItem.completed = true;
      } else {
        newItem.completed = false;
      }

      return newItem;
    });

    this.setState({
      todos: [...newList],
      filtered: [],
      isAnyFiltered: false,
      isCheckedAll: !isCheckedAll,
    });
  }

  editTask = (name) => {
    this.setState({
      isEdit: name,
    });
  }

  taskEdited = (edtiTitle, name) => {
    const { todos, filtered } = this.state;
    let newListFiltered;

    const newList = todos.map((item) => {
      const newItem = { ...item };

      if (newItem.id === name) {
        newItem.task = edtiTitle;
      }

      return newItem;
    });

    if (filtered) {
      newListFiltered = filtered.map((item) => {
        const newItem = { ...item };

        if (newItem.id === name) {
          newItem.task = edtiTitle;
        }

        return newItem;
      });
    } else {
      newListFiltered = filtered;
    }

    this.setState({
      todos: [...newList],
      filtered: newListFiltered,
      isCheckedAll: todos.every(item => item.completed === true),
      isEdit: '',
    });
  }

  render() {
    const {
      task,
      todos,
      filtered,
      isAnyFiltered,
      placeholder,
      isCheckedAll,
      activeLink,
      isEdit,
    } = this.state;
    const activeItems = todos.filter(i => i.completed === false).length;
    const storage = JSON.stringify(todos);

    localStorage.setItem('state', storage);

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>

          <form onSubmit={
            !task || task === ' ' ? this.validatedForm : this.addTodo
          }
          >
            <input
              value={task}
              onChange={this.handleChange}
              className="new-todo"
              placeholder={placeholder}
            />
          </form>
        </header>

        <TodoList
          items={!isAnyFiltered ? todos : filtered}
          changeStatus={this.changeStatus}
          removeTask={this.removeTask}
          removeCompleted={this.removeCompleted}
          showAll={this.showAll}
          showCompleted={this.showCompleted}
          showActive={this.showActive}
          activeItems={activeItems}
          checkedAll={this.checkedAll}
          isCheckedAll={isCheckedAll}
          activeLink={activeLink}
          isEdit={isEdit}
          editTask={this.editTask}
          taskEdited={this.taskEdited}
        />
      </section>
    );
  }
}

export default App;
