import { Filter } from '../../types/Filter';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem';

type Props = {
  todos: Todo[];
  filter: Filter;
  onToggleTodo: (id: string) => void;
  onDeleteTodo: (id: string) => void;
  onToggleAll: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setAllTodos: (todos: Todo[]) => void;
};

export const TodoList: React.FC<Props> = ({
  todos,
  filter,
  onToggleTodo,
  onDeleteTodo,
  onToggleAll,
  setAllTodos,
}) => {
  const filteredTodos = todos.filter(todo => {
    if (filter === Filter.Active) {
      return !todo.completed;
    }

    if (filter === Filter.Completed) {
      return todo.completed;
    }

    return true;
  });

  const renameTodo = (todoId: string, updatedTitle: string) => {
    setAllTodos(
      filteredTodos.map(item => (
        item.id === todoId
          ? { ...item, title: updatedTitle }
          : item
      )),
    );
  };

  const areAllCompleted = todos.every(todo => todo.completed);

  return (
    <section className="main">
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        checked={areAllCompleted}
        onChange={onToggleAll}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>

      <ul className="todo-list" data-cy="todoList">
        {filteredTodos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggleTodo={onToggleTodo}
            onDeleteTodo={onDeleteTodo}
            onRenameTodo={renameTodo}
          />
        ))}
      </ul>
    </section>
  );
};
