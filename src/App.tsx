/* eslint-disable no-confusing-arrow */
/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
/* eslint-disable no-console */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store';
import {
  ADD_TODO,
  GET_TODOS,
  COUNT_OF_ACTIVE,
  DELETE_ALL,
} from './store/todosReducer';
import { Todo } from './type';
import { TodoList } from './TodoList';
import { TodosFilter } from './TodosFilter';

export const App: React.FC = () => {
  const todos = useSelector((state: RootState) => state.todos.todos);
  const dispatch = useDispatch();
  const [todoText, setTodoText] = useState('');
  const activeTodos = useSelector(
    (state: RootState) => state.todos.countOfActiveTodos,
  );

  useEffect(() => {
    dispatch({ type: GET_TODOS });
  }, [todos]);

  const addTodo = (obj: Todo) => {
    dispatch({ type: ADD_TODO, payload: obj });
    dispatch({ type: COUNT_OF_ACTIVE });
  };

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            setTodoText('');
            const todo = {
              id: new Date().toString() + todoText + Math.random(),
              title: todoText,
              completed: false,
            };

            if (todo.title) {
              addTodo(todo);
            }
          }}
        >
          <input
            type="text"
            data-cy="createTodo"
            className="new-todo"
            placeholder="What needs to be done?"
            value={todoText}
            onChange={(event) => {
              setTodoText(event.target.value);
            }}
          />
        </form>
      </header>

      <section className="main">
        <TodoList />

        {/* <ul className="todo-list" data-cy="todoList">
          <li>
            <div className="view">
              <input type="checkbox" className="toggle" id="toggle-view" />
              <label htmlFor="toggle-view">asdfghj</label>
              <button type="button" className="destroy" data-cy="deleteTodo" />
            </div>
            <input type="text" className="edit" />
          </li>

          <li className="completed">
            <div className="view">
              <input type="checkbox" className="toggle" id="toggle-completed" />
              <label htmlFor="toggle-completed">qwertyuio</label>
              <button type="button" className="destroy" data-cy="deleteTodo" />
            </div>
            <input type="text" className="edit" />
          </li>

          <li className="editing">
            <div className="view">
              <input type="checkbox" className="toggle" id="toggle-editing" />
              <label htmlFor="toggle-editing">zxcvbnm</label>
              <button type="button" className="destroy" data-cy="deleteTodo" />
            </div>
            <input type="text" className="edit" />
          </li>

          <li>
            <div className="view">
              <input type="checkbox" className="toggle" id="toggle-view2" />
              <label htmlFor="toggle-view2">1234567890</label>
              <button type="button" className="destroy" data-cy="deleteTodo" />
            </div>
            <input type="text" className="edit" />
          </li>
        </ul> */}
      </section>

      <footer className="footer">
        <span className="todo-count" data-cy="todosCounter">
          {`${activeTodos} items left`}
        </span>
        <TodosFilter />
        <button
          type="button"
          className="clear-completed"
          onClick={() => {
            dispatch({ type: DELETE_ALL });
          }}
        >
          Clear completed
        </button>
      </footer>
    </div>
  );
};
