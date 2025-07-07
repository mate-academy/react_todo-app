/* eslint-disable jsx-a11y/label-has-associated-control */
import classNames from 'classnames';
import { Todo } from '../types/Todo';
import { TodoItem } from './TodoItem';
import { useGlobalState } from '../hooks/useGlobal';

type TodoListProps = {
  handleCheckTodo: (id: number) => void;
  removeTodo: (todo: Todo) => void;
  handleUpdateTodo: (id: number, data: Omit<Todo, 'id' | 'userId'>) => void;
};

export const TodoList: React.FC<TodoListProps> = ({
  handleCheckTodo,
  removeTodo,
  handleUpdateTodo,
}) => {
  const { todos, visibleTodos, tempTodo } = useGlobalState();

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {visibleTodos.map(todo => (
        <TodoItem
          todo={todo}
          key={todo.id}
          removeTodo={removeTodo}
          handleUpdateTodo={handleUpdateTodo}
        />
      ))}
      {tempTodo &&
        (() => {
          const { id, title, completed } = tempTodo;

          return (
            <div
              data-cy="Todo"
              className={classNames(
                'todo',
                { completed },
                { hidden: !todos.length },
              )}
              key={id}
            >
              <label className="todo__status-label" htmlFor={`temp-${id}`}>
                <input
                  id={`temp-${id}`}
                  data-cy="TodoStatus"
                  type="checkbox"
                  className="todo__status"
                  checked={completed}
                  onChange={() => {
                    handleCheckTodo(id);
                  }}
                />
              </label>

              <span data-cy="TodoTitle" className="todo__title">
                {title}
              </span>

              <button
                type="button"
                className="todo__remove"
                data-cy="TodoDelete"
              >
                ×
              </button>

              <div data-cy="TodoLoader" className="modal overlay is-active">
                <div className="modal-background has-background-white-ter" />
                <div className="loader" />
              </div>
            </div>
          );
        })()}
    </section>
  );
};
