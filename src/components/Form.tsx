import React, {
  ChangeEvent,
  FC,
  FormEvent,
  KeyboardEvent,
  RefObject,
} from 'react';

interface Props {
  className: string;
  value: string;
  inputRef?: RefObject<HTMLInputElement>;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onBlur?: () => void;
  onCancel?: (e: KeyboardEvent<HTMLInputElement>) => void;
  dataCy?: string;
}

export const Form: FC<Props> = props => {
  const {
    className,
    value,
    onChange,
    onSubmit,
    onBlur,
    inputRef,
    onCancel,
    dataCy = 'NewTodoField',
  } = props;

  return (
    <form onSubmit={onSubmit} onBlur={onBlur}>
      <input
        data-cy={dataCy}
        type="text"
        className={className}
        placeholder="What needs to be done?"
        value={value}
        onChange={onChange}
        ref={inputRef}
        onKeyUp={onCancel}
        autoFocus
      />
    </form>
  );
};
