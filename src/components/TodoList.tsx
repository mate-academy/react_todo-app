import React, { useContext, useMemo } from 'react';
import { Filter } from '../types/Filter';
import { Todo } from '../types/Todo';
import { TodoItem } from './TodoItem';
import { TodosContext } from '../todosContext';

interface Props {
  filter: Filter;
  handleCompletedChange: (id: number) => void;
  tempTodo: Todo | null;
  deleteTodo: (id: number) => void;
  deletedIds: number[];
  renamingTodo: (todo: Todo) => void;
  isSelected: Todo | null;
  handleUpdate: (
    e: React.KeyboardEvent<HTMLInputElement> | null,
    todo: Todo,
  ) => void;
  updatingIds: number[];
}

export const TodoList: React.FC<Props> = ({
  filter,
  handleCompletedChange,
  tempTodo,
  deleteTodo,
  deletedIds,
  renamingTodo,
  isSelected,
  handleUpdate,
  updatingIds,
}) => {
  const { todos } = useContext(TodosContext);

  const visibleTodos = useMemo(() => {
    return todos.filter(todo => {
      if (updatingIds.includes(todo.id)) {
        return true;
      }

      switch (filter) {
        case Filter.Active:
          return !todo.completed;

        case Filter.Completed:
          return todo.completed;

        default:
          return true;
      }
    });
  }, [todos, filter, updatingIds]);

  const todosToShow = tempTodo ? [...visibleTodos, tempTodo] : visibleTodos;

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todosToShow.map(todo => (
        <TodoItem
          key={todo.id || 'temp'}
          todo={todo}
          handleCompletedChange={tempTodo ? () => {} : handleCompletedChange}
          deleteTodo={tempTodo ? () => {} : deleteTodo}
          renamingTodo={tempTodo ? () => {} : renamingTodo}
          isSelected={isSelected}
          handleUpdate={handleUpdate}
          loading={
            todo.id === 0 ||
            deletedIds.includes(todo.id) ||
            updatingIds.includes(todo.id)
          }
        />
      ))}
    </section>
  );
};
