import { useMyContext } from '../TodosContext';

export const Header = () => {
  const { newTodo } = useMyContext();

  const hanlerSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const inputElement = event.currentTarget
      .querySelector('.new-todo') as HTMLInputElement;

    if (inputElement) {
      const title = inputElement.value.trim();

      if (title) {
        newTodo(title);
      }

      inputElement.value = '';
    }
  };

  return (
    <header className="header">
      <h1>todos</h1>

      <form onSubmit={hanlerSubmit}>
        <input
          type="text"
          data-cy="createTodo"
          className="new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  );
};
