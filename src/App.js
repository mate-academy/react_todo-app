import React from 'react';

import TodoAdd from './components/TodoAdd/TodoAdd';
import TodoList from './components/TodoList/TodoList';
import Footer from './components/Footer/Footer';

class App extends React.Component {
  state = {
    todosList: [],
  };

  addTodo = (value) => {
    if (value !== '') {
      this.setState(prevState => ({
        todosList: [...prevState.todosList, {
          id: prevState.todosList.length + 1,
          value,
          completed: false,
        }],
      }));
    }
  };

  handleCheck = (id) => {
    this.setState(prevState => ({
      todosList: prevState.todosList
        .map((todo) => {
          if (todo.id === id) {
            return {
              id: todo.id,
              value: todo.value,
              completed: !todo.completed,
            };
          }

          return todo;
        }),
    }));
  };

  handleDestroy = (id) => {
    this.setState(prevState => ({
      todosList: prevState.todosList
        .filter(todo => todo.id !== id),
    }));
  };

  handleAllChecked = (checked) => {
    this.setState(({ todosList }) => ({
      todosList: todosList.map(todo => ({
        ...todo, completed: checked,
      })),
    }));
  };

  filterChecked = () => {
    const { todosList } = this.state;

    this.setState({
      filteredList: todosList
        .filter(todo => todo.completed === true),
    });
  }

  render() {
    const { todosList, filteredList } = this.state;

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>

          <TodoAdd addTodo={this.addTodo} />
        </header>

        <section className="main" style={{ display: 'block' }}>
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            onChange={e => this.handleAllChecked(e.target.checked)}
          />
          <label htmlFor="toggle-all">Mark all as complete</label>
          {todosList.map(todo =>
            <TodoList
              key={todo.id}
              todo={todo}
              checked={todo.completed}
              isChecked={this.handleCheck}
              destroy={this.handleDestroy}
            />)}
        </section>

        <Footer filterChecked={this.filterChecked} />
      </section>
    );
  }
}

export default App;
