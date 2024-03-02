/* eslint-disable import/no-cycle */
import { useContext, useEffect, useState } from 'react';
import { Todo } from '../types/TodoType';
import TodoItem from './TodoItem';
import { TodosContext } from '../App';

interface Props {
  todos: Todo[];
}

export const TodoList: React.FC<Props> = ({ todos }) => {
  const { dispatch } = useContext(TodosContext);
  const [hasTodos, setHasTodos] = useState<boolean>(false);
  const handleToggleAll = () => {
    const allToggled = todos.every(todo => todo.completed);

    dispatch({
      type: 'toggle-all-todo',
      payload: { completed: !allToggled },
    });
  };

  useEffect(() => {
    setHasTodos(todos.length !== 0);
  }, [todos]);

  return (
    <section className="main">
      {hasTodos && (
        <>
          <input
            type="checkbox"
            onClick={handleToggleAll}
            id="toggle-all"
            className="toggle-all"
            data-cy="toggleAll"
          />
          <label htmlFor="toggle-all">Mark all as complete</label>

          <ul className="todo-list" data-cy="todosList">
            {todos.map(todo => (
              <TodoItem hasTodos={hasTodos} todo={todo} dispatch={dispatch} />
            ))}
          </ul>
        </>
      )}
    </section>
  );
};
