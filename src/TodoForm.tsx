/* eslint-disable no-console */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Todo } from './type';
import { ADD_TODO, COUNT_OF_ACTIVE } from './store/todosReducer';

type Props = {
  todos: Todo[] | null;
};

export const TodoForm: React.FC <Props> = React.memo(({ todos }) => {
  const [todoText, setTodoText] = useState('');

  const dispatch = useDispatch();

  const addTodo = (obj: Todo) => {
    dispatch({ type: ADD_TODO, payload: obj });
    dispatch({ type: COUNT_OF_ACTIVE });
    localStorage.setItem('todos', JSON.stringify(todos));
  };

  return (
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
  );
});
