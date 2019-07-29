import React from 'react';
import Todo from './Todo';
import TodoApp from './TodoApp';
import FilterBy from './FilterBy';
import getSortFied from './getSortFied';

class App extends React.Component {
  state = {
    todos: [],
    sortField: 'all',
    todosVisible: [],
    isCompletedHide: 0,
    statusAllTodo: true,
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
    todosVisible: [...prevState.todosVisible, {
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

handleChackAll = () => {
  this.setState(prevState => ({
    todosVisible: prevState.todos.map(todo => ({
      ...todo,
      completed: prevState.statusAllTodo,
    }
    )),
    statusAllTodo: !prevState.statusAllTodo,
  }));
}

deleteTodo = (id) => {
  this.setState((prevState) => {
    const todosDelet = prevState.todos.filter(todo => !(todo.id === id));

    return {
      todos: todosDelet,
      todosVisible: getSortFied(todosDelet, 'all'),
    };
  });
}

deleteAllComplete = () => {
  this.setState((prevState) => {
    const todosActive = prevState.todosVisible.filter(a => !a.completed);

    return {
      todos: todosActive,
      todosVisible: getSortFied(todosActive, 'all'),
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
      <section className="main">
        <input
          type="checkbox"
          className="toggle-all"
          id="toggle-all"
          onChange={this.handleChackAll}
        />
        {/* eslint-disable-next-line */}
        <label htmlFor="toggle-all">Mark all as completed</label>
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
          {`${todosVisible.filter(todo => !todo.completed).length}
            items left`}
        </span>

        <ul className="filters">
          <FilterBy
            handleFilterBy={this.handleFilterBy}
          />
        </ul>
        <button
          type="button"
          className="clear-completed"
          onClick={this.deleteAllComplete}
        >
          {this.state.isCompletedHide ? 'Clear completed' : ''}
        </button>
      </footer>
    </section>
  );
}
}

export default App;
