/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React, { Component } from 'react';
import TodoList from './Components/TodoList/TodoList';
import NewTodo from './Components/NewTodo/NewTodo';
import TodoFilter from './Components/TodosFilter/TodosFilter';

class App extends Component {
  state = {
    todoList: [],
    isAllChecked: false,
    activeFilterName: 'all',
  };

  changeActiveFilter = (filterName) => {
    this.setState({ activeFilterName: filterName });
  }

  addNewTodo = (newTodo) => {
    this.setState(prevState => ({
      todoList: [newTodo, ...prevState.todoList],
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
            todoListLength={todoList.length}
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
              todos={todoList}
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
          />
        </footer>
      </section>
    );
  }
}

export default App;
