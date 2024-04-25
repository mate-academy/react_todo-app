import { useContext, useMemo, useState } from 'react';
import { ReactContext } from '../../ReactContext';
import { Task } from '../../types/Task';
import cn from 'classnames';

type Props = {
  active: React.RefObject<HTMLInputElement>;
};

export const Header = ({ active }: Props) => {
  const Context = useContext(ReactContext);
  const [inputChange, setInputChange] = useState('');

  const areAllCompleted = Context.todos.every(todo => todo.completed);

  const allComplited = () => {
    const complit = Context.todos.map(todo => {
      return {
        ...todo,
        completed: !areAllCompleted,
      };
    });

    Context.setTodoses(complit);
  };

  const createNewTask = () => {
    const newTask = {
      id: +new Date(),
      title: inputChange,
      completed: false,
    };

    Context.setTodoses((prevTodoses: Task[]) => [...prevTodoses, newTask]);
    setInputChange('');
  };

  const cheakKey = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();

      if (inputChange.trim()) {
        createNewTask();
      }
    }
  };

  useMemo(() => {
    if (Context.todos.length > 0) {
      Context.setFirstTask(true);
    } else {
      Context.setFirstTask(false);
    }
  }, [Context]);

  return (
    <header className="todoapp__header">
      {/* Context button should have `active` class only if all todos are completed */}
      {Context.firstTask && (
        <button
          type="button"
          className={cn('todoapp__toggle-all', { active: areAllCompleted })}
          data-cy="ToggleAllButton"
          onClick={allComplited}
        />
      )}

      {/* Add a todo on form submit */}
      <form>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={inputChange}
          onChange={event => setInputChange(event.target.value)}
          onKeyDown={cheakKey}
          ref={active}
        />
      </form>
    </header>
  );
};
