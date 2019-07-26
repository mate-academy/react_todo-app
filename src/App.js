import React from 'react';
import Todo from './Todo';
import Footer from './Footer';
import Header from './Header';

class App extends React.Component {
  state = {
    allToggled: false,
    showContent: false,
    todoes: [],
    filterBy: 'All',
  }

  changeFilter = (filter) => {
    this.setState({
      filterBy: filter,
    });
  };

  filter = (items, field) => {
    switch (field) {
      case 'All':
        return items;
      case 'Active':
        return items.filter(item => !item.isDone);
      case 'Completed':
        return items.filter(item => item.isDone);
      default:
        return items;
    }
  }

  toggle = (id) => {
    this.setState(prevState => ({
      todoes: prevState.todoes.map((todo) => {
        if (todo.id !== id) {
          return todo;
        }

        return {
          ...todo,
          isDone: !todo.isDone,
        };
      }),
    }));
  }

  toggleAll = () => {
    this.setState(prevState => ({
      todoes: prevState.todoes.map((todo) => {
        if (prevState.allToggled === false) {
          return {
            ...todo,
            isDone: true,
          };
        }

        return {
          ...todo,
          isDone: false,
        };
      }),
      allToggled: !prevState.allToggled,
    }));
  }

  addTask = (task) => {
    if (task.length>0) {
      this.setState(prevState => ({
        todoes: [...prevState.todoes, {
          id: Date.now(),
          title: task,
          isDone: false,
        }],
        showContent: true,
      }));
    }
  }

  destroy = (id) => {
    this.setState(prevState => ({
      todoes: prevState.todoes.filter(todo => todo.id !== id),
      showContent: !(prevState.todoes.length < 2),
    }));
  }

  destroyCompleted = () => {
    this.setState(prevState => ({
      todoes: prevState.todoes.filter(todo => todo.isDone === false),
    }));
  }

  render() {
    const {
      showContent,
      todoes,
      filterBy,
    } = this.state;

    const todosCopy = this.filter(todoes, filterBy);

    const resultingList = todoes.length !== 0
      ? todosCopy.map(todo => (
        <Todo todo={todo} toggle={this.toggle} destroy={this.destroy} />
      ))
      : '';

    return (
      <section className="todoapp">
        <Header addTask={this.addTask} />

        {showContent && (
          <div className="content-group">

            <section className="main">
              <input
                type="checkbox"
                id="toggle-all"
                className="toggle-all"
                onClick={this.toggleAll}
              />
              <label
                htmlFor="toggle-all"
                id="label"
              >
                Mark all as complete
              </label>

              <ul className="todo-list">

                {resultingList}

              </ul>
            </section>

            <Footer
              todoes={todoes}
              filterBy={filterBy}
              changeFilter={this.changeFilter}
              destroyCompleted={this.destroyCompleted}
            />
          </div>)
        }
      </section>
    );
  }
}

export default App;
