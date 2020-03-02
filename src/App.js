import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import Form from './components/Form/Form';
import TodoList from './components/TodoList/TodoList';
import Filter from './components/Filter/Filter';

const FILTERS = {
  all: 'all',
  active: 'active',
  completed: 'completed',
};

export class App extends React.Component {
  state = {
    todos: [],
    filter: 'all',
  };

  componentDidMount() {
    const LocallySavedTodos = localStorage.getItem('todos');

    if (LocallySavedTodos) {
      const todos = JSON.parse(LocallySavedTodos);

      this.setState({ todos });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.todos !== this.state.todos) {
      localStorage.setItem('todos', JSON.stringify(this.state.todos));
    }
  }

  addTodo = (title) => {
    if (!title.trim()) {
      return;
    }

    const todo = {
      id: uuidv4(),
      title,
      completed: false,
    };

    this.setState(prevState => ({
      todos: [
        ...prevState.todos,
        todo,
      ],
    }));
  };

  changeStatusTodo = (todoId) => {
    this.setState(prevState => ({
      todos: prevState.todos.map((todo) => {
        if (todo.id !== todoId) {
          return todo;
        }

        return {
          ...todo,
          completed: !todo.completed,
        };
      }),
    }));
  };

  deleteTodo = (todoId) => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => todo.id !== todoId),
    }));
  };

  toggleAllTodos = (event) => {
    const { checked } = event.target;

    this.setState(prevState => ({
      todos: prevState.todos.map(todo => ({
        ...todo,
        completed: checked,
      })),
    }));
  };

  clearAllCompleted = () => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => !todo.completed),
    }));
  };

  handleFilterClick = (event) => {
    const { name } = event.target;

    this.setState({
      filter: name,
    });
  };

   visibleTodos = () => {
     const { todos, filter } = this.state;

     switch (filter) {
       case FILTERS.active:
         return todos.filter(todo => !todo.completed);

       case FILTERS.completed:
         return todos.filter(todo => todo.completed);

       default:
         return todos;
     }
   };

   render() {
     const { todos, filter } = this.state;

     return (
       <section className="todoapp">
         <header className="header">
           <h1>todos</h1>
           <Form
             addTodo={this.addTodo}
           />
         </header>
         {todos.length > 0 && (
           <section className="main">
             <input
               type="checkbox"
               id="toggle-all"
               className="toggle-all"
               onChange={this.toggleAllTodos}
               checked={todos.every(todo => todo.completed)}
             />
             <label
               htmlFor="toggle-all"
             >
               Mark all as complete
             </label>
             <TodoList
               todos={this.visibleTodos()}
               deleteTodo={this.deleteTodo}
               changeStatusTodo={this.changeStatusTodo}
             />
           </section>
         )}
         {todos.length > 0 && (
           <footer className="footer">
             <span className="todo-count">
               {todos.filter(todo => !todo.completed).length}
               &nbsp;items left
             </span>
             <Filter
               handleFilterClick={this.handleFilterClick}
               filter={filter}
             />
             <button
               type="button"
               className="clear-completed"
               onClick={this.clearAllCompleted}
             >
              Clear completed
             </button>
           </footer>
         )}
       </section>
     );
   }
}
