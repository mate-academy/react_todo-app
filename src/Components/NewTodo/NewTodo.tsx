import {
  ChangeEvent,
  useState,
  FormEvent,
  FocusEvent,
} from 'react';

type Props = {
  createNewTodo: (value: string) => void;
};

const NewTodo: React.FC<Props> = ({ createNewTodo }) => {
  const [value, setValue] = useState('');

  const onChangeHandle = (event: ChangeEvent<HTMLInputElement>) => (
    setValue(event.target.value)
  );

  const onSubmitHandle = (e: FormEvent | FocusEvent) => {
    e.preventDefault();

    if (!value.length) {
      return;
    }

    createNewTodo(value);
    setValue('');
  };

  return (
    <form onSubmit={onSubmitHandle}>
      <input
        type="text"
        data-cy="createTodo"
        className="new-todo"
        placeholder="What needs to be done?"
        value={value}
        onChange={onChangeHandle}
        onBlur={onSubmitHandle}
      />
    </form>
  );
};

export default NewTodo;
