import React, { useContext } from 'react';
import { StateContext } from '../../Store';
import { TodoItem } from '../TodoItem';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = React.memo(({ todos }) => {
  const { filter } = useContext(StateContext);

  const isDisplayed = (todo: Todo) => {
    switch (filter.title) {
      case 'All':
      default:
        return true;

      case 'Active':
        return !todo.completed;

      case 'Completed':
        return todo.completed;
    }
  };

  return (
    <>
      {!!todos.length && (
        <ul className="todo-list" data-cy="todosList">
          {todos.map(todo => isDisplayed(todo) && (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </ul>
      )}
    </>

  );
});
