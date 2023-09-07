export type Action = { type: 'addTodo', payload: string }
| { type: 'deleteTodo', payload: number }
| { type: 'toggleTodo', payload: number }
| { type: 'toggleAllTodo' }
| { type: 'deleteCompletedTodo' }
| { type: 'updateTodoTitle', payloadTitle: string, payloadId: number };
