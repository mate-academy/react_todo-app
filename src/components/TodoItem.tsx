import classNames from 'classnames';
import { useState } from 'react';
import { Todo } from '../App';

type Props = {
  todo: Todo,
  todos: Todo[],
  onSettingTodo: (totos: any) => void,
};

export const TodoItem: React.FC<Props> = ({ todo, todos, onSettingTodo }) => {
  const [isUpdating, updateTodo] = useState(false);

  const deleteHandler = () => {
    onSettingTodo(todos.filter(elem => elem.id !== todo.id));
  };

  const completeHandler = () => {
    onSettingTodo(todos.map(elem => {
      if (elem.id === todo.id) {
        return {
          ...elem,
          completed: !todo.completed,
        };
      }

      return elem;
    }));
  };

  return (
    <>
      {!isUpdating ? (
        <li key={todo.id} className={classNames({ completed: todo.completed })}>
          <div className="view">
            <input
              type="checkbox"
              className="toggle"
              id="toggle-view"
              onClick={completeHandler}
            />
            <label
              htmlFor="toggle-view1"
              onDoubleClick={() => updateTodo(true)}
            >
              {todo.title}
            </label>
            <button
              type="button"
              className="destroy"
              data-cy="deleteTodo"
              onClick={deleteHandler}
            />
          </div>
          <input type="text" className="edit" />
        </li>
      ) : (
        <li>
          <div className="view">
            <input type="checkbox" className="toggle" id="toggle-editing" />
            <label htmlFor="toggle-editing">{todo.title}</label>
            <button type="button" className="destroy" data-cy="deleteTodo" />
          </div>
          <input type="text" className="edit" />
        </li>
      )}
    </>
  );
};
