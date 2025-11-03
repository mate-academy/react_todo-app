import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from './TodoItem';

interface TodoListProps {
  todos: Todo[];
  processingIds: number[];
  getFilteredTodos: () => Todo[];
  handleToggleTodo: (todo: Todo) => void;
  handleRemoveTodo: (id: number) => void;
  handleRenameTodo: (id: number, newTitle: string) => Promise<void>;
  tempTodo?: Todo | null;
  isLoading: boolean;
}

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  processingIds,
  getFilteredTodos,
  handleToggleTodo,
  handleRemoveTodo,
  handleRenameTodo,
  tempTodo,
  isLoading,
}) => {
  const hasContent = todos.length > 0 || tempTodo;

  return (
    <div className="todoapp__content">
      {hasContent && (
        <section className="todoapp__main" data-cy="TodoList">
          {getFilteredTodos().map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              processingIds={processingIds}
              handleToggleTodo={handleToggleTodo}
              handleRemoveTodo={handleRemoveTodo}
              handleRenameTodo={handleRenameTodo}
            />
          ))}

          {tempTodo && (
            <TodoItem
              key={0}
              todo={tempTodo}
              processingIds={[...processingIds, 0]}
              handleToggleTodo={() => {}}
              handleRemoveTodo={() => {}}
              handleRenameTodo={async (id, newTitle) =>
                handleRenameTodo(id, newTitle)
              }
            />
          )}
        </section>
      )}

      {isLoading && (
        <div data-cy="TodosLoader" className="modal overlay is-active">
          <div className="modal-background has-background-white-ter" />
          <div className="loader" />
        </div>
      )}

      {!isLoading && !hasContent && <p>No todos yet! Add some tasks.</p>}
    </div>
  );
};
