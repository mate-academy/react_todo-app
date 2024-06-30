/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { AddTodo } from './components/AddTodo';
import { Todo } from './types/Todo';
import { useLocalStorage } from './services/useLocalStorage';
import classNames from 'classnames';

export const App: React.FC = () => {
  const initialTodos: Todo[] = [];

  const [todos, setTodos] = useLocalStorage('todos', initialTodos);

  const handleAddTodo = (text: string) => {
    setTodos([...todos, { id: +new Date(), title: text, completed: false }]);
  };

  const handleCheckbox = (updatedTodo: Todo) => {
    const idx = todos.findIndex(t => t.id === updatedTodo.id);
    const newTodos = [...todos];

    newTodos.splice(idx, 1, updatedTodo);

    setTodos([...newTodos]);
  };

  const handleDeleteTodo = (todoId: number) => {
    const deletedIdx = todos.findIndex(t => t.id === todoId);
    const updatedTodos = [...todos];

    updatedTodos.splice(deletedIdx, 1);

    setTodos([...updatedTodos]);
  };

  const isAllCompleted = todos.every(t => t.completed === true);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this button should have `active` class only if all todos are completed */}
          <button
            type="button"
            className={classNames('todoapp__toggle-all', {
              ['active']: isAllCompleted,
            })}
            data-cy="ToggleAllButton"
          />

          {/* Add a todo on form submit */}
          <AddTodo onAddTodo={handleAddTodo} />
        </header>

        <TodoList
          todos={todos}
          onCheck={handleCheckbox}
          onDelete={handleDeleteTodo}
        />
        {/* Hide the footer if there are no todos */}
        {todos.length > 0 && <Footer />}
      </div>
    </div>
  );
};
