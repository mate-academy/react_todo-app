/* eslint-disable max-len */
import { useEffect, useState, useRef } from 'react';
import { AnimatePresence, Reorder, motion } from 'framer-motion';
import { Todo } from '../../types/Todo';
import { Filter } from '../../types/Filter';
import styles from './TodoItem.module.scss';

type Props = {
  todo: Todo,
  todos: Todo[],
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
  setFilter: React.Dispatch<React.SetStateAction<Filter>>,
  handleToggleTodo: (id: string) => void,
  handleDeleteTodo: (id: string) => void,
};

export const TodoItem: React.FC<Props> = ({
  todo,
  todos,
  handleToggleTodo,
  handleDeleteTodo,
  setTodos,
  setFilter,
}) => {
  const { id, text, completed } = todo;
  const [isCompleted, setIsCompleted] = useState(completed);
  const [isEditTodo, setIsEditTodo] = useState(false);
  const [newText, setNewText] = useState(text);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditTodo]);

  useEffect(() => {
    setTimeout(() => {
      setIsCompleted(completed);
    }, 1000);
  }, [completed]);

  const handleEditTodo = () => {
    setIsEditTodo(false);

    if (newText === text || !newText.trim()) {
      setNewText(text);

      return;
    }

    setFilter(Filter.All);

    setTodos(todos.map(t => {
      return t.id === id
        ? { ...t, text: newText }
        : { ...t };
    }));
  };

  const handleSubmitEditTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    handleEditTodo();
  };

  const handleInputKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === 'Escape') {
      setNewText(text);
      setIsEditTodo(false);
    }
  };

  return (
    <Reorder.Item
      className={styles.todoItem}
      value={todo}
      key={id}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ x: -560, opacity: 0 }}
      transition={{ duration: 0.5 }}
      whileDrag={{
        scale: 1.1,
        boxShadow: 'rgba(0, 0, 0, 0.3) 0 19px 38px, rgba(0, 0, 0, 0.22) 0 15px 12px',
      }}
    >
      <div className={styles.container}>
        <input
          type="checkbox"
          className={styles.checkbox}
          onChange={() => handleToggleTodo(id)}
          checked={completed}
        />
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
          <use xlinkHref="#line" className={styles.line} />
          <use xlinkHref="#box" className={styles.box} />
          <use xlinkHref="#check" className={styles.check} />
          {!isCompleted && (
            <use xlinkHref="#circle" className={styles.circle} />
          )}
        </svg>

        {isEditTodo ? (
          <form onSubmit={handleSubmitEditTodo}>
            <input
              type="text"
              className="todo__title-field"
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
              onBlur={handleEditTodo}
              onKeyUp={handleInputKeyUp}
              ref={inputRef}
            />
          </form>
        ) : (
          <p className={styles.text}>
            {text}
          </p>
        )}

      </div>

      <div className={styles.buttonBox}>
        <AnimatePresence initial={false}>
          {!completed && (
            <motion.button
              type="button"
              initial={{ rotate: -45, x: 15, opacity: 0 }}
              animate={{ rotate: 0, x: 0, opacity: 1 }}
              exit={{ rotate: -45, x: 15, opacity: 0 }}
              transition={{ duration: 0.5 }}
              onClick={() => setIsEditTodo(true)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22px"
                height="22px"
                viewBox="0 0 1024 1024"
                version="1.1"
              >
                <path d="M816.762587 448.629717c-0.375553 0.376577-2.031263-0.674359-3.701299-2.339278L579.471183 212.69624c-1.670036-1.664919-2.714831-3.324722-2.343371-3.701299l52.626591-52.622498c0.376577-0.376577 2.036379 0.668219 3.701299 2.339278L867.050923 392.300804c1.664919 1.670036 2.714831 3.325745 2.339278 3.701299L816.762587 448.629717 816.762587 448.629717zM816.762587 448.629717" />
                <path d="M931.972539 200.972221 823.67195 92.671633c-27.267017-27.265994-66.552765-33.935903-96.001471-18.822694-6.191003 3.174296-11.95324 7.290033-17.070794 12.406564l-32.269961 32.270984c-2.334161 2.334161-4.439102 4.813632-6.368034 7.392364 0.37146 0.48914 0.830925 1.020236 1.362021 1.553379L897.270179 351.416652c0.493234 0.493234 0.981351 0.918929 1.440815 1.27504 2.582825-1.928932 5.068436-4.03899 7.401574-6.377244l32.270984-32.269961c5.116531-5.116531 9.232269-10.883885 12.411681-17.074887C965.908442 267.524986 959.234439 228.232075 931.972539 200.972221L931.972539 200.972221zM931.972539 200.972221" />
                <path d="M397.547807 866.394473c-1.460258 5.259794 378.662179-375.505279 378.662179-375.505279 2.696412-2.695389 4.594645-5.164626 4.242627-5.517667l-49.423643-49.424666c-0.352017-0.350994-2.822278 1.549286-5.517667 4.243651L352.77509 813.435307c-0.145309 0.151449-8.470929 4.995781-8.612145 5.14109 0 0-143.467529 41.679261-147.080823 41.909505-3.004427 0.193405-18.252713-17.070794-18.252713-17.070794s-14.283308-12.700253-14.283308-15.771195 45.566802-156.617014 45.566802-156.617014l370.94952-373.239679c2.695389-2.695389 4.614088-5.146207 4.282536-5.478781l-46.225811-46.225811c-0.326435-0.327458-2.783393 1.587148-5.478781 4.281513L156.081313 627.932406c-0.346901 0.346901-5.273097 5.336542-5.834892 7.278777L70.856279 902.963343c-3.520173 5.551436-5.565762 12.133342-5.565762 19.194154 0 19.829628 16.074094 35.908838 35.908838 35.908838 6.719028 0 13.002129-1.851161 18.378579-5.063319 0.630357 0.11154 1.839905-0.033769 3.192715-0.424672 0 0 256.611425-75.181283 260.708743-78.507028" />
                <path d="M687.649997 392.72036l-61.518099-61.519122c-0.440022-0.438998-2.954285 1.363044-5.614881 4.024663L247.6928 708.050118c-2.143826 2.143826-3.710508 4.174066-4.013407 5.116531l50.448996 11.294231c2.554172 0.9967 4.498454 3.213181 5.107321 5.938246 0.078795 0.356111 0.13303 0.717338 0.166799 1.087774l6.703679 43.506886c1.060145-0.547469 2.833535-1.969864 4.697999-3.833305L683.627381 398.335241C686.287977 395.675668 688.090019 393.160381 687.649997 392.72036L687.649997 392.72036zM687.649997 392.72036" />
              </svg>
            </motion.button>
          ) }
        </AnimatePresence>

        <button type="button" onClick={() => handleDeleteTodo(id)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20px"
            height="20px"
            viewBox="0 0 1025 1024"
            version="1.1"
          >
            <path d="M186.920635 243.421387 186.920635 243.421387 186.920635 951.245283C186.920635 951.098024 186.679161 950.857143 186.59716 950.857143L845.529827 950.857143C845.398521 950.857143 845.206352 951.049267 845.206352 951.245283L845.206352 243.421387C845.206352 243.568639 845.447826 243.809524 845.529827 243.809524L186.59716 243.809524C186.728463 243.809524 186.920635 243.617403 186.920635 243.421387L186.920635 243.421387ZM113.777778 243.421387C113.777778 203.240064 146.314425 170.666666 186.59716 170.666666L845.529827 170.666666C885.746856 170.666666 918.34921 203.076334 918.34921 243.421387L918.34921 951.245283C918.34921 991.426604 885.81256 1024 845.529827 1024L186.59716 1024C146.380126 1024 113.777778 991.590334 113.777778 951.245283L113.777778 243.421387 113.777778 243.421387Z" />
            <path d="M386.031746 73.252577 386.031746 73.252577 386.031746 154.302978C386.031746 154.635673 385.810757 154.412698 385.357221 154.412698L679.2777 154.412698C678.458986 154.412698 678.603175 154.267697 678.603175 154.302978L678.603175 73.252577C678.603175 72.919883 678.824164 73.142857 679.2777 73.142857L385.357221 73.142857C386.175934 73.142857 386.031746 73.287858 386.031746 73.252577L386.031746 73.252577ZM312.888889 73.252577C312.888889 32.796296 345.874502 0 385.357221 0L679.2777 0C719.300854 0 751.746033 32.603163 751.746033 73.252577L751.746033 154.302978C751.746033 194.759259 718.760419 227.555555 679.2777 227.555555L385.357221 227.555555C345.334066 227.555555 312.888889 194.952392 312.888889 154.302978L312.888889 73.252577 312.888889 73.252577Z" />
            <path d="M678.603175 329.142857 735.492067 329.142857 735.492067 841.142857 678.603175 841.142857 678.603175 329.142857ZM495.746032 329.142857 552.634921 329.142857 552.634921 841.142857 495.746032 841.142857 495.746032 329.142857ZM312.888889 329.142857 369.777778 329.142857 369.777778 841.142857 312.888889 841.142857 312.888889 329.142857ZM995.543625 170.666666C1011.259648 170.666666 1024 183.861111 1024 199.111111 1024 214.820544 1011.052859 227.555555 995.543625 227.555555L28.456375 227.555555C12.740353 227.555555 0 214.361111 0 199.111111 0 183.401678 12.947144 170.666666 28.456375 170.666666L995.543625 170.666666Z" />
          </svg>
        </button>
      </div>
    </Reorder.Item>
  );
};
