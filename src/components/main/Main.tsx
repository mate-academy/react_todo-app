import { useContext } from 'react';
import './main.css';

import { TodosContext } from '../../context/TodosContext';
import { Todo } from '../../types/Todo';
import { TodoList } from '../todoList';
import { filteredTodos } from '../../services/filterTodos';

export const Main: React.FC = () => {
  const { todos, setTodos, filterTodos } = useContext(TodosContext);

  const checked = todos.every((todo: Todo) => todo.completed);

  const completedTodos = (todosItems: Todo[]) => {
    return !todosItems.filter(item => !item.completed).length;
  };

  const checkTodos = (current: Todo[], isComplited: boolean) => {
    return current.map((todo) => ({
      ...todo,
      completed: isComplited,
    }));
  };

  const toogleTodosList = (currentTodos: Todo[]) => {
    if (completedTodos(todos)) {
      return checkTodos(currentTodos, false);
    }

    return checkTodos(currentTodos, true);
  };

  const handleOnChange = () => {
    setTodos(toogleTodosList(todos));
  };

  const filteredItems = filteredTodos(todos, filterTodos);

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

      <TodoList items={filteredItems} />
    </section>
  );
};
