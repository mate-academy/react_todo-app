import { useContext, useState } from 'react';
import { DispatchContext } from '../../TodosContext';
import { ReducerType } from '../../types/enums/ReducerType';

export const Header: React.FC = () => {
  const dispatch = useContext(DispatchContext);
  const [titleTodo, setTitleTodo] = useState('');

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (titleTodo.trim()) {
      dispatch({
        type: ReducerType.AddTodo,
        payload: {
          id: +new Date(),
          title: titleTodo.trim(),
          completed: false,
        },
      });
    }

    setTitleTodo('');
  };

  const handleInputTitleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { value } = event.target;

    setTitleTodo(value);
  };

  return (
    <header className="header">
      <h1>todos</h1>

      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          name="titleTodo"
          data-cy="createTodo"
          className="new-todo"
          placeholder="What needs to be done?"
          value={titleTodo}
          onChange={handleInputTitleChange}
          pattern=".*\S+.*"
          required
        />
      </form>
    </header>
  );
};
