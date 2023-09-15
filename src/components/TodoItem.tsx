import { useTodosContext } from '../context/TodosContext';
import { TodoItemProps } from '../types/todoTypes';

export function TodoItem({ todo }: TodoItemProps) {
  const { toggleTodo, removeTodo } = useTodosContext();

  const handleToggle: React.ChangeEventHandler<HTMLInputElement> = () => {
    toggleTodo(todo.id);
  };

  const handleRemove: React.MouseEventHandler<HTMLButtonElement> = () => {
    removeTodo(todo.id);
  };

  return (
    <li key={todo.id} className={todo.completed ? 'completed' : ''}>
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id={`toggle-${todo.id}`}
          onChange={handleToggle}
          checked={todo.completed}
        />
        <label htmlFor={`toggle-${todo.id}`}>{todo.title}</label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={handleRemove}
        />
      </div>
      <input type="text" className="edit" />
    </li>
  );
}
