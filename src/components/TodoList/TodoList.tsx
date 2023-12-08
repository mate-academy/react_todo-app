import React, {} from 'react';

import './TodoList.scss';
import TodoItem from '../TodoItem';

const TodoList: React.FC = () => {
  const todos = [
    { id: '1', title: 'Task 1', completed: false },
    { id: '2', title: 'Task 2', completed: true },
    { id: '3', title: 'Task 3', completed: true },
    { id: '4', title: 'Task 4', completed: true },
    { id: '5', title: 'Task 5', completed: false },
    { id: '6', title: 'Task 6', completed: false },
  ]/* useContext(todosContext) */;

  return (
    <ul className="todo-list" data-cy="todoList">
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}

      {/* <li className="editing">
        <div className="view">
          <input type="checkbox" className="toggle" id="toggle-editing" />
          <label htmlFor="toggle-editing">zxcvbnm</label>
          <button type="button" className="destroy" data-cy="deleteTodo" />
        </div>

        <input type="text" className="edit" />
      </li>

      <li>
        <div className="view">
          <input type="checkbox" className="toggle" id="toggle-view2" />
          <label htmlFor="toggle-view2">1234567890</label>
          <button type="button" className="destroy" data-cy="deleteTodo" />
        </div>

        <input type="text" className="edit" />
      </li> */}
    </ul>
  );
};

export default TodoList;
