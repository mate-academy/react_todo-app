import React from 'react';
import TodoApp from './TodoApp';
import Todo from './Todo';
import TodosFilter from './TodosFilter';
import getSortFied from './getSortFied';

class App extends React.Component {
  state = {
    todos: [],
    sortField: 'All',
    todosVisible: [],
    isCompletedHide: 0,
  }

  addTodo = (title) => {
    this.setState(prevState => ({
      todos: [...prevState.todos,
        {
          title,
          id: Date.now(),
          completed: false,
        },
      ],
      todosVisible: [...prevState.todos, {
        title,
        id: Date.now(),
        completed: false,
      }],
      completed: prevState.completed,
    }));
  };

  handleFilterBy = (sortField) => {
    this.setState(prevState => ({
      todosVisible: getSortFied(prevState.todos, sortField),
      sortField,
    }));
  }

  handleToggle = (id) => {
    this.setState((prevState) => {
      const task = prevState.todosVisible.find(todo => todo.id === id);
      task.completed = !task.completed;

      if (task.completed) {
        return {
          isCompletedHide: 1,
        };
      }

      return {
        todosVisible: prevState.todosVisible,
      };
    });
  }

  handleChackAll = (event) => {
    const isTodoChecked = event.target.checked;

    this.setState((prevState) => {
      const allCheckedTodos = [
        ...prevState.todos,
      ];
      allCheckedTodos.forEach(todo => (todo.completed = isTodoChecked));

      return {
        todos: allCheckedTodos,
      };
    });
  }

  deleteTodo = (id) => {
    const { todos, sortField } = this.state;

    this.setState((prevState) => {
      const todosDelet = todos.filter(todo => !(todo.id === id));

      return {
        todos: todosDelet,
        todosVisible: getSortFied(todosDelet, sortField),
      };
    });
  }

  destroyAllComplete = () => {
    const { sortField } = this.state;

    this.setState((prevState) => {
      const todosActive = prevState.todos.filter(a => !a.completed);
      return {
        todos: todosActive,
        todosVisible: getSortFied(todosActive, sortField),
      };
    });
  }

  render() {
    const { todosVisible } = this.state;
    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <TodoApp
            onSubmit={this.addTodo}
          />

        </header>

        <section className="main" style={{ display: 'block' }}>
          <input
            type="checkbox"
            className="toggle-all"
            id="toggle-all"
            checked={!(todosVisible.some(todo => !todo.completed))}
            onChange={this.handleChackAll}
          />
          <label htmlFor="toggle-all">Mark all as complete</label>

          <ul className="todo-list">
            {todosVisible.map(todo => (
              <Todo
                key={todo.id}
                item={todo}
                toggle={this.handleToggle}
                deleteTodo={this.deleteTodo}
              />
            ))}
          </ul>
        </section>

        <footer className="footer" style={{ display: 'block' }}>
          <span className="todo-count">
            {`${todosVisible.filter(todo => (!todo.completed)).length}
            items left`}
          </span>

          <ul className="filters">
            <TodosFilter
              handleFilterBy={this.handleFilterBy}
            />
          </ul>

          <button
            type="button"
            className="clear-completed"
            style={{ display: 'block' }}
            onClick={this.destroyAllComplete}
          >
            {this.state.isCompletedHide ? 'Clear completed' : ''}
          </button>
        </footer>
      </section>
    );
  }
}

export default App;
