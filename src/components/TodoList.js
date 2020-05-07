import React from 'react';
import TodoItem from './TodoItem';

class TodoList extends React.Component {
  сalltoggleAllStatus = () => {
    this.props.toggleAllStatus();
  };

  render() {
    const {
      todos,
      changeCompleted,
      deleteTodo,
      changeTitle,
      toggleTodosStatus,
    } = this.props;

    return (
      <section className="main">
        <input
          type="checkbox"
          id="toggle-all"
          className="toggle-all"
          checked={toggleTodosStatus}
          onChange={this.сalltoggleAllStatus}
        />
        <label htmlFor="toggle-all">Mark all as complete</label>

        <ul className="todo-list">
          {(todos.length === 0) || todos.map((todo, index, todosArr) => (
            <TodoItem
              key={todo.id}
              title={todo.title}
              id={todo.id}
              completed={todo.completed}
              index={index}
              todos={todosArr}
              changeCompleted={changeCompleted}
              deleteTodo={deleteTodo}
              changeTitle={changeTitle}
            />
          ))}
        </ul>
      </section>
    );
  }
}

export default TodoList;
