import React from 'react';
import TodosList from './TodosList/TodosList';
import Footer from './Footer/Footer';
import TodoInput from './TodoInput/TodoInput';

class Todos extends React.Component {
  state = {
    todos: [
      {
        id: 0, text: 'Sample Todo', completed: false,
      },
    ],
  };

  handleToggleCompletion = (id) => {
    const index = this.state.todos.map(todo => todo.id).indexOf(id);

    this.setState((prevState) => {
      const { todos } = this.state;

      todos[index].completed = !todos[index].completed;

      return todos;
    });
  }

  handleDeleteBtn = (id) => {
    const index = this.state.todos.map(todo => todo.id).indexOf(id);

    this.setState((prevState) => {
      const { todos } = this.state;

      delete todos[index];

      return todos;
    });
  }

  handleAddTodo = (todo) => {
    this.setState((prevState) => {
      const { todos } = this.state;

      todos.push({
        id: todos.length !== 0 ? todo.length : 0,
        text: todo,
        completed: false,
      });

      return todos;
    });
  }

  render() {
    const { todos } = this.state;

    return (
      <>
        <section className="todoapp">
          <header className="header">
            <h1>todos</h1>
            <TodoInput addTodo={this.handleAddTodo} />
          </header>

          {todos.map(todo => (
            <TodosList
              key={todo.id}
              todos={todo}
              isCompleted={() => this.handleToggleCompletion(todo.id)}
              deleteTodo={() => this.handleDeleteBtn(todo.id)}
            />
          ))}
          <Footer />
        </section>
      </>
    );
  }
}

export default Todos;
