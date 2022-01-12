import React, { useState, useEffect } from 'react';
import { VscChevronRight } from 'react-icons/vsc';
import { Todo } from '../../Types/Todo';
import { addTodo, getTodos, changeTodo } from '../../api/api';

type Props = {
  setTodos: (arg: Todo[]) => void,
  todos: Todo[]
};

export const Form: React.FC<Props> = ({ setTodos, todos }) => {
  const [value, setValue] = useState('');
  const [completeAll, setCompleteAll] = useState(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (value.trim()) {
      addTodo({
        title: value,
        userId: 8787,
        completed: false,
      });
    }

    setValue('');
  };

  const arrowButtonClick = () => {
    setCompleteAll(!completeAll);

    return todos.forEach(todo => {
      if (completeAll) {
        changeTodo(todo.id, false);
      } else {
        changeTodo(todo.id, true);
      }
    });
  };

  useEffect(() => {
    getTodos()
      .then(res => setTodos(res));
  }, [todos]);

  return (
    <form
      className="form"
      onSubmit={handleSubmit}
    >
      <button
        type="button"
        className="arrow-button"
        onClick={arrowButtonClick}
      >
        <VscChevronRight className="arrow-icon" />
      </button>
      <input
        type="text"
        value={value}
        className="new-todo"
        onChange={(e) => setValue(e.currentTarget.value)}
        placeholder="What needs to be done?"
      />
    </form>
  );
};
