/* eslint-disable jsx-a11y/control-has-associated-label */
import { Filter, FilterContext } from '../Filter/Filter';
import { Todo } from '../Todo';
import { ReactNode, useState, useContext, useRef, useEffect } from 'react';
import './TodoApp.scss';
import { TodoContext } from '../../Contexts';
import { ACTIONSINFILTERCONTEXT } from '../../utils';

const TodoApp: React.FC = (): ReactNode => {
  const [inputTodoContent, setInputTodoContent] = useState('');
  const { dispatch: updateTodo } = useContext(TodoContext)!;
  const {
    filteredTodos,
    currentFilterCriteria,
    itemsLeft,
    totalCompletedTodos,
  } = useContext(FilterContext)!;
  const mainInputRef = useRef<HTMLInputElement>(null);
  const [showFooterOrNot, setShowFooterOrNot] = useState(false);

  useEffect(() => {
    if (currentFilterCriteria !== ACTIONSINFILTERCONTEXT.ALL) {
      setShowFooterOrNot(true);

      return;
    }

    if (filteredTodos.length < 1) {
      setShowFooterOrNot(false);

      return;
    }

    setShowFooterOrNot(true);
  }, [filteredTodos, currentFilterCriteria]);

  useEffect(() => {
    mainInputRef.current!.focus();
  }, [filteredTodos]);

  const handleSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inputTodoContent.length > 0) {
      updateTodo({
        type: 'SAVE',
        payload: { idx: 0, content: inputTodoContent },
      });
      setInputTodoContent('');
    }
  };

  const handleInputTodoContent = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setInputTodoContent(event.target.value);
  };

  const handleClickOnToggleAllButton = () => {
    updateTodo({ type: 'COMPLETETODOS' });
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this button should have `active` class only if all todos are completed */}
          {showFooterOrNot && (
            <button
              type="button"
              className={`todoapp__toggle-all ${itemsLeft || 'active'}`}
              data-cy="ToggleAllButton"
              onClick={handleClickOnToggleAllButton}
            />
          )}

          {/* Add a todo on form submit */}
          <form method="post" onSubmit={handleSubmitForm}>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              onChange={handleInputTodoContent}
              value={inputTodoContent}
              ref={mainInputRef}
            />
          </form>
        </header>

        <section className="todoapp__main" data-cy="TodoList">
          <Todo
            todos={filteredTodos}
            updateTodo={updateTodo}
            mainInput={mainInputRef}
          />
        </section>
        {/* Hide the footer if there are no todos */}
        {showFooterOrNot && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {`${itemsLeft} items left`}
            </span>

            {/* Active link should have the 'selected' class */}
            <Filter />

            {/* this button should be disabled if there are no completed todos */}
            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
              disabled={!Boolean(totalCompletedTodos)}
              onClick={() => updateTodo({ type: 'CLEARCOMPLETEDTODOS' })}
            >
              Clear completed
            </button>
          </footer>
        )}
      </div>
    </div>
  );
};

export default TodoApp;
