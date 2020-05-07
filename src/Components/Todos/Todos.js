import React from 'react';
import TodosContainer from './TodosContainer/TodosContainer';
import Footer from './Footer/Footer';
import TodoInput from './TodoInput/TodoInput';

class Todos extends React.Component {
  state = {
    todos: [],
    activeTodos: [],
    completedTodos: [],
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
    const index = todos.map(todo => todo.id).indexOf(id);

    this.setState((prevState) => {
      delete todos[index];

      return todos;
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

    const filteredTodos = todos.filter(todo => !todo.completed);

    this.setState(prevState => ({
      completedTodos: [],
      todos: filteredTodos,
    }));
  }

  handleActiveFiltering = () => {
    const { todos } = this.state;

    const filteredActiveTodos = todos.filter(todo => !todo.completed);

    this.setState(prevState => ({
      activeTodos: filteredActiveTodos,
      isAll: false,
      isActive: true,
      isCompleted: false,
    }));
  }

  handleCompletedFiltering = () => {
    const { todos } = this.state;

    const filteredActiveTodos = todos.filter(todo => todo.completed);

    this.setState(prevState => ({
      completedTodos: filteredActiveTodos,
      isAll: false,
      isActive: false,
      isCompleted: true,
    }));
  }

  handleAllFiltering = () => {
    const { todos } = this.state;

    this.setState(prevState => ({
      todos,
      isAll: true,
      isActive: false,
      isCompleted: false,
    }));
  }

  render() {
    const {
      todos,
      isAll,
      isActive,
      isCompleted,
      activeTodos,
      completedTodos,
    } = this.state;

    let conditionalRenderingTodos = todos;

    if (!isAll && isActive && !isCompleted) {
      conditionalRenderingTodos = activeTodos;
    }

    if (!isAll && !isActive && isCompleted) {
      conditionalRenderingTodos = completedTodos;
    }

    let footer = null;

    if (todos.length !== 0) {
      footer = (
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
      );
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
            todos={conditionalRenderingTodos}
            isCompleted={this.handleToggleCompletion}
            deleteTodo={this.handleDeleteBtn}
          />

          {footer}

        </section>
      </>
    );
  }
}

export default Todos;
