import { Todo } from '../App';

type Props = {
  todos: Todo[],
  inputText: string,
  onCreateTodo: (todos: any) => void;
  onInput: (text: string) => void,
};
export const AddTodoForm: React.FC<Props> = ({
  todos, inputText, onCreateTodo, onInput,
}) => {
  const inputTextHandler: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    console.log(event.target.value);
    onInput(event.target.value);
  };

  const submitTodoHandler: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    onCreateTodo([
      ...todos, { id: Math.random() * 1000, title: inputText, completed: false },
    ]);
    onInput('');
  };

  return (
    <>
      <form
        onSubmit={submitTodoHandler}
      >
        <input
          type="text"
          data-cy="createTodo"
          value={inputText}
          className="new-todo"
          onChange={inputTextHandler}
          placeholder="What needs to be done?"
        />
      </form>
    </>
  );
};
