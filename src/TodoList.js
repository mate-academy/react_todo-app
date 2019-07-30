import React from 'react';
import TodoItem from './TodoItem';

class TodoList extends React.Component {
  render() {
    const { todos, handleChange, destroyItem } = this.props;

    return (
      <ul className="todo-list">
        {todos.map(todo => (
          <li
            className={todo.completed === true ? 'completed' : ''}
            key={todo.id}
          >
            <TodoItem
              todo={todo}
              handleChangeItem={handleChange}
              handleDestroyItem={destroyItem}
            />
          </li>
        ))}
      </ul>
    );
  }
}

export default TodoList;
