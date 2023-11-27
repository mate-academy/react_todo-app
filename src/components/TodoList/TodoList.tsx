import React, { useContext } from 'react';
import { StateContext } from '../../Store';
import { TodoItem } from '../TodoItem';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = React.memo(({ todos }) => {
  const { filter } = useContext(StateContext);
  const filterTodos = (todosToFilter: Todo[]) => {
    switch (filter.title) {
      case 'All':
      default:
        return todosToFilter;

      case 'Active':
        return todosToFilter.filter(todo => !todo.completed);

      case 'Completed':
        return todosToFilter.filter(todo => todo.completed);
    }
  };

  const filteredTodos = filterTodos(todos);

  return (
    <>
      {todos.length > 0 && (
        <ul className="todo-list" data-cy="todosList">
          {filteredTodos.map(todo => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </ul>
      )}
    </>

  );
});
