import React from 'react';
import Form from './components/Form/Form';
import TodoList from './components/TodoList/TodoList';
import Filter from './components/Filter/Filter';

class App extends React.Component {
  state = {
    todos: [],
    filter: 'all',
  };

  addTodo = (title) => {
    if (title.trim() === '') {
      return;
    }

    this.setState(prevState => ({
      todos: [...prevState.todos,
        {
          id: +new Date(),
          title,
          completed: false,
        },
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
       case 'active': return todos.filter(todo => !todo.completed);
       case 'completed': return todos.filter(todo => todo.completed);
       default: return todos;
     }
   };

   render() {
     const { todos } = this.state;

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
             <label htmlFor="toggle-all">Mark all as complete</label>
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
              items left
             </span>
             <Filter
               handleFilterClick={this.handleFilterClick}
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

export default App;
