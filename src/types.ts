export type Todo = {
  id: string;
  title: string;
  completed: boolean;
};

export type PropsMain = {
  filteredTodos: Todo[];
};

export enum IsActiveTab {
  All = 'All',
  Active = 'Active',
  Completed = 'Completed',
}

export type PropsFooter = {
  isActive: IsActiveTab;
  setIsActiveTab: (arg: IsActiveTab) => void;
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
