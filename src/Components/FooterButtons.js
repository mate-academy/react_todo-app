import React, { Component } from 'react';

class FooterButtons extends Component {
  render() {
    const buttons = [{ dir: 'All' }, { dir: 'Active' }, { dir: 'Completed' }];
    const { filter, changeFilter } = this.props;

    return (
      <ul className="filters">
        {buttons.map(({ dir }) => {
          const isActive = filter === dir;
          const selectedButton = isActive ? `selected` : ``;

          return (
            <li>
              <a href={`#/${dir}`} className={selectedButton} onClick={() => changeFilter(dir)}>{dir}</a>
            </li>
          );
        })}
      </ul>
    );
  }
}

export default FooterButtons;
