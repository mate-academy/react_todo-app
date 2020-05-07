import React from 'react';
import TodoList from './TodoList';

class TodoApp extends React.PureComponent {
  state = {
    todoList: [],
  }

  render() {
    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
        </header>
        <TodoList todoList={this.state.todoList} />
      </section>
    );
  }
}

export default TodoApp;
