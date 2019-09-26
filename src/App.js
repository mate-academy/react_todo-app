import React from 'react';
import NewTodo from './components/NewTodo/NewTodo';
import TodoList from './components/TodoList/TodoList';
import TodosFilter from './components/TodosFilter/TodosFilter';

class App extends React.Component {
  state = {
    todos: [],
    originalTodos: [],
    idCounter: 0,
    filterIdentifier: 'all',
  };

  handleAddTodo = (title) => {
    this.setState(prevState => ({
      todos: [
        {
          id: prevState.idCounter + 1,
          title,
          isCompleted: false,
        },
        ...prevState.todos,
      ],
      originalTodos: [
        {
          id: prevState.idCounter + 1,
          title,
          isCompleted: false,
        },
        ...prevState.todos,
      ],
      idCounter: prevState.idCounter + 1,
    }));
  };

  toggleAllTodosCompleted = () => {
    this.setState(prevState => ({
      todos: [...prevState.todos].map(todo => ({
        ...todo,
        isCompleted: prevState.todos.some(t => !t.isCompleted),
      })),
      originalTodos: [...prevState.originalTodos].map(todo => ({
        ...todo,
        isCompleted: prevState.originalTodos.some(t => !t.isCompleted),
      })),
    }));
  };

  toggleTodoCompleteness = (id) => {
    this.setState(prevState => ({
      todos: [...prevState.todos].map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            isCompleted: !todo.isCompleted,
          };
        }

        return todo;
      }),
      originalTodos: [...prevState.originalTodos].map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            isCompleted: !todo.isCompleted,
          };
        }

        return todo;
      }),
    }));

    this.filterTodos();
  };

  removeTodo = (id) => {
    this.setState(prevState => ({
      todos: [...prevState.todos].filter(todo => todo.id !== id),
      originalTodos: [...prevState.originalTodos]
        .filter(todo => todo.id !== id),
    }));
  };

  toggleFilterIdentifier = (identifier) => {
    this.setState({
      filterIdentifier: identifier,
    });
    this.filterTodos();
  };

  filterTodos = () => {
    this.setState((prevState) => {
      const { filterIdentifier, originalTodos } = prevState;

      if (filterIdentifier === 'active') {
        return ({
          todos: [...originalTodos].filter(todo => !todo.isCompleted),
        });
      }

      if (filterIdentifier === 'completed') {
        return ({
          todos: [...originalTodos].filter(todo => todo.isCompleted),
        });
      }

      return ({
        todos: [...originalTodos],
      });
    });
  };

  removeCompletedTodos = () => {
    this.setState(prevState => ({
      todos: [...prevState.todos].filter(todo => !todo.isCompleted),
      originalTodos: [...prevState.originalTodos]
        .filter(todo => !todo.isCompleted),
    }));
  };

  render() {
    const { todos, originalTodos, filterIdentifier } = this.state;
    const amountOfActiveTodos = originalTodos
      .filter(todo => !todo.isCompleted).length;

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTodo onAdd={this.handleAddTodo} />
        </header>

        <section className="main" style={{ display: 'block' }}>
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            onClick={this.toggleAllTodosCompleted}
          />
          <label htmlFor="toggle-all">Mark all as complete</label>
          <TodoList
            todos={todos}
            toggleTodoCompleteness={this.toggleTodoCompleteness}
            removeTodo={this.removeTodo}
          />
        </section>

        {(originalTodos.length > 0) && (
          <footer className="footer" style={{ display: 'block' }}>
            <span className="todo-count">
              {amountOfActiveTodos}
              {' '}
              {amountOfActiveTodos === 1
                ? 'item left'
                : 'items left'
              }
            </span>
            <TodosFilter
              todos={todos}
              filterIdentifier={filterIdentifier}
              toggleFilterIdentifier={this.toggleFilterIdentifier}
              removeCompletedTodos={this.removeCompletedTodos}
            />
          </footer>
        )}
      </section>
    );
  }
}

export default App;
