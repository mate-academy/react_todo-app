import { FC } from 'react';
import { Todo } from '../types/Todo';
import { TodoItem } from './TodoItem';

type Props = {
  visibleTodos: Todo[],
  onRemoveTodo: (todo: Todo) => void
  onChangeStatusTodo: (todoId: number) => void,
  idTodoForChange: number[],
  setIdTodoForChange: React.Dispatch<React.SetStateAction<number[]>>
  onEditTodo: (todo: Todo) => void
};

export const TodoList: FC<Props> = ({
  visibleTodos,
  onRemoveTodo,
  onChangeStatusTodo,
  idTodoForChange,
  setIdTodoForChange,
  onEditTodo,
}) => {
  return (
    <>
      {visibleTodos.map((todo) => {
        if (idTodoForChange.includes(todo.id)) {
          return (
            <div className="todo" key={`todo-${todo.id}${+new Date()}`}>
              <label className="todo__status-label">
                <input type="checkbox" className="todo__status" />
              </label>
              <span
                className="todo__title"
              >
                {todo.title}
              </span>
              <button
                type="button"
                className="todo__remove"
              >
                ×
              </button>

              <div className="modal overlay is-active">
                <div className="modal-background has-background-white-ter" />
                <div className="loader" />
              </div>
            </div>
          );
        }

        return (
          <TodoItem
            todo={todo}
            onRemoveTodo={onRemoveTodo}
            onChangeStatusTodo={onChangeStatusTodo}
            setIdTodoForChange={setIdTodoForChange}
            onEditTodo={onEditTodo}
          />
        );
      })}
    </>
  );
};
