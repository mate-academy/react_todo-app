import React from 'react';
import PropTypes from 'prop-types';
import TodoList from './TodoList';
import Footer from './Footer';
import { todosPropTypes } from './propTypes';

class TodoApp extends React.Component {
  state = {
    id: 0,
    title: '',
    completed: false,
  };

  changeTitle = event => (
    this.setState({
      title: event.target.value,
    })
  );

  submitTodo = (event) => {
    if (event.key === 'Enter') {
      if (this.state.title.length === 0) {
        return;
      }

      this.props.addedTodo(
        {
          id: this.state.id,
          title: this.state.title,
          completed: this.state.completed,
        },
      );

      this.setState(state => ({
        title: '',
        id: state.id + 1,
      }
      ));

      this.props.toggleAllTodos();
    }
  };

  render() {
    const { title } = this.state;
    const {
      todos,
      changeCompleted,
      deleteTodo,
      changeTitle,
      toggleAllStatus,
      toggleAllTodos,
      toggleTodosStatus,
      filterTodo,
      countActive,
      clearCompletedTodos,
      filter,
    } = this.props;

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>

          <input
            value={title}
            className="new-todo"
            placeholder="What needs to be done?"
            onChange={this.changeTitle}
            onKeyDown={this.submitTodo}
          />
        </header>

        <TodoList
          todos={todos}
          changeCompleted={changeCompleted}
          deleteTodo={deleteTodo}
          changeTitle={changeTitle}
          toggleTodosStatus={toggleTodosStatus}
          toggleAllTodos={toggleAllTodos}
          toggleAllStatus={toggleAllStatus}
        />
        <Footer
          filterTodo={filterTodo}
          countActive={countActive}
          clearCompletedTodos={clearCompletedTodos}
          filter={filter}
        />
      </section>
    );
  }
}

TodoApp.propTypes = {
  addedTodo: PropTypes.func.isRequired,
  toggleAllTodos: PropTypes.func.isRequired,
  todos: todosPropTypes.isRequired,
  changeCompleted: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  changeTitle: PropTypes.func.isRequired,
  toggleAllStatus: PropTypes.func.isRequired,
  toggleTodosStatus: PropTypes.bool.isRequired,
  filterTodo: PropTypes.func.isRequired,
  countActive: PropTypes.number.isRequired,
  clearCompletedTodos: PropTypes.func.isRequired,
};

export default TodoApp;
