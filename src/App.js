import React from 'react';
import Form from './Components/inputHeader';
import TodoList from './Components/todoList';
import Footer from './Components/footer';

const filters = [
  {
    title: `All`,
    href: `#/`,
    id: 1,
  },
  {
    title: `Active`,
    href: `#/active`,
    id: 2,
  },
  {
    title: `Completed`,
    href: `#/completed`,
    id: 3,
  },
];

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

  handleRemove = (taskId) => {
    this.setState(prevState => ({
      list: prevState.list.filter(task => task.id !== taskId),
    }));
  };

  clearCompleted = () => {
    this.setState(prevState => ({
      list: prevState.list.filter(task => task.completed === false),
    }));
  };

  // setFilter = () => {
  //   const { list } = this.state;
  //
  //   if () {
  //
  //   }
  //   if () {
  //
  //   }
  // }

  filterAllChecked = () => {
    this.setState(prevState => ({
      list: prevState.list.filter(task => task.completed === false),
    }));
  };

  filterAllActive = () => {
    this.setState(prevState => ({
      list: prevState.list.filter(task => task.completed === true),
    }));
  };

  checkedAll = (checked) => {
    this.setState(prevState => ({
      list: prevState.list.map(item => ({
        ...item,
        completed: checked,
      })),

    }));
  }

  handleCheck = (id) => {
    this.setState(state => ({
      list: state.list.map(task => (task.id === id
        ? {
          ...task,
          completed: !task.completed,
        }
        : task
      )),
    }));
  }

  render() {
    const { list } = this.state;

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>

        </header>

        <Form addTodo={this.addTodo} />

        <section className="main" style={{ display: 'block' }}>
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            checked={list.every(i => i.completed) && list.length !== 0}
            onChange={(event) => {
              this.checkedAll(event.target.checked);
            }}
          />

          <label htmlFor="toggle-all">Mark all as complete</label>

          <TodoList
            list={list}
            handleRemove={this.handleRemove}
            handleCheck={this.handleCheck}
          />

        </section>

        <Footer
          filters={filters}
          list={list}
          clearCompleted={this.clearCompleted}
        />

      </section>
    );
  }
}

export default App;
