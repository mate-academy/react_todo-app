import React from 'react';
import Form from './Components/inputHeader';
import TodoList from './Components/todoList';
import Footer from './Components/footer';

const filters = {
  all: 'All',
  active: 'Active',
  completed: 'Completed',
};

class App extends React.Component {
  state = {
    list: [],
    activeFilter: '',
  };

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
 };

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

  filterTabs = (filter) => {
    this.setState({
      activeFilter: filter,
    });
  };

  handleFilterTasks = () => {
    const { list, activeFilter } = this.state;
    const { completed, active } = filters;

    if (activeFilter === completed) {
      return list.filter(todo => todo.completed);
    }

    if (activeFilter === active) {
      return list.filter(todo => !todo.completed);
    }

    return list;
  };

  checkedAll = (checked) => {
    this.setState(prevState => ({
      list: prevState.list.map(item => ({
        ...item,
        completed: checked,
      })),

    }));
  };

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
  };

  render() {
    const { list, activeFilter } = this.state;
    const lengthFilteredTodos
      = list.filter(item => item.completed === false).length;

    return (
      <section className="todoapp">
        <header className="header">
          <h1>Tasks</h1>

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
            list={this.handleFilterTasks()}
            handleRemove={this.handleRemove}
            handleCheck={this.handleCheck}
          />

        </section>

        <Footer
          filters={filters}
          list={list}
          activeFilter={activeFilter}
          clearCompleted={this.clearCompleted}
          filterTabs={this.filterTabs}
          lengthFilteredTodos={lengthFilteredTodos}
        />

      </section>
    );
  }
}

export default App;
