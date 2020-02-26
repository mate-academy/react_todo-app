import React from 'react';
import { TodoList } from './components/TodoList/TodoList';
import { NewTodoInput } from './components/NewTodoInput/NewTodoInput';
import { FooterBar } from './components/FooterBar/FooterBar';

const todolistFromServer = [
  {
    title: 'task 1', id: 1, completed: false, editing: false,
  },
  {
    title: 'task 2', id: 2, completed: false, editing: false,
  },
  {
    title: 'task 3', id: 3, completed: false, editing: false,
  },
];

class App extends React.Component {
  state = {
    initial: [...todolistFromServer],
    todos: [...todolistFromServer],
  }

  onAdd = (newTask) => {
    this.setState(prevState => ({
      todos: [...prevState.todos, newTask],
      initial: [...prevState.initial, newTask],

    }));
  }

  toggleComplete = (id) => {
    this.setState((prevState) => {
      const todos = [...prevState.todos];

      todos[id].completed = !todos[id].completed;

      return todos;
    });
  }

  deleteItem = (id) => {
    const { todos, initial } = this.state;
    const temptodos = [...todos];
    const tempinitial = [...initial];

    temptodos.splice(todos.findIndex(item => item.id === id), 1);
    tempinitial.splice(initial.findIndex(item => item.id === id), 1);

    this.setState({
      todos: [...temptodos],
      initial: [...tempinitial],
    });
  }

  filterTodos = (config) => {
    if (config === 'all') {
      this.setState(prevState => ({
        todos: [...prevState.initial],
      }));
    } else if (config === 'active') {
      this.setState(prevState => ({
        todos: [...prevState.initial.filter(item => item.completed === false)],
      }));
    } else if (config === 'completed') {
      this.setState(prevState => ({
        todos: [...prevState.initial.filter(item => item.completed === true)],
      }));
    }
  }

  deleteCompleted = () => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(item => item.completed === false),
    }));
  }

  render() {
    const { todos } = this.state;

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>

          <NewTodoInput onAdd={this.onAdd} todos={todos} />
        </header>

        <section className="main">
          <input type="checkbox" id="toggle-all" className="toggle-all" />
          <label htmlFor="toggle-all">Mark all as complete</label>

          <TodoList
            todos={todos}
            toggleComplete={this.toggleComplete}
            deleteItem={this.deleteItem}
          />
        </section>

        <FooterBar
          filterTodos={this.filterTodos}
          deleteCompleted={this.deleteCompleted}
        />
      </section>
    );
  }
}

export default App;
