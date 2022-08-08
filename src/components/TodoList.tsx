import { Todo } from '../Types/Todo';
import { TodoItem } from './TodoItem';

type Props = {
  todos: Todo[],
  deleteTodo: (todoId: number) => void,
  setTodoCompleted: (todoId: number) => void,
  updateTodo: (todoId: number, title: string) => void,
  toggleAll: () => void,
};

export const TodoList: React.FC<Props> = ({
  todos,
  deleteTodo,
  setTodoCompleted,
  updateTodo,
  toggleAll,
}) => {
  return (
    <section className="main">
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        data-cy="toggleAll"
        checked={todos.every(todo => todo.completed)}
        onClick={toggleAll}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>

      <ul className="todo-list" data-cy="todoList">

        {todos.map(todo => (
          <TodoItem
            todo={todo}
            key={todo.id}
            deleteTodo={deleteTodo}
            setTodoCompleted={setTodoCompleted}
            updateTodo={updateTodo}
          />
        ))}

      </ul>
    </section>
  );
};
