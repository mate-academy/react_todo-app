import { Filter } from "../component/TodosFIlter/TodoFilter";
import { State } from "../context/GlobalContext/GlobalContext";
import { Todo } from "../types/Todo";

export type Action = { type: 'add', payload: Todo }
  | { type: 'checkAll' }
  | { type: 'checkTodo', payload: Todo }
  | { type: 'uncheckAll' }
  | { type: 'deleteTodo', payload: Todo }
  | { type: 'deleteCompleted' }
  | { type: 'changeTodo', payload: Todo }
  | { type: 'filter', payload: Filter };


export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'add':
      return {
        ...state,
        todos: [...state.todos, action.payload]
      };
    case 'checkAll':
      return {
        ...state,
        todos: state.todos.map(todo => ({ ...todo, completed: true }))
      }
    case 'checkTodo':
      return {
        ...state,
        todos: state.todos.map(todo => todo.id === action.payload.id ? { ...todo, completed: !todo.completed } : todo)
      }
    case 'uncheckAll':
      return {
        ...state,
        todos: state.todos.map(todo => ({ ...todo, completed: false }))
      }
    case 'deleteTodo':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload.id)
      }
    case 'deleteCompleted':
      return {
        ...state,
        todos: state.todos.filter(todo => !todo.completed)
      }
    case 'changeTodo':
      return {
        ...state,
        todos: state.todos.map(t => t.id === action.payload.id ? action.payload : t)
      }
    case 'filter':
      return {
        ...state,
        filter: action.payload,
      }
    default:
      return state;
  }
}
