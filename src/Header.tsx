import React, { useContext, useState } from 'react';
import { Todo } from './types/Todo';
import { postTodos } from './api/todos';
import { TodosContext } from './TodoContext';

type Props = {
  todos: Todo[],
  setTodos(todosArray: Todo[]): void,
};

export const Header: React.FC<Props> = ({
  todos,
  setTodos,
}) => {
  const {
    setTempTodo,
    setIsAddError,
  } = useContext(TodosContext);
  const [todoTitle, setTodoTitle] = useState('');
  const [isInputDisabled, setIsInputDisabled] = useState(false);
  const postTodo = async (todo: Omit<Todo, 'id'>) => {
    setIsAddError(false);
    setIsInputDisabled(true);

    try {
      const response = await postTodos(todo);

      setTodos([
        ...todos,
        response,
      ]);
    } catch {
      setIsAddError(true);
    }

    setTempTodo(null);
    setIsInputDisabled(false);
  };

  return (

    <header className="header">
      <h1>todos</h1>

      <form
        onSubmit={(event) => {
          event.preventDefault();

          const newTodo = {
            completed: false,
            userId: 9968,
            title: todoTitle,
          };

          postTodo(newTodo);

          setTempTodo({
            id: 0,
            ...newTodo,
          });

          setTodoTitle('');
        }}
      >
        <input
          type="text"
          data-cy="createTodo"
          className="new-todo"
          placeholder="What needs to be done?"
          value={todoTitle}
          disabled={isInputDisabled}
          onChange={(event) => {
            setTodoTitle(event.target.value);
          }}
        />
      </form>
    </header>

  );
};
