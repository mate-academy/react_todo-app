import React, { useMemo, useContext } from 'react';
import { TodosContext } from './context/TodosContext';
import { actions } from './reducers/todosReducer';
import { NewTodo, TodoList, TodoFooter, UserInfo } from './components';
import { deleteTodo, toggleTodo } from './api';
import { useUser } from './hooks/useUser';

function TodoApp() {
  const { todos, dispatch } = useContext(TodosContext);
  const user = useUser();

  const [activeCount, completedCount] = useMemo(() => {
    const completed = todos.filter(todo => todo.completed).length;
    const active = todos.length - completed;

    return [active, completed];
  }, [todos]);

  const isToggleAllChecked = useMemo(() => (
    todos.every(({ completed }) => completed)
  ), [todos]);

  const handleToggleAll = async() => {
    dispatch(actions.toggleAll());

    if (isToggleAllChecked || todos.every(todo => !todo.completed)) {
      await Promise.allSettled(
        todos.map(todo => toggleTodo(todo.id, !todo.completed)),
      );
    } else {
      await Promise.allSettled(
        todos.filter(todo => !todo.completed)
          .map(todo => toggleTodo(todo.id, true)),
      );
    }
  };

  const handleDeleteCompleted = async() => {
    dispatch(actions.deleteCompleted());

    await Promise.allSettled(
      todos.filter(todo => todo.completed)
        .map(todo => deleteTodo(todo.id)),
    );
  };

  return (
    <>
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTodo />
        </header>

        <TodoList
          todos={todos}
          handleToggleAll={handleToggleAll}
          isToggleAllChecked={isToggleAllChecked}
        />

        {todos.length > 0 && (
          <TodoFooter
            activeCount={activeCount}
            completedCount={completedCount}
            handleDeleteCompleted={handleDeleteCompleted}
          />
        )}
      </section>

      <UserInfo name={user.name} />
    </>
  );
}

export default TodoApp;
