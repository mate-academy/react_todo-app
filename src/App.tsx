/* eslint-disable jsx-a11y/control-has-associated-label */
// for edit just class editing
import React, { useState } from 'react';

import { Todo, TodosContext, reducer } from './utils/context';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const addTodoRef = React.useRef<HTMLInputElement | null>(null);
  const [todos, dispatch] = React.useReducer(reducer, []);
  const [newTodoTitle, setNewTodoTitle] = useState('');

  const toogleAll = () => {
    const allDone = todos.every((todo) => todo.completed === true);

    const updatedTodos = todos.map((todo) => {
      if (allDone) {
        return { ...todo, completed: false };
      }

      return { ...todo, completed: true };
    });

    dispatch({ type: 'updateAll', payload: updatedTodos });
  };

  const addTodo = () => {
    const newTodo: Todo = {
      id: +new Date(),
      title: newTodoTitle,
      completed: false,
    };

    dispatch({ type: 'add', payload: newTodo });
  };

  const handleDeleteTodo = (todo: Todo) => {
    dispatch({ type: 'delete', payload: todo });
  };

  const handleTodoToggle = (todo: Todo) => {
    dispatch({ type: 'toggle', payload: todo });
  };

  // const filterActive = () => {
  //   const filteredTodos = todos.filter((todo) => todo.completed === false);

  //   dispatch({ type: 'filterActive', payload: filteredTodos });
  // };

  // const filterCompleted = () => {
  //   const filteredTodos = todos.filter((todo) => todo.completed === true);

  //   dispatch({ type: 'filterActive', payload: filteredTodos });
  // };

  // const filter = (query: string) => {
  //   if (query === 'active') {
  //     return todos.filter((todo) => todo.completed === false);
  //   }

  //   if (query === 'completed') {
  //     return todos.filter((todo) => todo.completed === true);
  //   }

  //   return todos;
  // };

  const filter = (query: string) => {
    if (query === 'active') {
      dispatch({ type: 'filterActive' });
    } else if (query === 'completed') {
      dispatch({ type: 'filterCompleted' });
    } else {
      dispatch({ type: 'updateAll', payload: todos });
    }
  };

  const formSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (addTodoRef.current && addTodoRef.current.value.trim().length > 0) {
      setNewTodoTitle(addTodoRef.current.value);
    }
  };

  React.useEffect(() => {
    if (newTodoTitle && addTodoRef.current !== null) {
      addTodo();
      addTodoRef.current.value = '';
    }
  }, [newTodoTitle]);

  return (
    <TodosContext.Provider value={todos}>
      <div className="todoapp">
        <header className="header">
          <h1>todos</h1>

          <form onSubmit={formSubmit}>
            <input
              ref={addTodoRef}
              type="text"
              data-cy="createTodo"
              className="new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        {todos.length > 0 && (
          <section className="main">
            <input
              type="checkbox"
              id="toggle-all"
              className="toggle-all"
              data-cy="toggleAll"
              onClick={toogleAll}
            />
            <label htmlFor="toggle-all">Mark all as complete</label>

            <TodoList
              onDelete={handleDeleteTodo}
              onComplete={handleTodoToggle}
            />

            <ul className="todo-list" data-cy="todoList">
              {/* <li>
                  <div className="view">
                    <input type="checkbox" className="toggle" id="toggle-view" />
                    <label htmlFor="toggle-view">asdfghj</label>
                    <button
                      onClick={() => handleDeleteTodo}
                      type="button"
                      className="destroy"
                      data-cy="deleteTodo"
                    />
                  </div>
                  <input type="text" className="edit" />
                </li>

                <li className="completed">
                  <div className="view">
                    <input
                      type="checkbox"
                      className="toggle"
                      id="toggle-completed"
                    />
                    <label htmlFor="toggle-completed">qwertyuio</label>
                    <button
                      type="button"
                      className="destroy"
                      data-cy="deleteTodo"
                    />
                  </div>
                  <input type="text" className="edit" />
                </li>

                <li className="editing">
                  <div className="view">
                    <input type="checkbox" className="toggle" id="toggle-editing" />
                    <label htmlFor="toggle-editing">zxcvbnm</label>
                    <button
                      type="button"
                      className="destroy"
                      data-cy="deleteTodo"
                    />
                  </div>
                  <input type="text" className="edit" />
                </li>

                <li>
                  <div className="view">
                    <input type="checkbox" className="toggle" id="toggle-view2" />
                    <label htmlFor="toggle-view2">1234567890</label>
                    <button
                      type="button"
                      className="destroy"
                      data-cy="deleteTodo"
                    />
                  </div>
                  <input type="text" className="edit" />
                </li> */}
            </ul>
          </section>
        )}

        {todos.length > 0
        && (
          <Footer
            // filterActive={filterActive}
            // filterCompleted={filterCompleted}
            filter={filter}
          />
        )}
      </div>
    </TodosContext.Provider>
  );
};
