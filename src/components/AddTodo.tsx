import { useContext, useEffect, useRef, useState } from 'react';
import { DispatchContext, TodosContext } from '../context/Store';

type Props = {};

export const AddTodo: React.FC<Props> = ({}) => {
  const todos = useContext(TodosContext);
  const dispatch = useContext(DispatchContext);
  const [text, setText] = useState('');

  const handleChangeText = (event: React.ChangeEvent<HTMLInputElement>) =>
    setText(event.target.value);

  const handleOnSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (text !== '') {
      dispatch({ type: 'add', payload: text.trim() });
    }

    setText('');
  };

  const inputRefEmpty = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRefEmpty.current) {
      inputRefEmpty.current.focus();
    }

    if (todos.length === 0) {
      if (inputRefEmpty.current) {
        inputRefEmpty.current.focus();
      }
    }
  }, [todos.length]);

  return (
    <form onSubmit={handleOnSubmit}>
      <input
        data-cy="NewTodoField"
        type="text"
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
        value={text}
        onChange={handleChangeText}
        ref={inputRefEmpty}
      />
    </form>
  );
};
