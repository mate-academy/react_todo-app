export type Todo = {
  id: string;
  title: string;
  completed: boolean;
};

export type PropsHeader = {
  todos: Todo[];
  setTodos: (arg: Todo[]) => void;
};

export type PropsMain = {
  todos: Todo[];
  filteredTodos: Todo[];
  setTodos: (arg: Todo[]) => void;
};

export type IsActiveType = {
  all: boolean;
  active: boolean;
  completed: boolean;
};

export type PropsFooter = {
  todos: Todo[];
  isActive: IsActiveType;
  setIsActiveTab: (arg: IsActiveType) => void;
  setTodos: (arg: Todo[]) => void;
};

export type PropsTodo = {
  id: string;
  title: string;
  status: boolean;
  todos: Todo[];
  setTodos: (arg: Todo[]) => void;
};

export enum Actions {
  delete = 'delete',
  updateToDone = 'updateToDone',
  updateToNotDone = 'updateToNotDone',
}
