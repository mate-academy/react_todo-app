import React, { useState, useRef } from 'react';
import { TodoList } from './components/TodoList';
import { NewTodo } from './components/NewTodo';
import { Todo } from './types/Todo';
import { Footer } from './components/Footer';
import classNames from 'classnames';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<string | undefined>('all');

  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  function inputFocus() {
    inputRef.current?.focus();
  }

  const filteredTodos = todos.filter(todo => {
    if (filter === 'all') {
      return todo;
    } else if (filter === 'completed') {
      return todo.completed === true;
    } else if (filter === 'active') {
      return todo.completed === false;
    }

    return todo;
  });

  const todosForFooter = todos;

  const handleAddTodo = (title: string) => {
    const normalizedTitle = title.trim();

    if (normalizedTitle === '') {
      inputFocus();

      return;
    }

    const newTodo: Todo = {
      id: +Date.now(),
      title: normalizedTitle,
      completed: false,
    };

    setTodos(prevTodos => [...prevTodos, newTodo]);
    setInputValue('');
  };

  const handleDeleteTodo = (todoId: number) => {
    setTodos(prevState => prevState.filter(todo => todo.id !== todoId));
  };

  const handleStatusUpdate = (todoId: number, nextCompleted?: boolean) => {
    const currentTodo = todos.find(todo => todo.id === todoId);

    const updatedCompleted =
      typeof nextCompleted === 'boolean'
        ? nextCompleted
        : !currentTodo.completed;

    setTodos((prevState: Todo[]) => {
      return prevState.map((todo: Todo) =>
        todo.id === todoId ? { ...todo, completed: updatedCompleted } : todo,
      );
    });
  };

  const handleRenameTodo = (todoId: number, title: string) => {
    const normalizedTitle = title.trim();

    if (normalizedTitle === '') {
      return handleDeleteTodo(todoId);
    }

    setTodos((prevState: Todo[]) => {
      return prevState.map((todo: Todo) =>
        todo.id === todoId ? { ...todo, title: normalizedTitle } : todo,
      );
    });
  };

  const handleUpdateAllStatus = () => {
    const nextCompleted = !todos.every(todo => todo.completed);
    const todosToUpdate = todos.filter(
      todo => todo.completed !== nextCompleted,
    );

    todosToUpdate.forEach(todo => {
      handleStatusUpdate(todo.id, nextCompleted);
    });
  };

  const toggleAllButtonHandler = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
    handleUpdateAllStatus();
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {todos.length > 0 && (
            <button
              type="button"
              className={classNames({
                'todoapp__toggle-all': true,
                active: todos.every(item => item.completed === true),
              })}
              data-cy="ToggleAllButton"
              onClick={toggleAllButtonHandler}
            />
          )}

          <NewTodo
            ref={inputRef}
            newTodo={handleAddTodo}
            inputValue={inputValue}
            setInputValue={setInputValue}
          />
        </header>

        <TodoList
          todos={filteredTodos}
          toggleStatus={handleStatusUpdate}
          deleteTodo={handleDeleteTodo}
          renameTodo={handleRenameTodo}
        />

        {todosForFooter.length > 0 && (
          <Footer
            data={todosForFooter}
            setFilter={setFilter}
            clearCompeleted={() => {
              setTodos((prevState: Todo[]) =>
                // need to rewrite to promise.all()
                prevState.map(item => {
                  if (item.completed === true) {
                    handleDeleteTodo(item.id);
                  }

                  return item;
                }),
              );
            }}
          />
        )}
      </div>
    </div>
  );
};
