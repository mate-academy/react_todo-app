/* eslint-disable max-len */
import { Filter } from '../../types/Filter';
import { Button } from '../UI/Button';
import styles from './TodoActions.module.scss';

type Props = {
  setFilter: React.Dispatch<React.SetStateAction<Filter>>
  handleClearCompletedTodo: () => void;
  handleToggleAllTodos: () => void;
  filter: Filter;
};

export const TodoActions: React.FC<Props> = ({
  setFilter,
  handleClearCompletedTodo,
  handleToggleAllTodos,
  filter,
}) => {
  return (
    <div className={styles.action}>
      <Button
        title="Toggle all"
        onClick={handleToggleAllTodos}
      >
        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
          <path
            d="m20.4961766 5.62668182c.8758909.3077952 1.5038234 1.14222595 1.5038234 2.12331818v10c0 2.3472102-1.9027898 4.25-4.25 4.25h-10c-.98109223 0-1.81552298-.6279325-2.12331818-1.5038234l2.09728006.0033799 10.02603812.0004435c1.5187831 0 2.75-1.2312169 2.75-2.75v-10l-.0039806-.05098057zm-3.2493636-3.62668182c1.2426407 0 2.25 1.00735931 2.25 2.25v12.996813c0 1.2426407-1.0073593 2.25-2.25 2.25h-12.996813c-1.24264069 0-2.25-1.0073593-2.25-2.25v-12.996813c0-1.24264069 1.00735931-2.25 2.25-2.25zm0 1.5h-12.996813c-.41421356 0-.75.33578644-.75.75v12.996813c0 .4142136.33578644.75.75.75h12.996813c.4142136 0 .75-.3357864.75-.75v-12.996813c0-.41421356-.3357864-.75-.75-.75zm-7.66566736 7.8581942 3.88852426-3.88852429c.2928932-.29289321.767767-.29289321 1.0606602 0 .2662665.26626657.2904726.68293025.0726181.97654174l-.0726181.08411844-4.5 4.50000001c-.29583771.2958377-.76898983.288617-1.05672616.0041163l-.07360394-.0844464-1.5-2c-.24852814-.3313708-.18137085-.8014719.15-1.05.30124623-.22593467.71714548-.1909723.97699676.06621555l.07300324.08378445.98114564 1.3081942 3.88852426-3.88852429z"
            fill="#9baacf"
          />
        </svg>
      </Button>

      <div className={styles.filter}>
        <input
          type="radio"
          name="radio"
          value="all"
          id="tab-1"
          onChange={() => setFilter(Filter.All)}
          checked={filter === Filter.All}
        />
        <label htmlFor="tab-1">
          All
        </label>

        <input
          type="radio"
          name="radio"
          value="active"
          id="tab-2"
          onChange={() => setFilter(Filter.Active)}
          checked={filter === Filter.Active}
        />
        <label htmlFor="tab-2">
          Active
        </label>

        <input
          type="radio"
          name="radio"
          value="completed"
          id="tab-3"
          onChange={() => setFilter(Filter.Completed)}
          checked={filter === Filter.Completed}
        />
        <label htmlFor="tab-3">
          Completed
        </label>
        <div className={styles.segmented} />
      </div>

      <Button
        title="Clear completed"
        onClick={handleClearCompletedTodo}
      >
        <svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="24" height="24" viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet">
          <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill="#9baacf" stroke="none">
            <path d="M1977 4929 c-62 -15 -131 -55 -174 -102 -53 -57 -55 -63 -127 -252 l-61 -160 -505 -5 c-450 -4 -508 -7 -536 -22 -84 -46 -96 -154 -23 -224 l30 -29 1979 0 1979 0 30 29 c73 70 61 178 -23 224 -28 15 -86 18 -536 22 l-505 5 -61 162 c-34 89 -71 177 -83 196 -31 51 -96 106 -160 136 l-56 26 -565 2 c-311 1 -582 -3 -603 -8z m1132 -286 c11 -10 38 -65 60 -123 l39 -105 -324 -3 c-178 -1 -470 -1 -648 0 l-324 3 39 105 c22 58 49 113 60 123 20 16 61 17 549 17 488 0 529 -1 549 -17z" />
            <path d="M814 3599 c-51 -14 -91 -69 -99 -131 -3 -29 -5 -674 -3 -1433 l3 -1380 27 -81 c66 -194 226 -337 423 -379 104 -22 2685 -22 2789 0 200 42 357 183 424 379 l27 81 0 1427 c0 1425 0 1427 -21 1454 -11 15 -33 37 -48 48 l-27 21 -1732 2 c-1027 1 -1745 -2 -1763 -8z m3314 -1596 l-3 -1328 -23 -46 c-32 -65 -96 -125 -159 -149 -53 -20 -79 -20 -1383 -20 -1304 0 -1330 0 -1383 20 -63 24 -127 84 -159 149 l-23 46 -3 1328 -2 1327 1570 0 1570 0 -2 -1327z" />
            <path d="M3354 2524 c-20 -10 -186 -205 -468 -549 -241 -294 -441 -535 -444 -535 -4 0 -154 143 -333 319 -237 231 -336 322 -362 330 -114 38 -219 -90 -159 -195 20 -36 752 -756 797 -785 41 -26 104 -25 143 3 37 27 999 1202 1014 1238 15 39 4 108 -23 137 -47 50 -110 64 -165 37z" />
          </g>
        </svg>
      </Button>
    </div>
  );
};
