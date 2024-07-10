import React, { FC, FormEvent, useState } from 'react';

interface Props {
  className: string;
  onSubmit?: (value: string) => void;
}

export const Form: FC<Props> = props => {
  const { className, onSubmit } = props;
  const [value, setValue] = useState<string>('');

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit?.(value);
    setValue('');
  };

  return (
    <form onSubmit={submitHandler}>
      <input
        data-cy="NewTodoField"
        type="text"
        className={className}
        placeholder="What needs to be done?"
        value={value}
        onChange={e => setValue(e.target.value)}
      />
    </form>
  );
};
