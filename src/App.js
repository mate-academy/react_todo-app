import React from 'react';
import getTodos from './api/todos';
import TodoApp from './TodoApp';
import TodoList from './TodoList';
import TodosFilter from './TodosFilter';

class App extends React.Component {
  state = {
    todos: [],
  };

  componentDidMount() {
    this.setState({ todos: getTodos });
  }

  addTodo = (title) => {
    this.setState(prevState => ({
      todos: [
        ...prevState.todos,
        {
          title,
          id: prevState.todos.length + 1,
          completed: false,
        },
      ],
    }));
  };

  handleChangeCompleted = (id) => {
    this.setState(prevState => ({
      todos: prevState.todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }

        return todo;
      })
    }));
  };

  handleChangeCompletedAll = () => {
    this.setState(prevState => {
      if (prevState.todos.every(todo => todo.completed === false)
        || prevState.todos.every(todo => todo.completed === true)) {
        return {
          todos: prevState.todos.map(todo => ({
            ...todo,
            completed: !todo.completed,
          }))
        };
      } else {
        return {
          todos: prevState.todos.map(todo => ({
            ...todo,
            completed: true,
          }))
        };
      }

    });
  };

  render() {
    const { todos } = this.state;

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <TodoApp addTodo={this.addTodo} />
        </header>

        <TodoList
          todos={todos}
          changeCompleted={this.handleChangeCompleted}
          changeCompletedAll={this.handleChangeCompletedAll}
        />

        <footer className="footer" style={{ display: 'block' }}>
          <span className="todo-count">
            {`${todos.length} items left`}
          </span>

          <TodosFilter />

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
