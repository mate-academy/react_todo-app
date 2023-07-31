import { useRef } from 'react';
import { TodoList } from './TodoList';
import { TodoFilters } from './TodoFilters';

import {
  Heading,
  Main,
  ToggleAllInput,
  Footer,
  ClearCompletedButton,
  NewTodoInput,
  TodoCount,
  StyledTodoApp,
} from './styled-components';
import { useTodos } from '../contexts/TodosContext';

export const TodoApp = () => {
  const {
    handleAddTodo,
    todosMap,
    handleClearCompleted,
    handleToggleCompletedAll,
  } = useTodos();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (): void => {
    if (!inputRef.current) {
      return;
    }

    const { value } = inputRef.current;

    if (!value) {
      return;
    }

    handleAddTodo(value);
    inputRef.current.value = '';
  };

  return (
    <StyledTodoApp>
      <header>
        <Heading>todos</Heading>

        <form onSubmit={handleSubmit}>
          <NewTodoInput
            type="text"
            data-cy="createTodo"
            placeholder="What needs to be done?"
            ref={inputRef}
          />
        </form>
      </header>

      <Main>
        <ToggleAllInput
          onClick={handleToggleCompletedAll}
          type="checkbox"
          defaultChecked={todosMap.active.length === 0}
          id="toggle-all"
          data-cy="toggleAll"
        />
        <label htmlFor="toggle-all">Mark all as complete</label>

        <TodoList todosMap={todosMap} />
      </Main>

      {todosMap.all.length > 0 && (
        <Footer>
          <TodoCount data-cy="todosCounter">
            {`${todosMap.active.length} items left`}
          </TodoCount>

          <TodoFilters />

          {todosMap.completed.length > 0 && (
            <ClearCompletedButton type="button" onClick={handleClearCompleted}>
              Clear completed
            </ClearCompletedButton>
          )}
        </Footer>
      )}
    </StyledTodoApp>
  );
};
