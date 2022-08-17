import React, { useCallback, useContext, useState } from 'react';
import { createTodo } from './api';
import { TodosContext } from './TodosProvider';
import { Todo } from './types/Todo';

export const NewTodo = React.memo(() => {
  const [todoName, setTodoName] = useState('');
  const { todos, setTodos, userId } = useContext(TodosContext);
  const resetChange = useCallback(() => {
    setTodos([...todos]);
  }, [todos]);

  return (
    <form onSubmit={event => {
      event.preventDefault();
      const newTodo: Todo = {
        id: +new Date(),
        title: todoName,
        completed: false,
      };

      createTodo(todoName, userId).then(todo => {
        newTodo.id = todo.id;
      })
        .catch(resetChange);

      setTodos([...todos, newTodo]);
      setTodoName('');
    }}
    >
      <input
        value={todoName}
        onChange={event => {
          setTodoName(event.target.value);
        }}
        type="text"
        data-cy="createTodo"
        className="new-todo"
        placeholder="What needs to be done?"
      />
    </form>
  );
});
