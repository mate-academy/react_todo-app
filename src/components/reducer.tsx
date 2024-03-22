import { Filter } from '../types/Filter';
import { State } from '../types/State';

export type Action = { type: 'filter', payload: Filter }
                   | { type: 'addTodo', title: string }
                   | { type: 'editTitle', title: string }
                   | { type: 'removeTodo', id: number }
                   | { type: 'markCompleted', title: string }
                   | { type: 'removeCompletedTodos' }
                   | { type: 'toggleCompleted', payload: boolean }

export function reducer(state: State, action: Action) {
  switch(action.type) {
    case 'addTodo':
      return {
        ...state,
        todos: [...state.todos, {
          id: +new Date(),
          title: action.title,
          completed: false,
        }]
      }
    case 'filter':
      return {
        ...state,
        filterBy: action.payload,
      };
    case 'removeTodo':
      return {
        ...state,
        todos: state.todos.filter(t => t.id !== todo.id)
      }
    case 'removeCompletedTodos':
      return {
        ...state,
        todos: state.todos.filter(todo => !todo.completed),
      }
    case 'toggleCompleted':
      return {
        ...state,
        todos: state.todos.map(todo => ({
          ...todo,
          completed: action.payload,
        }))
      }
    default:
      return state;
  }
}
