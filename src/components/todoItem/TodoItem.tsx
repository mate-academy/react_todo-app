import { useContext } from 'react';
import classNames from 'classnames';
import { TodoUpdateContext, TodosContext } from '../../context/TodosContext';
import { Todo } from '../../types/Todo';

interface Props {
  todoItem: Todo,
}

export const TodoItem: React.FC<Props> = ({ todoItem }) => {
  const { id, title, completed } = todoItem;
  const { todos, setTodos } = useContext(TodosContext);
  const { deleteTodo } = useContext(TodoUpdateContext);

  const handleOnChange = () => setTodos(todos.map((todo: Todo) => (
    todo.id === id
      ? {
        ...todo,
        completed: !completed,
      }
      : todo
  )));

  return (
    <li className={classNames({ completed })}>
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          checked={completed}
          onChange={handleOnChange}
        />
        <label>
          {title}
        </label>
        <button
          aria-label="toggle-view"
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => deleteTodo(id)}
        />
      </div>

      <input type="text" className="edit" />
    </li>
  );
};
