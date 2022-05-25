// eslint-disable-next-line
/// <reference types="react-scripts" />

interface Option {
  method: string,
  headers?: {
    'Content-type': string,
  }
  body?: string,
}

interface Todo {
  id: number,
  title: string,
  completed: boolean,
}

type ToggleAllProps = {
  toggleAllStatus: boolean,
  handleToggleAllClick: () => void,
};

type TodosCounterProps = {
  todos: Todo[]
};

type NewTodoFormProps = {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>,
    newTodoTitle: string) => void,
};

type TodoListProps = {
  items: Todo[],
  editTodoTitle: (
    newTitle: string,
    todoId: number,
  ) => void,
  editCompletedStatus: (
    newStatus: boolean,
    todoId: number,
  ) => void,
};

type TodoItemProps = {
  todo: Todo,
  index: number,
  editTodoTitle: (
    newTitle: string,
    todoId: number,
  ) => void,
  editCompletedStatus: (
    newStatus: boolean,
    todoId: number,
  ) => void,
};

type TodosFilterProps = {
  applyFilter: (chosenFilter: string) => void,
};

type ClearCompletedProps = {
  completedTodosLength: number,
  handleClearCompletedClick: () => void,
};
