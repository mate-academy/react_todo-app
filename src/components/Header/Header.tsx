import { useContext } from 'react';
import { TodosContext } from '../../contextes/TodosContext';

const reset = () => ({
  id: +new Date(),
  title: '',
  completed: false,
  editing: false,
});

export const Header = () => {
  const {
    todos,
    setTodos,
    newTodo,
    setNewTodo,
  } = useContext(TodosContext);

  const changeValues = () => setTodos([
    ...todos,
    newTodo,
  ]);

  const handleOnSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (newTodo.title) {
      changeValues();
      setNewTodo(reset());
    }
  };

  const hendlerOnChange
  = (event: React.ChangeEvent<HTMLInputElement>) => setNewTodo({
    ...newTodo,
    title: event.target.value,
  });

  return (
    <header className="header">
      <h1>todos</h1>

      <form onSubmit={event => handleOnSubmit(event)}>
        <input
          onChange={hendlerOnChange}
          type="text"
          value={newTodo.title}
          data-cy="createTodo"
          className="new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  );
};
