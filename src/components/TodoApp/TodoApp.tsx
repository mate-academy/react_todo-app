import { useTodoContext } from '../../hooks/useTodos';
import { AddTodoForm } from '../AddTodoForm';
import { TodoFooter } from '../TodoFooter/TodoFooter';
import { TodoList } from '../TodoList';
import { ToggleAllButton } from '../ToggleAllButton';

export const TodoApp = () => {
  const { state } = useTodoContext();
  const hasTodos = state.todos.length > 0;

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {hasTodos && <ToggleAllButton />}

          <AddTodoForm />
        </header>
        {hasTodos && (
          <>
            <section className="todoapp__main" data-cy="TodoList">
              <TodoList />
            </section>

            <TodoFooter />
          </>
        )}
      </div>
    </div>
  );
};
