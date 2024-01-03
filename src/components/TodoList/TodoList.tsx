import { useContext, useMemo } from 'react';
import { useLocation } from 'react-router-dom';

import { TodoItem } from '../TodoItem';

import { Context } from '../ContextProvider/ContextProvider';
import { Todo } from '../../types/Todo';

export const TodoList = () => {
  const { todos } = useContext(Context);

  const location = useLocation().pathname.slice(1);

  const filteredTodos = useMemo(() => {
    if (location === 'active') {
      return todos.filter((item) => !item.completed);
    }

    if (location === 'completed') {
      return todos.filter((item) => item.completed);
    }

    return todos;
  }, [location, todos]);

  return (
    <ul className="todo-list" data-cy="todosList">
      {filteredTodos.map((todo: Todo) => {
        return (
          <TodoItem todo={todo} key={todo.id} />
        );
      })}
    </ul>
  );
};
