import { useContext, useEffect, useState } from 'react';
import { patchTodo } from '../../api/todos';
import { Error } from '../../types/Error';
import { AppContext } from '../AppContext/AppContext';
import { TodoList } from '../TodoList';

export const TodoApp = () => {
  const [isActiveToggleAll, setIsActiveToggleAll] = useState(false);
  const todoData = useContext(AppContext);
  const todos = todoData?.todos || [];

  const isAllTodosCompleted = () => {
    for (let i = 0; i < todos.length; i += 1) {
      if (!todos[i].completed) {
        return false;
      }
    }

    return true;
  };

  const toggleAllTodos = () => {
    const todosList = [...todos];
    let countCompleted = 0;

    const patchAllToggledTodos = (index: number, isCompleted: boolean) => {
      return patchTodo(todos[index].id, { completed: isCompleted })
        .then(() => {
          todosList[index].completed = isCompleted;

          return todosList[index];
        })
        .catch(() => {
          todoData?.setIsError(Error.Update);
        });
    };

    let promises = todos.map((todo, index) => {
      if (!todo.completed) {
        return patchAllToggledTodos(index, true);
      }

      countCompleted += 1;

      return [];
    });

    if (countCompleted === todos.length) {
      promises = todos.map((_, index) => {
        return patchAllToggledTodos(index, false);
      });
    }

    Promise.all(promises)
      .then(() => {
        todoData?.setTodos(todosList);
      });
  };

  useEffect(() => {
    setIsActiveToggleAll(isAllTodosCompleted());
  }, [todos]);

  return (
    <section className="main">
      <input
        checked={isActiveToggleAll}
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        data-cy="toggleAll"
        onClick={() => toggleAllTodos()}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>
      <TodoList />
    </section>
  );
};
