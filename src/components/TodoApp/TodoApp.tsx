import React, { useState } from 'react';
import { addNewTodo, userId } from '../../api/api';
import { TodosType } from '../../types/TodosType';

type Props = {
  setTodos: (todos: any) => void;
};

export const TodoApp: React.FC<Props> = ({ setTodos }) => {
  const [inputValue, setInputValue] = useState('');

  const addTodo = (e: any) => {
    e.preventDefault();

    addNewTodo(`todos/?userId=${userId}`, inputValue)
      .then((resp) => {
        setTodos((todos: TodosType[]) => (
          [...todos,
            {
              id: +resp.id,
              title: `${resp.title}`,
              completed: false,
            },
          ]
        ));
      });

    setInputValue('');
  };

  return (
    <form
      onSubmit={e => addTodo(e)}
    >
      <input
        type="text"
        className="new-todo"
        placeholder="What needs to be done?"
        value={inputValue}
        onChange={evt => setInputValue(evt.target.value)}
      />
    </form>
  );
};
