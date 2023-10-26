import React, { useState, useContext, useEffect } from 'react';
import { TodosContext } from '../TodosContext/TodosContext';
import { TodoList } from '../TodoList/TodoList';
import { TodosFilter } from '../TodosFilter/TodosFilter';
import { Todo } from '../../types/Todo';
import { Status } from '../../data/enums';
import { TodoHeader } from '../TodoHeader/TodoHeader';

export const TodoApp: React.FC = () => {
  const [filter, setFilter] = useState(Status.All);
  const [completeAllTodos, setCompleteAllTodos] = useState(false);
  const { todos, setTodos } = useContext(TodosContext);

  const filterTodos = (currentTodos: Todo[], filterType: Status) => {
    let filteredTodos = [...currentTodos];

    if (filterType !== Status.All) {
      if (filterType === Status.Active) {
        filteredTodos = filteredTodos.filter(item => !item.completed);
      } else {
        filteredTodos = filteredTodos.filter(item => item.completed);
      }
    }

    return filteredTodos;
  };

  useEffect(() => {
    const updatedTodos = todos.map(item => {
      return { ...item, completed: completeAllTodos };
    });

    setTodos(updatedTodos);
  }, [completeAllTodos]);

  const filteredTodos = filterTodos(todos, filter);

  return (
    <>
      <TodoHeader />

      {todos.length !== 0
        && (
          <>
            <section className="main">
              <input
                type="checkbox"
                id="toggle-all"
                className="toggle-all"
                data-cy="toggleAll"
                onClick={() => setCompleteAllTodos(!completeAllTodos)}
              />
              <label htmlFor="toggle-all">Mark all as complete</label>

              <TodoList items={filteredTodos} />
            </section>

            <TodosFilter
              currentAppliedFilter={filter}
              onFilterChange={setFilter}
            />
          </>
        )}
    </>
  );
};
