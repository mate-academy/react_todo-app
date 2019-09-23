import React from 'react';
import TodoForm from './components/TodoForm';
import TodoItem from './components/TodoItem';
import Footer from './components/Footer';

class App extends React.Component {
  state = {
    todos: [],
    todosToShow: 'all',
    toggleAllComplete: true,
  }

  addTodo = (todo) => {
    this.setState(prevState => ({
      todos: [todo, ...prevState.todos],
    }));
  }

  toggleComplete = (id) => {
    this.setState(prevState => ({
      todos: prevState.todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            complete: !todo.complete,
          };
        }

        return todo;
      }),
    }));
  }

  updateTodoToShow = (string) => {
    this.setState({
      todosToShow: string,
    });
  }

  handleDeleteTodo = (id) => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => todo.id !== id),
    }));
  }

  removeAllCompleteTodos = () => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => !todo.complete),
    }));
  }

  toggleAllComplete = () => {
    this.setState(prevState => ({
      todos: prevState.todos.map(todo => ({
        ...todo,
        complete: prevState.toggleAllComplete,
      })),
      toggleAllComplete: !prevState.toggleAllComplete,
    }));
  }

  render() {
    const { todosToShow } = this.state;

    let todos = [];

    if (todosToShow === 'all') {
      todos = this.state.todos;
    } else if (todosToShow === 'active') {
      todos = this.state.todos.filter(todo => !todo.complete);
    } else if (todosToShow === 'completed') {
      todos = this.state.todos.filter(todo => todo.complete);
    }

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <TodoForm onSubmit={this.addTodo} />
        </header>

        <section className="main" style={{ display: 'block' }}>
          <input
            onClick={this.toggleAllComplete}
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
          />
          <label htmlFor="toggle-all">Mark all as complete</label>

          <ul className="todo-list">
            {todos.map(todo => (
              <TodoItem
                key={todo.id}
                todo={todo}
                id={todo.id}
                toggleComplete={() => this.toggleComplete(todo.id)}
                onDelete={() => this.handleDeleteTodo(todo.id)}
              />
            ))}
          </ul>
        </section>

        <Footer
          todos={todos}
          todosToShow={todosToShow}
          updateTodoToShow={this.updateTodoToShow}
          removeAllCompleteTodos={this.removeAllCompleteTodos}
        />
      </section>
    );
  }
}

export default App;
