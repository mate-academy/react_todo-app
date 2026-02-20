import { useContext } from 'react';
import { useState } from 'react';
import { TodoContext } from '../store/TodoContext';
import { addTodoAction, completeAllAction } from '../store/TodoReducer';

export const Header = () => {
  const { todos, dispatch } = useContext(TodoContext);
  const [newTodo, setNewTodo] = useState('');
  const [todosIsDone, setTodosIsDone] = useState(false);

  const addTodo = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(addTodoAction(newTodo));
    setNewTodo('');
  };

  const completeAll = () => {
    const newValue = !todosIsDone;

    setTodosIsDone(newValue);
    dispatch(completeAllAction(newValue));
  };

  return (
    <header className="todoapp__header">
      {todos.length > 0 && (
        <button
          type="button"
          className={
            todosIsDone ? 'todoapp__toggle-all active' : 'todoapp__toggle-all'
          }
          data-cy="ToggleAllButton"
          onClick={completeAll}
        />
      )}
      <form onSubmit={addTodo}>
        <input
          value={newTodo}
          onChange={event => setNewTodo(event.target.value)}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  );
};
