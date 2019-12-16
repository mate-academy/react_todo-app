import React from 'react';
import Form from './Components/inputHeader';
import TodoList from './Components/todoList';
import Footer from './Components/footer';

class App extends React.Component {
  state = {
    list: [],
  }

  addTodo = (note) => {
    this.setState(prevState => ({
      list: [...prevState.list,
        {
          id: +new Date(),
          note,
          completed: false,
        },
      ],
    }));
  }

  handleRemove =(todoId) => {
    this.setState(prevState => ({
      list: prevState.list.filter(todo => todo.id !== todoId),
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

          <TodoList list={list} handleRemove={this.handleRemove} />

        </section>

        <Footer list={list} handleCompleted={this.handleCompleted} />

      </section>
    );
  }
}

export default App;
