import { useTodosContext } from '../../../Context/TodosContext';

interface PropsTodoForm {
  value: string,
  setValue(val: string): void;
}
export const TodoForm = ({ value, setValue }: PropsTodoForm) => {
  const { createNewTodo, tempTodo } = useTodosContext();

  return (
    <form
      onSubmit={createNewTodo}
    >
      <input
        type="text"
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        disabled={!!tempTodo}
      />
    </form>
  );
};
