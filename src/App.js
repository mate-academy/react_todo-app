import React from 'react';
import TodoApp from './TodoApp';
import Todo from './Todo';

const getSortFied = (todos, sortField) => {
  if (sortField === 'All') {
    console.log(sortField);
    return todos;
  }

  const callBackSort = {
    Active: a => !a.completed,
    Completed: a => a.completed,
  };

  console.log(todos);
  console.log(sortField);

  const callBack = callBackSort[sortField];

  return todos.filter(callBack);
};

class App extends React.Component {
  state = {
    todos: [],
    sortField: '',
    todosVisible: [],
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
      sortField: prevState.sortField,
    }));
  }

  handleToggle = (id) => {
    this.setState((prevState) => {
      const task = prevState.todos.find(todo => todo.id === id);
      task.completed = !task.completed;

      return {
        todos: prevState.todos,
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
            {/* <TodosFilter /> */}
            <li>
              <a
                onClick={() => this.handleFilterBy('Active')}
                href="#/"
                className="selected"
              >
                Active
              </a>
            </li>

            <li>
              <a
                href="#/active"
                onClick={() => this.handleFilterBy('All')}
              >
                  All
              </a>
            </li>

            <li>
              <a
                href="#/completed"
                onClick={() => this.handleFilterBy('Completed')}
              >
                Completed
              </a>
            </li>
          </ul>

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
