import React from 'react';
import Form from './Components/inputHeader';
import TodoList from './Components/todoList';
import Footer from './Components/footer';

// const FILTERS = {
//   all: 'All',
//   completed: 'Completed',
//   active: 'Active',
// };

class App extends React.Component {
  state = {
    list: [],
  }

  addTodo = (note) => {
    this.setState(state => ({
      list: [...state.list,
        {
          id: new Date(),
          note,
          completed: false,
        },
      ],
    }));
  };

  render() {
    const { list } = this.state;

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>

        </header>

        <Form addTodo={this.addTodo} />

        <section className="main" style={{ display: 'block' }}>
          <input type="checkbox" id="toggle-all" className="toggle-all" />
          <label htmlFor="toggle-all">Mark all as complete</label>

          <TodoList list={list} />

        </section>

        <Footer list={list} />

      </section>
    );
  }
}

export default App;
