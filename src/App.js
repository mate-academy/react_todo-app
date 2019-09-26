import React from 'react';

import TodoAdd from './components/TodoAdd/TodoAdd';
import TodoList from './components/TodoList/TodoList';
import Footer from './components/Footer/Footer';

class App extends React.Component {
  state = {
    todosList: [],
    activeFilter: '',
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

  handleFilter = (filter) => {
    this.setState({
      activeFilter: filter,
    });
  };

  clearCompleted = () => {

  };

  render() {
    const { activeFilter, todosList } = this.state;
    let filtered;

    switch (activeFilter) {
      case 'active':
        filtered = todosList.filter(todo => !todo.completed);
        break;
      case 'completed':
        filtered = todosList.filter(todo => todo.completed);
        break;
      default:
        filtered = todosList;
        break;
    }
    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>

          <TodoAdd addTodo={this.addTodo} />
        </header>

        <section className="main" style={{display: 'block'}}>
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            onChange={e => this.handleAllChecked(e.target.checked)}
          />
          <label htmlFor="toggle-all">Mark all as complete</label>
          {filtered.map(todo =>
            <TodoList
              key={todo.id}
              todo={todo}
              checked={todo.completed}
              isChecked={this.handleCheck}
              destroy={this.handleDestroy}
            />)
          }
        </section>

        <Footer
          filtered={filtered}
          todosList={todosList}
          handleFilter={this.handleFilter}
          activeFilter={activeFilter}
          clearCompleted={this.clearCompleted}
        />
      </section>
    );
  }
}

export default App;
