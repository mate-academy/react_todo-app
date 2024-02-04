import { useCallback, useState, useContext } from 'react';
import { DispatchContext } from '../Store/TodosProvider';
import { Todo } from '../Types/Todo';

const Header = () => {
  const dispatch = useContext(DispatchContext);
  const [todoTitle, setTodoTitle] = useState('');

  const errorMessage = (text: string) => {
    const messageContainer = document.createElement('div');

    messageContainer.textContent = text;

    messageContainer.style.backgroundColor = '#f5f5f5';
    messageContainer.style.padding = '10px';
    messageContainer.style.border = '1px solid #344f10';
    messageContainer.style.position = 'fixed';
    messageContainer.style.top = '40%';
    messageContainer.style.left = '50%';
    messageContainer.style.textAlign = 'center';
    messageContainer.style.transform = 'translate(-50%, -50%)';

    document.body.appendChild(messageContainer);

    setTimeout(() => {
      document.body.removeChild(messageContainer);
    }, 2500);
  };

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setTodoTitle(event.target.value);
    }, [],
  );

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (todoTitle.trim()) {
        const newTodo: Todo = {
          id: +new Date(),
          title: todoTitle,
          completed: false,
        };

        dispatch({ type: 'addTodo', payload: newTodo });
        setTodoTitle('');
      } else {
        errorMessage('Enter Todo');
      }
    }, [todoTitle, dispatch],
  );

  return (
    <header className="header">
      <h1>todos</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          data-cy="createTodo"
          className="new-todo"
          placeholder="What needs to be done?"
          value={todoTitle}
          onChange={handleInputChange}
        />
      </form>
    </header>
  );
};

export default Header;
