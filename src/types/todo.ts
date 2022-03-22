export interface Todo {
  id: number
  title: string
  userId: number
  completed: boolean
}

export type TodoPropsToUpdate = {
  title: string
} | {
  completed: boolean
};
