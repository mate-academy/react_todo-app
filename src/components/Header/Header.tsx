import { useContext, useState } from 'react';
import './style.css';
import { DispatchContext, TodosContext } from '../GlobalStateProvider';
import { AllActions } from '../../types/Action';
import { TodoItemType } from '../../types/TodoItemType';

export const Header: React.FC = () => {
  const [value, setValue] = useState('');
  const dispatch = useContext(DispatchContext);
  const todos = useContext(TodosContext);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (value.trim() === '') {
      return;
    }

    let maxId = todos.map(todo => todo.id).sort()[todos.length - 1] || 0;
    // eslint-disable-next-line no-plusplus
    const newId = ++maxId;
    const addition: TodoItemType = {
      id: newId,
      title: value,
      completed: false,
    };

    dispatch({ type: AllActions.Add, payload: addition });
    setValue('');
  };

  return (
    <header className="header">
      <h1>todos</h1>

      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          data-cy="createTodo"
          className="new-todo"
          placeholder="What needs to be done?"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </form>
    </header>
  );
};
