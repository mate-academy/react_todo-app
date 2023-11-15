import { useContext } from 'react';
import { TodosContext } from '../../context/TodosContext';
import { Todo } from '../../types/todo';
import { TodoList } from '../TodoList';

type Props = {

};

export const Main: React.FC<Props> = () => {
  const { todos, setTodos } = useContext(TodosContext);

  const markAllPressed = (todosList: Todo[]) => {
    if (todosList.find(todo => todo.completed === false)) {
      const newTodos: Todo[] = todosList.map(todo => ({
        id: todo.id,
        title: todo.title,
        completed: true,
      }));

      setTodos(newTodos);
    } else {
      const newTodos: Todo[] = todosList.map(todo => ({
        id: todo.id,
        title: todo.title,
        completed: false,
      }));

      setTodos(newTodos);
    }
  };

  return (
    <section className="main">
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        data-cy="toggleAll"
        checked={!todos.find(todo => !todo.completed)}
        onChange={() => markAllPressed(todos)}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>

      <TodoList items={todos} />

    </section>
  );
};
