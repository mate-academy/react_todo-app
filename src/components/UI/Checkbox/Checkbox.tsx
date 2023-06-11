/* eslint-disable max-len */
import styles from './Checkbox.module.scss';

type Props = {
  isCompleted: boolean;
  completed: boolean;
};

export const Checkbox: React.FC<Props> = ({ completed, isCompleted }) => {
  return (
    <>
      <svg viewBox="0 0 0 0" style={{ position: 'absolute', zIndex: -1, opacity: 0 }}>
        <defs>
          <linearGradient id="boxGradient" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="25" y2="25">
            <stop offset="0%" stopColor="#3a88c5" />
            <stop offset="100%" stopColor="#9baacf" />
          </linearGradient>

          <linearGradient id="lineGradient">
            <stop offset="0%" stopColor="#9baacf" />
            <stop offset="100%" stopColor="#9baacf" />
          </linearGradient>

          <path id="line" stroke="url(#lineGradient)" d="M21 12.3h316v0.1z" />
          <path id="box" stroke="url(#boxGradient)" d="M21 12.7v5c0 1.3-1 2.3-2.3 2.3H8.3C7 20 6 19 6 17.7V7.3C6 6 7 5 8.3 5h10.4C20 5 21 6 21 7.3v5.4" />
          <path id="check" d="M10 13l2 2 5-5" />
          <circle id="circle" cx="13.5" cy="12.5" r="10" />
        </defs>
      </svg>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 400 25"
        className={styles.checkboxSvg}
      >
        <use
          xlinkHref="#line"
          className={styles.line}
          style={{ strokeDashoffset: completed ? '-8' : '' }}
        />

        <use
          xlinkHref="#box"
          className={styles.box}
          style={{ strokeDashoffset: completed ? '56.11' : '' }}
        />

        <use
          xlinkHref="#check"
          className={styles.check}
          style={{
            strokeDashoffset: completed ? '0' : '',
            transitionDelay: completed ? '0.3s' : '',
          }}
        />

        {!isCompleted && (
          <use
            xlinkHref="#circle"
            className={styles.circle}
            style={{ animationName: completed ? `${styles.explode}` : '' }}
          />
        )}
      </svg>
    </>
  );
};
