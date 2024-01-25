import React from 'react';

import './Footer.scss';
import TodoCount from '../TodoCount';
import Filters from '../Filters';
import ClearButton from '../UI/ClearButton';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <TodoCount />

      <Filters />

      <ClearButton>Clear completed</ClearButton>
    </footer>
  );
};

export default Footer;
