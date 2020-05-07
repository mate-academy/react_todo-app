import React from 'react';
import TodoList from './TodoList';
import Footer from './Footer';

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
      isFilterAll,
      isFilterActive,
      isFilterCompleted,
      clearCompletedTodos,
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
          isFilterAll={isFilterAll}
          isFilterActive={isFilterActive}
          isFilterCompleted={isFilterCompleted}
          clearCompletedTodos={clearCompletedTodos}
        />
      </section>
    );
  }
}

export default TodoApp;
