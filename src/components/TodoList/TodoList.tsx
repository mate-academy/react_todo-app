import { useContext } from 'react';
import { TodosContext } from '../../context/TodosContext';

import { TodoItem } from '../TodoItem/TodoItem';
import { Todo } from '../../types/Todo';

export const TodoList = () => {
  const {
    todos,
    setTodo,
    renderTodo,
  } = useContext(TodosContext);

  const handleCheckboxClickAll = () => {
    const allCompleted = todos.every((todo) => todo.completed);

    const newTodo: Todo[] = todos.map((todo) => ({
      ...todo,
      completed: !allCompleted,
    }));

    setTodo([...newTodo]);
    // setRenderTodo([...newTodo]);
  };

  return (
    <section className="main">
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        data-cy="toggleAll"
        onChange={handleCheckboxClickAll}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>

      <ul className="todo-list" data-cy="todosList">
        {renderTodo.map(todo => (
          <TodoItem todoProps={todo} key={todo.id} />
        ))}
      </ul>
    </section>
  );
};
