import React from 'react';

import Header from './Header';
import MainTodoList from './MainTodoList';
import Footer from './Footer';

class App extends React.Component {
  state = { 
    todos: [],
    title: '',
    currentFilter: '',
    allCompleted: false,
    selectedFilter: '',
    filters: ['All', 'Active', 'Completed']
  }

  addTodo = (text) => {
    this.setState( state => {
      const myTodo = (
        {
          text,
          completed: false,
          id: +(new Date()),
        }
      )
      return { todos: [...state.todos, myTodo] };
    });
  }
    
  change = (e) => {
    this.setState({
      title: e.target.value,
    });
  }

  submitForm = (e) => { 
    e.preventDefault();

    if (!this.state.title.trim()) {
      return;
    } 
    
    this.addTodo(this.state.title)
    this.setState({ title: '' })
  }

  destroy = (id) => {
    this.setState(state => ({
      todos: state.todos.filter(todo => todo.id !== id),
    }))
  } 

  check = (e, id) => {
    e.persist();

    this.setState(state => ({
      todos: state.todos.map(todo => {
        if (todo.id !== id) {
          return todo;
        }

        return {
          ...todo,
          completed: e.target.checked,
        };
      }),
    }));
  };

  checkAll = () => {
    this.setState(({ todos, allCompleted }) => ({
      allCompleted: !allCompleted,
      todos: todos.map(todo => ({
         ...todo,
        completed: !this.state.todos.every(todo => todo.completed)
      })),
    }));
  };

  howManyTodosLeft = () => { 
   return this.state.todos.length - this.state.todos
      .filter((todo) => todo.completed === true).length
  }

  setFilter = (filterValue) => {
    this.setState({
      currentFilter: filterValue,
    });
  };

  filteredTodos = () => {
    switch (this.state.currentFilter) {
      case 'Completed':  return this.state.todos.filter( todo => todo.completed)
      case 'Active':  return this.state.todos.filter( todo => !todo.completed)
      case 'All': 
      default: return this.state.todos
    }
  }

  clearCompleted = () => {
    this.setState(({todos})=> ({todos: todos.filter( todo => !todo.completed)}))
  }

  render() {
    const { todos, title, currentFilter, filters } = this.state;
    
    return (
      <section className="todoapp">
        <Header 
          submitForm={this.submitForm}
          change={this.change}
          value={title}
        />
        <MainTodoList
          checkAll={this.checkAll} 
          filteredTodos ={this.filteredTodos()} 
          check={this.check} 
          destroy={this.destroy} 
        />
       { 
          todos.length > 0 && ( 
          <Footer  
            howManyTodosLeft={this.howManyTodosLeft()} 
            filters={filters} 
            currentFilter={currentFilter}
            setFilter={this.setFilter}
            clearCompleted={this.clearCompleted}
          />
        )
       }
      </section>
    );
  }
}
  
export default App;
