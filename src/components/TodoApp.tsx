import { TodoList } from './TodoList';
import { TodoFilters } from './TodoFilters';
import { NewTodoForm } from './NewTodoForm';

import {
  Heading,
  Main,
  ToggleAllInput,
  Footer,
  ClearCompletedButton,
  TodoCount,
  StyledTodoApp,
} from './styled-components';
import { useTodos } from '../contexts/TodosContext';

export const TodoApp = () => {
  const { todosMap, handleClearCompleted, handleToggleCompletedAll }
    = useTodos();

  return (
    <StyledTodoApp>
      <header>
        <Heading>todos</Heading>

        <NewTodoForm />
      </header>
      {todosMap.all.length > 0 && (
        <>
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

          <Footer data-cy="todosFilter">
            <TodoCount data-cy="todosCounter">
              {`${todosMap.active.length} items left`}
            </TodoCount>

            <TodoFilters />

            {todosMap.completed.length > 0 && (
              <ClearCompletedButton
                type="button"
                onClick={handleClearCompleted}
              >
                Clear completed
              </ClearCompletedButton>
            )}
          </Footer>
        </>
      )}
    </StyledTodoApp>
  );
};
