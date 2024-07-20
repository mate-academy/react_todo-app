// type Props = {};

import { useMemo } from 'react';
import { useAppContextContainer } from '../../context/AppContext';
import TodoListInfo from './TodoListInfo';
import { SortType } from '../../enums/SortType';

const TodoList = () => {
  const { sortType, todos } = useAppContextContainer();

  const filterType = useMemo(() => {
    if (sortType === SortType.ACTIVE) {
      return todos.filter(el => !el.completed);
    }

    if (sortType === SortType.COMPLETED) {
      return todos.filter(el => el.completed);
    }

    return todos;
  }, [todos, sortType]);

  return (
    <main className="todoapp__main" data-cy="TodoList">
      {filterType.map(todo => (
        <TodoListInfo key={todo.id} todo={todo} />
      ))}
    </main>
  );
};

export default TodoList;
