import React from 'react';
import { useTodoContext } from '../hooks/useTodoContext';
import { TodoStatus } from '../types/Todo';
import TodoItem from './TodoItem';

const TodoList: React.FC = () => {
  const { todos, selectedStatus } = useTodoContext();

  return (
    <ul className="todo-list" data-cy="todoList">
      {todos
        .filter((todo) => {
          switch (selectedStatus) {
            case TodoStatus.Active:
              return !todo.completed;
            case TodoStatus.Completed:
              return todo.completed;
            default:
              return todo;
          }
        })
        .map(todo => (
          <TodoItem todo={todo} key={todo.id} />
        ))}
      {/* <li className="editing">
        <div className="view">
          <input type="checkbox" className="toggle" id="toggle-editing" />
          <label htmlFor="toggle-editing">zxcvbnm</label>
          <button type="button" className="destroy" data-cy="deleteTodo" />
        </div>
        <input type="text" className="edit" />
      </li> */}
    </ul>
  );
};

export default TodoList;
