import React, { useContext, useMemo } from 'react';
import { Filter } from '../types/Filter';
import { Todo } from '../types/Todo';
import { TodoItem } from './TodoItem';
import { TodosContext } from '../todosContext';

interface Props {
  filter: Filter;
  handleCompletedChange: (id: number) => void;
  deleteTodo: (id: number) => void;
  renamingTodo: (todo: Todo) => void;
  isSelected: Todo | null;
  handleUpdate: (
    e: React.KeyboardEvent<HTMLInputElement> | null,
    todo: Todo,
  ) => void;
}

export const TodoList: React.FC<Props> = ({
  filter,
  handleCompletedChange,
  deleteTodo,
  renamingTodo,
  isSelected,
  handleUpdate,
}) => {
  const { todos } = useContext(TodosContext);

  const visibleTodos = useMemo(() => {
    return todos.filter(todo => {
      switch (filter) {
        case Filter.Active:
          return !todo.completed;

        case Filter.Completed:
          return todo.completed;

        default:
          return true;
      }
    });
  }, [todos, filter]);

  const todosToShow = visibleTodos;

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todosToShow.map(todo => (
        <TodoItem
          key={todo.id || 'temp'}
          todo={todo}
          handleCompletedChange={handleCompletedChange}
          deleteTodo={deleteTodo}
          renamingTodo={renamingTodo}
          isSelected={isSelected}
          handleUpdate={handleUpdate}
        />
      ))}
    </section>
  );
};
