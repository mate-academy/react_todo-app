import React from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  visibleTodos: Todo[],
  onRemoveTodo: (todo: Todo, index: number) => void
  onEditTodo: (
    event: React.ChangeEvent<HTMLInputElement>,
    todoId: number
  ) => void,
  hasEditTodo: boolean,
  setHasEditTodo: React.Dispatch<React.SetStateAction<boolean>>,
  onUpdateTodo: (todo: Todo) => Promise<void>,
  onChangeStatusTodo: (todoId: number) => void,
  todoForUpdate: Todo | null,
  setTodoForUpdate: React.Dispatch<React.SetStateAction<Todo | null>>,
  idTodoForCheange: number[],
  onEscKey: any,
};

export const Main: React.FC<Props> = ({
  visibleTodos,
  onRemoveTodo,
  onEditTodo,
  hasEditTodo,
  setHasEditTodo,
  onUpdateTodo,
  onChangeStatusTodo,
  todoForUpdate,
  setTodoForUpdate,
  idTodoForCheange,
  onEscKey,
}) => {
  return (
    <section className="todoapp__main">
      {visibleTodos.map((todo, index) => {
        if (idTodoForCheange.includes(todo.id)) {
          return (
            <div className="todo" key={`todo-${todo.id}`}>
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
          <div
            className={cn(
              'todo',
              { completed: todo.completed },
            )}
            key={todo.id}
          >
            <label className="todo__status-label">
              <input
                type="checkbox"
                className="todo__status"
                onClick={() => (onChangeStatusTodo(todo.id))}
              />
            </label>

            {hasEditTodo && todoForUpdate?.id === todo.id
              ? (
                <>
                  <form onSubmit={(
                    event: React.FormEvent<HTMLFormElement>,
                  ) => {
                    event.preventDefault();
                    event.stopPropagation();

                    return onUpdateTodo(todo);
                  }}
                  >
                    <input
                      className="todo__title-field"
                      type="text"
                      value={todo.title}
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>,
                      ) => {
                        event.stopPropagation();
                        event.preventDefault();
                        onEditTodo(event, todo.id);
                      }}
                      onKeyDown={(event) => (onEscKey(event, todo))}
                    />
                  </form>
                </>
              ) : (
                <span
                  className="todo__title"
                  onDoubleClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    setTodoForUpdate(todo);
                    setHasEditTodo(true);
                  }}
                >
                  {todo.title}
                </span>
              )}
            <button
              type="button"
              className="todo__remove"
              onClick={() => onRemoveTodo(todo, index)}
            >
              ×
            </button>

            <div className="modal overlay">
              <div className="modal-background has-background-white-ter" />
              <div className="loader" />
            </div>
          </div>
        );
      })}
    </section>
  );
};
