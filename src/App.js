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
      originalTodos: [
        ...prevState.originalTodos,
        {
          id: prevState.idCounter + 1,
          title,
          isCompleted: false,
        },
      ],

      idCounter: prevState.idCounter + 1,
    }));

    this.filterTodos();
  };

  filterTodos = () => {
    this.setState((prevState) => {
      const { filterIdentifier, originalTodos } = prevState;

      if (filterIdentifier === 'active') {
        return ({
          todos: originalTodos.filter(todo => !todo.isCompleted),
        });
      }

      if (filterIdentifier === 'completed') {
        return ({
          todos: originalTodos.filter(todo => todo.isCompleted),
        });
      }

      return ({
        todos: [...originalTodos],
      });
    });
  };

  toggleAllTodosCompleted = () => {
    this.setState(prevState => ({
      originalTodos: prevState.originalTodos.map(todo => ({
        ...todo,
        isCompleted: prevState.originalTodos.some(t => !t.isCompleted),
      })),
    }));

    this.filterTodos();
  };

  toggleTodoCompleteness = (id) => {
    this.setState(prevState => ({
      originalTodos: prevState.originalTodos.map((todo) => {
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
      originalTodos: prevState.originalTodos
        .filter(todo => todo.id !== id),
    }));

    this.filterTodos();
  };

  toggleFilterIdentifier = (identifier) => {
    this.setState({
      filterIdentifier: identifier,
    });

    this.filterTodos();
  };

  removeCompletedTodos = () => {
    this.setState(prevState => ({
      originalTodos: prevState.originalTodos
        .filter(todo => !todo.isCompleted),
    }));

    this.filterTodos();
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
