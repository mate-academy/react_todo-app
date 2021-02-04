import React from 'react';
import {Link} from 'react-router-dom';

export const FooterItem = () => {
  return (
    <Link>
      <Button size="small" variant="contained" className={classes.headerBtnText}>ABOUT</Button>
    </Link>
  );
};
