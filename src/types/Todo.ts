export interface CreateTodo {
  userId: number,
  completed: boolean,
  title: string,
}

export interface ChangeStatusTodo {
  completed: boolean,
}
export interface ChangeTitleTodo {
  title: string,
}

export interface Todo extends CreateTodo {
  id: number,
}
