import { useContext } from 'react';
import { Todo } from '../types/TodoType';
import TodoItem from './TodoItem';
import { TodosContext } from '../Context/TodosProvider';

interface Props {
  todos: Todo[];
}

export const TodoList: React.FC<Props> = ({ todos }) => {
  const { dispatch } = useContext(TodosContext);
  const handleToggleAll = () => {
    const allToggled = todos.every(todo => todo.completed);

    dispatch({
      type: 'toggle-all-todo',
      payload: { completed: !allToggled },
    });
  };

  return (
    <section className="main">
      {todos.length > 0 && (
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
              <TodoItem
                key={todo.id.toString()}
                todo={todo}
                dispatch={dispatch}
              />
            ))}
          </ul>
        </>
      )}
    </section>
  );
};
