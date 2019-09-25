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
          checked: false,
        }],
      }));
    }
  };

  handleCheck = (id) => {
    todosListtodosList.find(todo => todo.id === id);
  };

  render() {
    const { todosList } = this.state;

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>

          <TodoAdd addTodo={this.addTodo} />
        </header>

        <section className="main" style={{ display: 'block' }}>
          <input type="checkbox" id="toggle-all" className="toggle-all" />
          <label htmlFor="toggle-all">Mark all as complete</label>
          {todosList.map(todo => <TodoList todo={todo} isChecked={this.handleCheck} />)}
        </section>

        <Footer />
      </section>
    );
  }
}

export default App;
