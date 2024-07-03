import { useContext, useState } from 'react';
import { DispatchContext } from '../context/Store';

type Props = {};

export const AddTodo: React.FC<Props> = ({}) => {
  const dispatch = useContext(DispatchContext);
  const [text, setText] = useState('');

  const handleChangeText = (event: React.ChangeEvent<HTMLInputElement>) =>
    setText(event.target.value);

  const handleOnSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setText('');
    if (text.trim() !== '') {
      dispatch({ type: 'add', payload: text });
    }
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <input
        data-cy="NewTodoField"
        type="text"
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
        value={text}
        onChange={handleChangeText}
      />
    </form>
  );
};
