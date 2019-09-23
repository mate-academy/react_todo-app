import React from 'react';

import TodoList from './component/TodoList';
import TodoFilter from './component/TodoFilter';

const _ = require('lodash');
//const classNames = require('classnames');

class App extends React.Component {
  state = {
    todoList: [],
    todoListFiltered: [],
    textNewTodo: '',
    ruleForAllCompleted: true,
    activeFilter: false,
    saveStorage: false,
  };

  componentDidMount() {
    const saveStorage = JSON.parse(localStorage.getItem('saveStorage'));

    if (saveStorage) {
      const todoList = JSON
        .parse(localStorage.getItem('todoList'));
      const todoListFiltered = JSON
        .parse(localStorage.getItem('todoListFiltered'));
      const ruleForAllCompleted = JSON
        .parse(localStorage.getItem('ruleForAllCompleted'));

      this.setState({
        saveStorage,
        todoList,
        todoListFiltered,
        ruleForAllCompleted,
      });
    }
  }

  componentDidUpdate() {
    this.handleFormSubmit();
  }

  addNewTodo = (event) => {
    event.preventDefault();
    const idForTodos = _.uniqueId('todo_');

    if (this.state.textNewTodo.replace(/\s/g, '') !== '') {
      this.setState(prevState => ({
        todoList: [...prevState.todoList,
          {
            id: idForTodos,
            title: prevState.textNewTodo,
            completed: false,
          },
        ],
        todoListFiltered: [...prevState.todoListFiltered,
          {
            id: idForTodos,
            title: prevState.textNewTodo,
            completed: false,
          },
        ],
        textNewTodo: '',
        saveStorage: true,
      }));
    }
  };

  handleNewTodoText = ({ target: { value } }) => {
    this.setState({
      textNewTodo: value.replace(/^\s+/, ''),
    });
  };

  toggleCompleteStatus = (id) => {
    const { activeFilter } = this.state;

    this.setState(({ todoList, todoListFiltered }) => ({
      todoList: todoList.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed };
        }

        return todo;
      }),
      todoListFiltered: todoListFiltered.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed };
        }

        return todo;
      }),
    }));

    if (activeFilter === 'Completed') {
      this.toggleShowCompleted();
    }

    if (activeFilter === 'Active') {
      this.toggleShowActive();
    }
  };

  toggleCompleteAllStatus = () => {
    this.setState(prevState => ({
      todoListFiltered: prevState.todoListFiltered
        .map(todo => ({ ...todo,
          completed: prevState.todoListFiltered
            .some(todo => todo.completed === false) ? true : false })),
      todoList: prevState.todoList
        .map(todo => ({ ...todo,
          completed: prevState.todoList
            .some(todo => todo.completed === false) ? true : false })),
      ruleForAllCompleted: !prevState.ruleForAllCompleted,
    }));
  };

  toggleShowAll = () => {
    this.setState(prevState => ({
      todoListFiltered: prevState.todoList
        .map(todo => ({ ...todo })),
      activeFilter: false,
    }));
  };

  toggleShowActive = () => {
    this.setState(prevState => ({
      todoListFiltered: prevState.todoList
        .filter(todo => todo.completed === false),
      activeFilter: 'Active',
    }));
  };

  toggleShowCompleted = () => {
    this.setState(prevState => ({
      todoListFiltered: prevState.todoList
        .filter(todo => todo.completed === true),
      activeFilter: 'Completed',
    }));
  };

  toggleRemoveTodo = (id) => {
    this.setState(({ todoList, todoListFiltered }) => ({
      todoList: todoList.filter(todo => (todo.id !== id)),
      todoListFiltered: todoListFiltered.filter(todo => (todo.id !== id))
    }));
  };

  toggleRemoveAllCompleted = () => {
    this.setState(({ todoList, todoListFiltered }) => ({
      todoList: todoList.filter(todo => (!todo.completed)),
      todoListFiltered: todoListFiltered.filter(todo => (!todo.completed)),
    }));
  };

  handleFormSubmit() {
    const {
      todoList,
      todoListFiltered,
      ruleForAllCompleted,
      saveStorage,
    } = this.state;

    localStorage.setItem('saveStorage',
      JSON.stringify(saveStorage));
    localStorage.setItem('todoList',
      JSON.stringify(todoList));
    localStorage.setItem('todoListFiltered',
      JSON.stringify(todoListFiltered));
    localStorage.setItem('ruleForAllCompleted',
      JSON.stringify(ruleForAllCompleted));
  }

  render() {
    const {
      textNewTodo,
      todoListFiltered,
      activeFilter,
      todoList,
    } = this.state;
    const countedLeft = todoListFiltered.filter(item => !item.completed).length;

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>

          <form onSubmit={this.addNewTodo}>
            <input
              value={textNewTodo}
              onChange={this.handleNewTodoText}
              className="new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        <section className="main" style={{ display: 'block' }}>
          {
            !!todoList.length && (
              <>
                <input
                  type="checkbox"
                  id="toggle-all"
                  className="toggle-all"
                  onChange={this.toggleCompleteAllStatus}
                />
                <label htmlFor="toggle-all">Mark all as complete</label>
              </>
            )
          }

          <TodoList
            todoListFiltered={todoListFiltered}
            toggleCompleteStatus={this.toggleCompleteStatus}
            toggleRemoveTodo={this.toggleRemoveTodo}
          />
        </section>

        {
          !!todoList.length && (
            <footer className="footer" style={{ display: 'block' }}>
              <span className="todo-count">
                {countedLeft}
                {' '}
                item
                {countedLeft !== 1 && 's'}
                {' '}
                left
              </span>

              <TodoFilter
                toggleShowActive={this.toggleShowActive}
                toggleShowAll={this.toggleShowAll}
                toggleShowCompleted={this.toggleShowCompleted}
                activeFilter={activeFilter}
              />

              {
                !!todoList.some(todo => todo.completed) && (
                  <button
                    type="button"
                    className="clear-completed"
                    style={{ display: 'block' }}
                    onClick={this.toggleRemoveAllCompleted}
                  >
                    Clear completed
                  </button>
                )
              }

            </footer>
          )
        }
      </section>
    );
  }
}

export default App;
