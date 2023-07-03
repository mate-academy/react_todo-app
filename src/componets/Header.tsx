import { Todos } from '../type/Todos';

type Props = {
  setTodos: (value: (todos: Todos[]) => Todos[]) => void
};

export const Header: React.FC<Props> = ({ setTodos }) => {
  const handleInput = (event: { key: string, target: { value: string } }) => {
    if (event.key === 'Enter' && event.target.value !== '') {
      const newTodo: Todos = {
        id: +new Date(),
        title: event.target.value,
        complated: false,
      };

      setTodos(prevTodos => [...prevTodos, newTodo]);

      // eslint-disable-next-line no-param-reassign
      event.target.value = '';
    }
  };

  return (
    <header className="header">
      <h1>todos</h1>

      <form>
        <input
          type="text"
          data-cy="createTodo"
          className="new-todo"
          placeholder="What needs to be done?"
          onKeyDown={handleInput}
        />
      </form>
    </header>
  );
};
