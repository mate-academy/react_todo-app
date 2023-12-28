import { useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { TodoItem } from '../TodoItem';

import { Context } from '../ContextProvider/ContextProvider';
import { Todo } from '../../types/Todo';

export const TodoList = () => {
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const { todos } = useContext(Context);

  const location = useLocation().pathname.slice(1);

  useEffect(() => {
    if (location === 'active') {
      setFilteredTodos(() => todos.filter((item) => !item.completed));
    } else if (location === 'completed') {
      setFilteredTodos(() => todos.filter((item) => item.completed));
    } else {
      setFilteredTodos(() => todos);
    }
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
