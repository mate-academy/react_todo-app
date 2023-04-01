import {
  ChangeEvent,
  useState,
  FormEvent,
  FocusEvent,
  useEffect,
  useRef,
} from 'react';

import { PostTodo } from '../../types/PostTodo';

type Props = {
  createNewTodo: (value: string) => Promise<void>;
};

const NewTodo: React.FC<Props> = ({ createNewTodo }) => {
  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(PostTodo.NONE);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isLoading !== PostTodo.SUCCESS) {
      return;
    }

    inputRef.current?.focus();
  }, [isLoading]);

  const onChangeHandle = (event: ChangeEvent<HTMLInputElement>) => (
    setValue(event.target.value)
  );

  const onSubmitHandle = (
    e: FormEvent | FocusEvent<HTMLInputElement>,
    option: PostTodo = PostTodo.SUCCESS,
  ) => {
    e.preventDefault();

    if (!value.length) {
      return;
    }

    setIsLoading(PostTodo.PENDING);
    createNewTodo(value)
      .finally(() => {
        setIsLoading(option);
        setValue('');
      });
  };

  const onBlur = (e: FocusEvent<HTMLInputElement>) => {
    onSubmitHandle(e, PostTodo.NONE);
  };

  const isDisabledButton = isLoading === PostTodo.PENDING;

  return (
    <form onSubmit={onSubmitHandle}>
      <input
        ref={inputRef}
        type="text"
        data-cy="createTodo"
        className="new-todo"
        placeholder="What needs to be done?"
        value={value}
        onChange={onChangeHandle}
        onBlur={onBlur}
        disabled={isDisabledButton}
      />
    </form>
  );
};

export default NewTodo;
