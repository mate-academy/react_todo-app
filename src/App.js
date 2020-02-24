import React from 'react';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';

class App extends React.Component {
  state = {
    tab: 'all',
    items: [],
  }

  handleAddTodo = (e) => {
    const { value } = e.target;

    if (e.keyCode !== 13 || value === '') {
      return;
    }

    const { items } = this.state;
    const item = {
      text: value, status: 1,
    };

    items.push(item);
    this.setState({ items });
    // e.target.value = '';
  }

  render() {
    const { tab, items } = this.state;

    return (
      <section className="todoapp">
        <Header handleAddTodo={this.handleAddTodo} />
        <section className="main">
          <input type="checkbox" id="toggle-all" className="toggle-all" />
          <label htmlFor="toggle-all">Mark all as complete</label>
          <TodoList
            tab={tab}
            data={items}
          />
        </section>
        <Footer
          tab={tab}
          counts={items.filter(({ status }) => status).length}
        />
      </section>
    );
  }
}

export default App;
