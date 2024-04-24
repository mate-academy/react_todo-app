import { useContext } from 'react';
import { ReactContext } from '../../ReactContext';
import { Task } from '../../types/Task';
import cn from 'classnames';

export const Main = () => {
  const Context = useContext(ReactContext);

  const viewCheked = (viewTodo: Task) => {
    const updateTodo = Context.todos.map(todo => {
      if (todo.id === viewTodo.id) {
        return {
          ...todo,
          completed: !todo.completed,
        };
      }

      return todo;
    });

    Context.setTodoses(updateTodo);
  };

  const filterTodos = Context.todos.filter((todo: { completed: any }) => {
    switch (Context.filter) {
      case 'Completed':
        return todo.completed;
      case 'Active':
        return !todo.completed;
      case 'All':
        return true;
      default:
        return true;
    }
  });

  const deleteTask = (deleteTodo: Task) => {
    const filter = Context.todos.filter(todo => todo.id !== deleteTodo.id);

    Context.setTodoses(filter);
  };

  if (Context.firstTask) {
    return (
      <section className="todoapp__main" data-cy="TodoList">
        {filterTodos.map((todo: Task) => (
          <div
            data-cy="Todo"
            className={cn('todo', { completed: todo.completed })}
            key={todo.id}
          >
            <label className="todo__status-label">
              <input
                data-cy="TodoStatus"
                type="checkbox"
                className="todo__status"
                onClick={() => viewCheked(todo)}
              />
            </label>

            <span data-cy="TodoTitle" className="todo__title">
              {todo.title}
            </span>

            <button
              type="button"
              className="todo__remove"
              data-cy="TodoDelete"
              onClick={() => deleteTask(todo)}
            >
              ×
            </button>
          </div>
        ))}
      </section>
    );
  }

  return null;
};
