import { useContext } from 'react';
// import classNames from 'classnames';
import './main.css';

import { TodosContext } from '../../context/TodosContext';
import { Todo } from '../../types/Todo';
import { TodoList } from '../todoList';

export const Main: React.FC = () => {
  const { todos, setTodos } = useContext(TodosContext);

  const checked = todos.every((todo: Todo) => todo.completed);

  const completedTodos = (todosItems: Todo[]) => {
    return todosItems.filter(item => !item.completed).length === 0;
  };

  const toogleTodosList = (currentTodos: Todo[]) => {
    if (completedTodos(todos)) {
      return currentTodos.map((todo) => ({
        ...todo,
        completed: false,
      }));
    }

    return currentTodos.map((todo) => ({
      ...todo,
      completed: true,
    }));
  };

  const handleOnChange = () => {
    setTodos(toogleTodosList(todos));
  };

  return (
    <section className="main">
      <input
        type="checkbox"
        id="toggle-all"
        checked={checked}
        onChange={handleOnChange}
        className="toggle-all"
        data-cy="toggleAll"
      />
      <label htmlFor="toggle-all">Mark all as complete</label>

      <TodoList items={todos} />
    </section>
  );
};
