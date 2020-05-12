import React from 'react';
import TodosContainer from './TodosContainer/TodosContainer';
import Footer from './Footer/Footer';
import TodoInput from './TodoInput/TodoInput';

class Todos extends React.Component {
  state = {
    todos: [],
    allCompleted: false,
    showTodos: 'all',
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

    const makeAllCompleted = () => {
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

    const makeAllActive = () => {
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

    !allCompleted ? makeAllCompleted() : makeAllActive();
  }

  handleDeleteAllCompleted = () => {
    const { todos } = this.state;

    this.setState({
      todos: todos.filter(todo => todo.completed === false),
    });
  }

  handleShowTodosFiltering = (status) => {
    if (status === 'all') {
      this.setState({
        showTodos: 'all',
      });
    } else if (status === 'active') {
      this.setState({
        showTodos: 'active',
      });
    } else if (status === 'completed') {
      this.setState({
        showTodos: 'completed',
      });
    }
  }

  render() {
    const {
      todos,
      showTodos,
    } = this.state;

    let visibleTodos;

    if (showTodos === 'all') {
      visibleTodos = [...todos];
    } else if (showTodos === 'active') {
      visibleTodos = todos.filter(todo => todo.completed === false);
    } else if (showTodos === 'completed') {
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
              showTodos={showTodos}
              showTodoStatus={this.handleShowTodosFiltering}
              deleteAllCompleted={this.handleDeleteAllCompleted}
            />
          )}

        </section>
      </>
    );
  }
}

export default Todos;
