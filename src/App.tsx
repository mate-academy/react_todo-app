/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import {TodoProvider, useTodos} from './context/TodoContext';
import {Header} from './components/Header/Header';
import {TodoList} from './components/TodoList/TodoList';
import {Footer} from './components/Footer/Footer';
/*eslint-disable-next-line max-len*/
import {ErrorNotification} from './components/ErrorNotification/ErrorNotification';

import './styles/todoapp.scss';

/*eslint-disable-next-line max-len*/
export const TodoAppContent: React.FC = () => {
  const context = useTodos();
  const {todos = [], errorMessage, clearError} = useTodos();
  const hasTodos = todos.length > 0;

  const handleToggleTodo = context?.updateTodo
    ? (todo) => context.updateTodo(todo.id, {completed: !todo.completed})
    : () => {
    };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header data-cy="NewTodoField"/>
        {hasTodos && (
          <TodoList
            todos={todos}
            processingIds={context?.processingIds || []}
            getFilteredTodos={() => {
              switch (context?.filter) {
                case 'active':
                  return todos.filter((todo) => !todo.completed);
                case 'completed':
                  return todos.filter((todo) => todo.completed);
                default:
                  return todos;
              }
            }}
            handleToggleTodo={handleToggleTodo}
            handleRemoveTodo={context?.removeTodo || (() => {
            })}
            handleRenameTodo={(id: number, newTitle: string) =>
              context?.updateTodo(id, {title: newTitle.trim()}) ||
              Promise.resolve()
            }
            tempTodo={null}
            isLoading={false}
          />
        )}
        {hasTodos && (
          <Footer
            todos={context.todos}
            filter={context.filter}
            processingIds={context.processingIds}
            handleClearCompleted={context.clearCompleted}
            setStatus={context.setFilter}
            status={context.filter}
          />
        )}
      </div>

      {!hasTodos && (
        <p className="todoapp__hint">Press Enter to save a new todo</p>
      )}

      <ErrorNotification error={errorMessage} onClose={clearError}/>
    </div>
  );
};

export const App: React.FC = () => (
  <TodoProvider>
    <TodoAppContent/>
  </TodoProvider>
);
