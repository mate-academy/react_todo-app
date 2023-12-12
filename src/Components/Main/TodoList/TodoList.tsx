import React, { useContext } from 'react';
import { TodosContext } from '../../../Context/TodosContext';
import { TodoItem } from '../TodoItem/TodoItem';

export const TodoList: React.FC = () => {
  const {
    todos,
  } = useContext(TodosContext);

  return (
    <ul className="todo-list" data-cy="todoList">
      {todos.map((todo) => (
        <TodoItem
          key={`${todo.id}`}
          todo={todo}
        />
      ))}

      {/*
        <li className="completed">
          <div className="view">
            <input type="checkbox" className="toggle" id="toggle-completed" />
            <label htmlFor="toggle-completed">qwertyuio</label>
            <button type="button" className="destroy" data-cy="deleteTodo" />
          </div>
          <input type="text" className="edit" />
        </li>

        <li className="editing">
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
        </li>
        */}
    </ul>
  );
};
