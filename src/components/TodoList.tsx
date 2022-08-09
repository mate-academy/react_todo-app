import { getTodos, toggleTodoStatus } from '../api/todos';
import { Todo } from '../types/Todo';
import { TodoItem } from './TodoItem';

type Props = {
  todos: Todo[];
  setTodos: (value: Todo[]) => void;
  itemsLeft: number;
};

export const TodoList: React.FC<Props> = ({ todos, setTodos, itemsLeft }) => {
  const handleToggleAll = async () => {
    if (itemsLeft === 0 || itemsLeft === todos.length) {
      await Promise.all(todos.map(todo => (
        toggleTodoStatus(todo.id, !todo.completed)
      )));
    }

    if (itemsLeft < todos.length) {
      await Promise.all(todos.filter(todo => !todo.completed)
        .map(newTodo => toggleTodoStatus(newTodo.id, !newTodo.completed)));
    }

    getTodos().then(setTodos);
  };

  return (
    <section className="main">
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        data-cy="toggleAll"
        checked={itemsLeft === 0}
        onChange={handleToggleAll}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>

      <ul className="todo-list" data-cy="todoList">
        {todos.map(todo => (
          <TodoItem todo={todo} key={todo.id} setTodos={setTodos} />
        ))}
      </ul>

    </section>
  );
};
