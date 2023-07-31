import { TodoList } from './TodoList';
import { TodoFilters } from './TodoFilters';

import { Heading } from './styled-components/Heading';
import { Main } from './styled-components/Main';
import { ToggleAllInput } from './styled-components/ToggleAllInput';
import { Footer } from './styled-components/Footer';
import { ClearCompletedButton } from './styled-components/ClearCompletedButton';
import { NewTodoInput } from './styled-components/NewTodoInput';
import { TodoCount } from './styled-components/TodoCount';
import { StyledTodoApp } from './styled-components/StyledTodoApp';

export const TodoApp = () => {
  return (
    <StyledTodoApp>
      <header>
        <Heading>todos</Heading>

        <form>
          <NewTodoInput
            type="text"
            data-cy="createTodo"
            placeholder="What needs to be done?"
          />
        </form>
      </header>

      <Main>
        <ToggleAllInput type="checkbox" id="toggle-all" data-cy="toggleAll" />
        <label htmlFor="toggle-all">Mark all as complete</label>

        <TodoList />
      </Main>

      <Footer>
        <TodoCount data-cy="todosCounter">3 items left</TodoCount>

        <TodoFilters />

        <ClearCompletedButton type="button">
          Clear completed
        </ClearCompletedButton>
      </Footer>
    </StyledTodoApp>
  );
};
