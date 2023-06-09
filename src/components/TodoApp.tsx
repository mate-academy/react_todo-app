import { useState, useMemo, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { TodoAppHeader } from './TodoAppComponent/TodoAppHeader/TodoAppHeader';
import { TodoList } from './TodoAppComponent/TodoAppMain/TodoList';
import { useTodosContext } from '../Context/TodosContext';
import { Filters } from '../types/Filters';
import { TodoAppFooter } from './TodoAppComponent/TodoAppFooter/TodoAppFooter';
import { TodosError } from './TodoErrors';

export const TodoApp = () => {
  const [filtered, setFiltered] = useState<Filters>(Filters.All);
  const { todos } = useTodosContext();
  const { filter } = useParams();

  useEffect(() => {
    let filterParam;

    switch (filter) {
      case 'active': filterParam = Filters.Active;
        break;
      case 'completed': filterParam = Filters.Completed;
        break;
      case '': filterParam = Filters.All;
        break;
      default: throw new Error('Not Such Filter');
    }

    setFiltered(filterParam);
  }, [filtered]);

  const filteredTodos = useMemo(() => {
    let newTodos = todos;

    switch (filtered) {
      case 'Active':
        newTodos = newTodos.filter(todo => !todo.completed);
        break;
      case 'Completed':
        newTodos = newTodos.filter(todo => todo.completed);
        break;
      case 'All':
        newTodos = todos;
        break;
      default: throw new Error('wrong filters');
    }

    return newTodos;
  }, [todos]);

  const isFooter = todos.length > 0;

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>
      <div className="todoapp__content">
        <TodoAppHeader />

        <TodoList filteredTodos={filteredTodos} />

        {isFooter && (
          <TodoAppFooter
            filtered={filtered}
            setFiltered={setFiltered}
          />
        )}
      </div>
      <TodosError />
    </div>
  );
};
