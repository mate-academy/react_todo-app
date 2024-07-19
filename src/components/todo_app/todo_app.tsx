import { useContext, useState } from 'react';
import { HeaderTodo } from '../header/todo_header';
import { TodoList } from '../todoList/todo_list';
import { MethodsContext, TodoContext } from '../../TodoContext';
import { FilterStatus } from '../types';
import classNames from 'classnames';

export const TodoApp: React.FC = () => {
  const [status, setStatus] = useState(FilterStatus.All);

  const { todo } = useContext(TodoContext);
  const method = useContext(MethodsContext);

  const itemsLeft = todo.filter(todoItem => !todoItem.completed).length;

  const activeTodos = todo.filter(todoItem => !todoItem.completed);
  const filteredTodos = todo.filter(todoItem => {
    switch (status) {
      case FilterStatus.Active:
        return !todoItem.completed;
      case FilterStatus.Completed:
        return todoItem.completed;
      case FilterStatus.All:
        return true;
    }
  });

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <HeaderTodo />
        </header>

        <section className="todoapp__main" data-cy="TodoList">
          {filteredTodos.map(todoItem => (
            <TodoList key={todoItem.id} todo={todoItem} />
          ))}
        </section>

        {todo.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {`${itemsLeft} items left`}
            </span>

            <nav className="filter" data-cy="Filter">
              {Object.values(FilterStatus).map(filter => (
                <a
                  key={filter}
                  data-cy={`FilterLink${filter}`}
                  href={`#${filter.toLowerCase().replace('all', '')}`}
                  onClick={() => setStatus(filter)}
                  className={classNames('filter__link', {
                    selected: status === filter,
                  })}
                >
                  {filter}
                </a>
              ))}
            </nav>

            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
              onClick={() => method.clearCompleted()}
              disabled={activeTodos.length === todo.length}
            >
              Clear completed
            </button>
          </footer>
        )}
      </div>
    </div>
  );
};
