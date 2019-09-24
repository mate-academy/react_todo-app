import React from 'react';

import TodoList from './component/TodoList';
import TodoFilter from './component/TodoFilter';

const _ = require('lodash');

class App extends React.Component {
  state = {
    todoList: [],
    todoListFiltered: [],
    textNewTodo: '',
    activeFilter: 'All',
    savedStorage: false,
  };

  componentDidMount() {
    const preparedlocalSrotage = Object
      .fromEntries(Object.entries(localStorage));
    const preparedState = {};

    for (let state in preparedlocalSrotage) {
      if (state !== null) {
        preparedState[state] = JSON.parse(localStorage.getItem(state));
      }
    }

    if (preparedState.savedStorage) {
      this.setState({
        ...preparedState,
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
        savedStorage: true,
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
      this.toggleFilters('Completed');
    }

    if (activeFilter === 'Active') {
      this.toggleFilters('Active');
    }
  };

  toggleCompleteAllStatus = () => {
    this.setState(prevState => ({
      todoListFiltered: prevState.todoListFiltered
        .map(todo => ({
          ...todo,
          completed: prevState.todoListFiltered
            .some(todo => todo.completed === false),
        })),
      todoList: prevState.todoList
        .map(todo => ({
          ...todo,
          completed: prevState.todoList
            .some(todo => todo.completed === false),
        })),
    }));
  };

  toggleFilters = (active) => {
    if (active === 'All') {
      this.setState(prevState => ({
        todoListFiltered: prevState.todoList
          .map(todo => ({ ...todo })),
        activeFilter: 'All',
      }));
    }

    if (active === 'Active') {
      this.setState(prevState => ({
        todoListFiltered: prevState.todoList
          .filter(todo => todo.completed === false),
        activeFilter: 'Active',
      }));
    }

    if (active === 'Completed') {
      this.setState(prevState => ({
        todoListFiltered: prevState.todoList
          .filter(todo => todo.completed === true),
        activeFilter: 'Completed',
      }));
    }
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
      savedStorage,
    } = this.state;

    localStorage.setItem('savedStorage',
      JSON.stringify(savedStorage));
    localStorage.setItem('todoList',
      JSON.stringify(todoList));
    localStorage.setItem('todoListFiltered',
      JSON.stringify(todoListFiltered));
  }

  render() {
    const {
      textNewTodo,
      todoListFiltered,
      activeFilter,
      todoList,
    } = this.state;
    const countedLeft = todoList.filter(item => !item.completed).length;

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

        <section className="main">
          {!!todoList.length && (
            <>
              <input
                type="checkbox"
                id="toggle-all"
                className="toggle-all"
                onChange={this.toggleCompleteAllStatus}
              />
              <label htmlFor="toggle-all">Mark all as complete</label>
            </>
          )}

          <TodoList
            todoListFiltered={todoListFiltered}
            toggleCompleteStatus={this.toggleCompleteStatus}
            toggleRemoveTodo={this.toggleRemoveTodo}
          />
        </section>

        {
          !!todoList.length && (
            <footer className="footer">
              <span className="todo-count">
                {countedLeft}
                {' '}
                item
                {countedLeft !== 1 && 's'}
                {' '}
                left
              </span>

              <TodoFilter
                toggleFilters={this.toggleFilters}
                activeFilter={activeFilter}
              />

              {
                !!todoList.some(todo => todo.completed) && (
                  <button
                    type="button"
                    className="clear-completed"
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
