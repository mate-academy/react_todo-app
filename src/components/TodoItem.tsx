import { useContext, useState } from 'react';
import ClassNames from 'classnames';

import { TodosContext } from './TodosContext';
import { TodoInput } from './TodoInput';
import { deleteTodos } from '../servises/deleteTodos';
import { Todo } from '../types/Todo';

type Props = {
  todo: Todo,
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { todos, setTodos } = useContext(TodosContext);
  const [isEditActive, setIsEditActive] = useState(false);

  const handleCheck = (todoId: number) => {
    setTodos(todos.map(item => {
      return item.id === todoId
        ? { ...item, completed: !item.completed }
        : item;
    }));
  };

  return (
    <li className={ClassNames('view',
      { completed: todo.completed },
      { editing: isEditActive })}
    >

      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id="toggle-view"
          checked={todo.completed}
          onClick={() => handleCheck(todo.id)}
        />

        <label
          onDoubleClick={() => setIsEditActive(true)}
        >
          {todo.title}
        </label>

        <button
          type="button"
          aria-label="destroy"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => deleteTodos(todo.id, todos, setTodos)}
        />

      </div>
      {isEditActive && (
        <TodoInput
          isEdit={isEditActive}
          onEdit={setIsEditActive}
          currentId={todo.id}
          currentTitle={todo.title}
        />
      )}
    </li>
  );
};
