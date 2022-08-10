import { useState } from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem/TodoItem';

type Props = {
  listOfTodos: Todo[];
  setlistOfTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  filterCriteria: string | undefined;
};

export const Main: React.FC<Props>
= (
  {
    listOfTodos,
    setlistOfTodos,
    filterCriteria,
  },
) => {
  const [completedToggle, setCompletedToggle] = useState(true);

  const markAllasComplete = () => {
    setlistOfTodos(prev => [...prev].map(el => {
      const newElement = { ...el };

      if (completedToggle) {
        newElement.completed = true;
      } else {
        newElement.completed = false;
      }

      return newElement;
    }));

    setCompletedToggle(prev => !prev);
  };

  return (
    <section className="main">
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        data-cy="toggleAll"
        onClick={() => {
          markAllasComplete();
        }}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>

      <ul className="todo-list" data-cy="todoList">
        {
          listOfTodos
            .filter((el) => {
              if (filterCriteria === 'completed') {
                return el.completed;
              }

              if (filterCriteria === 'active') {
                return !el.completed;
              }

              return el;
            })
            .map(el => {
              return (
                <TodoItem
                  todo={el}
                  setlistOfTodos={setlistOfTodos}
                  key={el.id}
                />
              );
            })
        }
      </ul>
    </section>
  );
};
