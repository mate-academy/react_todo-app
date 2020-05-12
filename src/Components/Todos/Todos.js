import React from 'react';
import TodosContainer from './TodosContainer/TodosContainer';
import Footer from './Footer/Footer';
import TodoInput from './TodoInput/TodoInput';

class Todos extends React.Component {
  state = {
    todos: [],
    allCompleted: false,
    isAll: true,
    isActive: false,
    isCompleted: false,
  };

  handleAddTodo = (todo) => {
    this.setState((prevState) => {
      const { todos } = this.state;

      todos.push({
        id: todos.length === 0 ? `todo-${0}` : `todo-${todos.length}`,
        text: todo,
        completed: false,
      });

      return todos;
    });
  }

  handleToggleCompletion = (id) => {
    const { todos } = this.state;
    const index = todos.map(todo => todo.id).indexOf(id);

    this.setState((prevState) => {
      todos[index].completed = !todos[index].completed;

      return todos;
    });
  }

  handleDeleteBtn = (id) => {
    const { todos } = this.state;

    this.setState({
      todos: todos.filter(todo => todo.id !== id),
    });
  }

  handleAllCompleted = () => {
    const { todos, allCompleted } = this.state;

    const firstClick = () => {
      const completedTodos = todos.map((todo) => {
        if (todo.completed === false) {
          return {
            ...todo,
            completed: true,
          };
        }

        return todo;
      });

      this.setState({
        todos: [...completedTodos],
        allCompleted: true,
      });
    };

    const secondClick = () => {
      const activeTodos = todos.map((todo) => {
        if (todo.completed === true) {
          return {
            ...todo,
            completed: false,
          };
        }

        return todo;
      });

      this.setState({
        todos: [...activeTodos],
        allCompleted: false,
      });
    };

    !allCompleted ? firstClick() : secondClick();
  }

  handleDeleteAllCompleted = () => {
    const { todos } = this.state;

    this.setState({
      todos: todos.filter(todo => todo.completed === false),
    });
  }

  handleActiveFiltering = () => {
    this.setState({
      isAll: false,
      isActive: true,
      isCompleted: false,
    });
  }

  handleCompletedFiltering = () => {
    this.setState({
      isAll: false,
      isActive: false,
      isCompleted: true,
    });
  }

  handleAllFiltering = () => {
    this.setState({
      isAll: true,
      isActive: false,
      isCompleted: false,
    });
  }

  render() {
    const {
      todos,
      isAll,
      isActive,
      isCompleted,
    } = this.state;

    let visibleTodos = [...todos];

    if (!isAll && isActive && !isCompleted) {
      visibleTodos = todos.filter(todo => todo.completed === false);
    }

    if (!isAll && !isActive && isCompleted) {
      visibleTodos = todos.filter(todo => todo.completed === true);
    }

    return (
      <>
        <section className="todoapp">
          <header className="header">
            <h1>todos</h1>
            <TodoInput addTodo={this.handleAddTodo} />
          </header>

          <TodosContainer
            toggleAllCompleted={() => this.handleAllCompleted()}
            todos={visibleTodos}
            isCompleted={this.handleToggleCompletion}
            deleteTodo={this.handleDeleteBtn}
          />

          {todos.length > 0 && (
            <Footer
              todos={todos}
              isAll={isAll}
              isActive={isActive}
              isCompleted={isCompleted}
              deleteAllCompleted={this.handleDeleteAllCompleted}
              showAll={this.handleAllFiltering}
              showActive={this.handleActiveFiltering}
              showCompleted={this.handleCompletedFiltering}
            />
          )}

        </section>
      </>
    );
  }
}

export default Todos;
