export type Todo = {
  id: string;
  title: string;
  completed: boolean;
};

export type PropsMain = {
  filteredTodos: Todo[];
};

export type IsActiveType = {
  all: boolean;
  active: boolean;
  completed: boolean;
};

export type PropsFooter = {
  isActive: IsActiveType;
  setIsActiveTab: (arg: IsActiveType) => void;
};

export type PropsTodo = {
  id: string;
  title: string;
  status: boolean;
};

export enum Actions {
  delete = 'delete',
  updateToDone = 'updateToDone',
  updateToNotDone = 'updateToNotDone',
}
