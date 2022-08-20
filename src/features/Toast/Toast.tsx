import React, { useState } from 'react';

import './Toast.scss';
import classNames from 'classnames';
import { useAppDispatch } from '../../app/hooks';
import { hideToast } from './toastSlice';

type Props = {
  children: React.ReactNode
};

export const Toast: React.FC<Props> = React.memo(
  ({ children }) => {
    const dispatch = useAppDispatch();

    const [localIsShown, setLocalIsShown] = useState(true);

    const handleCloseButtonClick = () => {
      setTimeout(() => {
        dispatch(hideToast);
      }, 500);

      setLocalIsShown(false);
    };

    return (
      <div
        className={classNames({
          Toast: true,
          'Toast--hide-transition': !localIsShown,
        })}
      >
        <div className="Toast__container">
          <div className="Toast__info">
            {children}
          </div>

          <button
            type="button"
            className="Toast__close-button"
            onClick={handleCloseButtonClick}
          >
            <div className="Toast__icon-container">
              <svg
                className="Toast__icon-svg"
                width="40"
                height="40"
                viewBox="-10 -18 100 135"
                version="1.1"
                id="svg1170"
                xmlSpace="preserve"
              >
                <defs
                  id="defs1174"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="50"
                  fill="none"
                  stroke="#bddad5"
                  strokeWidth="3"
                  id="circle1166"
                  style={{
                    stroke: 'inherit',
                  }}
                />
                <g
                  transform="matrix(2.6128167,0,0,2.6128167,27.222489,28.70913)"
                >
                  <path
                    strokeMiterlimit="4"
                    d="M -2.5783352e-4,-0.00146808 17.435473,18.212367"
                    style={{
                      opacity: 1,
                      fill: '#5f6368',
                      fillOpacity: 1,
                      stroke: 'inherit',
                      strokeWidth: 3.23162,
                      strokeLinecap: 'round',
                      strokeMiterlimit: 4,
                      strokeOpacity: 1,
                    }}
                  />
                  <path
                    strokeMiterlimit="4"
                    d="M -2.5783352e-4,18.212367 17.435473,-0.00146808"
                    style={{
                      opacity: 1,
                      fill: '#5f6368',
                      fillOpacity: 1,
                      stroke: 'inherit',
                      strokeWidth: 3.23162,
                      strokeLinecap: 'round',
                      strokeMiterlimit: 4,
                      strokeOpacity: 1,
                    }}
                  />
                </g>
              </svg>

            </div>
          </button>
        </div>
      </div>
    );
  },
);
