import { useContext, useState } from 'react';
import { DispatchContext } from '../../state/TodosContext';
import { ReducerType } from '../../types';
import { idCreator } from '../../services/idCreator';

export const TodoInput: React.FC = () => {
  const dispatch = useContext(DispatchContext);
  const [todo, setTodo] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (todo.trim()) {
      dispatch({
        type: ReducerType.AddTodo,
        payload: {
          id: idCreator(),
          title: todo.trim(),
          completed: false,
        },
      });
    }

    setTodo('');
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { value } = event.target;

    setTodo(value);
  };

  return (

    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="titleTodo"
        data-cy="createTodo"
        className="new-todo"
        placeholder="What needs to be done?"
        value={todo}
        onChange={handleChange}
        required
      />
    </form>

  );
};
