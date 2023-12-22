import { useMemo } from 'react';
import { TodosList } from './TodosList/TodosList';
import { TodosFooter } from './TodosFooter/TodosFooter';
import { TodosHeader } from './TodosHeader/TodosHeader';
import { Status, useSelector } from '../../contexts/TodosContext';

export const Todos = () => {
  const { todos, filter } = useSelector();

  const filteredTodos = useMemo(() => {
    if (filter === Status.ALL) {
      return todos;
    }

    return todos.filter(todo => {
      switch (filter) {
        case Status.COMPLETED:
          return todo.completed;

        case Status.ACTIVE:
          return !todo.completed;

        default:
          return true;
      }
    });
  }, [todos, filter]);

  return (
    <div className="todoapp">
      <TodosHeader />
      {todos.length !== 0 && (
        <>
          <TodosList todos={filteredTodos} />
          <TodosFooter />
        </>
      )}
    </div>
  );
};
