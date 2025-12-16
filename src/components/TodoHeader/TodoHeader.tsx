import React, { useContext } from 'react';
import { TodosContext } from '../../contexts/TodosContext';
import classNames from 'classnames';
import { NewTodoContext } from '../../contexts/NewTodoContext';
import { Todo } from '../../types/Todo';
import { RefsContext } from '../../contexts/RefsContext';

export const TodoHeader: React.FC = () => {
  const todos = useContext(TodosContext).todos;
  const setTodos = useContext(TodosContext).setTodos;
  const newTodo = useContext(NewTodoContext).newTodo;
  const setNewTodo = useContext(NewTodoContext).setNewTodo;
  const todosExist = todos.length > 0;
  const allCompleted = todosExist && todos.every(todo => todo.completed);
  const newTodoRef = React.useContext(RefsContext).newTodoRef;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (newTodo.trim() === '') {
      return;
    }

    const newTodoItem: Todo = {
      id: (Math.max(...todos.map(todo => todo.id)) + 1) | 1,
      title: newTodo.trim(),
      completed: false,
    };

    setTodos([newTodoItem, ...todos]);
    setNewTodo('');
  };

  const handleToggleAll = () => {
    if (allCompleted) {
      setTodos(todos.map(todo => ({ ...todo, completed: false })));
    } else {
      setTodos(todos.map(todo => ({ ...todo, completed: true })));
    }
  };

  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      {todosExist && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: allCompleted,
          })}
          data-cy="ToggleAllButton"
          onClick={handleToggleAll}
        />
      )}

      {/* Add a todo on form submit */}
      <form onSubmit={event => handleSubmit(event)}>
        <input
          ref={newTodoRef}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={newTodo}
          onChange={event => setNewTodo(event.target.value)}
        />
      </form>
    </header>
  );
};
