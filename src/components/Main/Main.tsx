import { useState } from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem/TodoItem';
import { fetchSend } from '../../api/fetchSend';

type Props = {
  listOfTodos: Todo[];
  setListOfTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  filterCriteria: string | undefined;
};

export const Main: React.FC<Props> = (
  {
    listOfTodos, setListOfTodos, filterCriteria,
  },
) => {
  const [fistTimeClickonCheckAll, setFistTimeClickonCheckAll] = useState(true);
  const checkAllHandler = () => {
    setListOfTodos(prev => [...prev].map(el => {
      const newObject = { ...el };

      newObject.completed = fistTimeClickonCheckAll;

      fetchSend('PATCH', newObject.title, newObject.completed, newObject.id)
        // eslint-disable-next-line no-console
        .catch(err => console.warn(err));

      return newObject;
    }));

    setFistTimeClickonCheckAll(prev => !prev);
  };

  return (
    <section className="main">
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        data-cy="toggleAll"
        onClick={() => {
          checkAllHandler();
        }}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>

      <ul className="todo-list" data-cy="todoList">
        {
          listOfTodos.length > 0 && (
            listOfTodos
              .filter(el => {
                switch (filterCriteria) {
                  case 'completed':
                    return el.completed;
                  case 'active':
                    return !el.completed;
                  default:
                    return true;
                }
              })
              .map(todo => {
                return (
                  <TodoItem
                    todo={todo}
                    key={todo.id}
                    listOfTodos={listOfTodos}
                    setListOfTodos={setListOfTodos}
                  />
                );
              })
          )
        }
      </ul>
    </section>
  );
};
