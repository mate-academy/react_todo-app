/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React, { Component } from 'react';
import TodoList from './Components/TodoList/TodoList';
import NewTodo from './Components/NewTodo/NewTodo';
import TodoFilter from './Components/TodosFilter/TodosFilter';

class App extends Component {
  state = {
    idCounter: 1,
    todoList: [],
    isAllChecked: false,
    activeFilterName: 'all',
  };

  sortTodoList = (todoList) => {
    const { activeFilterName } = this.state;

    switch (activeFilterName) {
      case 'completed': return todoList.filter(todo => todo.completed);
      case 'active': return todoList.filter(todo => !todo.completed);
      default: return todoList;
    }
  }

  changeActiveFilter = (filterName) => {
    this.setState({ activeFilterName: filterName });
  }

  addNewTodo = (newTodo) => {
    this.setState(prevState => ({
      todoList: [{
        ...newTodo,
        id: prevState.idCounter,
      },
      ...prevState.todoList,
      ],
      idCounter: prevState.idCounter + 1,
      isAllChecked: false,
    }));
  };

  deleteTodo = (id) => {
    const { todoList } = this.state;
    const index = todoList.findIndex(item => item.id === id);

    this.setState(prevState => ({
      todoList: [
        ...prevState.todoList.slice(0, index),
        ...prevState.todoList.slice(index + 1),
      ],
    }));
  };

  setCompleted = (id) => {
    this.setState(prevState => ({
      todoList: prevState.todoList
        .map(todoItem => (
          todoItem.id === id
            ? ({
              ...todoItem,
              completed: !todoItem.completed,
            })
            : ({ ...todoItem })
        )),
      isAllChecked: prevState.isAllChecked
        ? !prevState.isAllChecked
        : prevState.isAllChecked,
    }));
  };

  setAllCompleted = () => {
    this.setState(prevState => ({
      todoList: prevState.todoList
        .map(todoItem => ({
          ...todoItem,
          completed: !prevState.isAllChecked,
        })),
      isAllChecked: !prevState.isAllChecked,
    }));
  };

  clearCompleted = () => {
    this.setState(prevState => ({
      todoList: prevState.todoList
        .filter(todo => !todo.completed),
    }));
  };

  render() {
    const {
      todoList,
      isAllChecked,
      activeFilterName,
    } = this.state;

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTodo
            addNewTodo={this.addNewTodo}
          />
        </header>

        <section className="main" style={{ display: 'block' }}>
          <input
            disabled={!todoList.length}
            onChange={this.setAllCompleted}
            checked={!todoList.length
              ? false
              : isAllChecked
            }
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
          />
          <label htmlFor="toggle-all">Mark all as complete</label>

          <ul className="todo-list">
            <TodoList
              todos={this.sortTodoList(todoList)}
              deleteTodo={this.deleteTodo}
              setCompleted={this.setCompleted}
            />
          </ul>
        </section>

        <footer
          className="footer"
          style={{
            display: todoList.length
              ? 'block'
              : 'none',
          }}
        >
          <span className="todo-count">
            {`${todoList.length} items left`}
          </span>
          <TodoFilter
            activeFilterName={activeFilterName}
            changeActiveFilter={this.changeActiveFilter}
          />
          <button
            type="button"
            className="clear-completed"
            style={{ display: 'block' }}
            onClick={this.clearCompleted}
          >
            Clear completed
          </button>

        </footer>
      </section>
    );
  }
}

export default App;
