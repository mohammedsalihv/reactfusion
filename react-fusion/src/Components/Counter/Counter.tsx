import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, reset } from "../../Redux/counterSlice";
import { RootState } from "../../Redux/Store";
import styles from "../Counter/Counter.module.css";

const Counter = () => {
  const count = useSelector((state: RootState) => state.counter.count);
  const dispatch = useDispatch();

  const handleIncrement = () => dispatch(increment());
  const handleDecrement = () => dispatch(decrement());
  const handleReset = () => dispatch(reset());

  return (
    <div className={styles.counter}>
      <div className={styles.card}>
        <h1 className={styles.counterH1}>Counter</h1>
        <h3
          className={styles.countH3}
          style={{
            background:
              count > 0
                ? `linear-gradient(45deg, white, rgba(255, 60, 172, ${
                    count * 0.05
                  }), rgba(248, 199, 78, ${count * 0.05}), rgba(0, 201, 255, ${
                    count * 0.05
                  }), rgba(120, 75, 160, ${count * 0.05}))`
                : "white",
          }}
        >
          Count: {count}
        </h3>

        <div className={styles.buttonCounterContainer}>
          <button className={styles.buttonCount} onClick={handleIncrement}>
            +
          </button>
          <button className={styles.buttonCount} onClick={handleReset}>
            Reset
          </button>
          <button className={styles.buttonCount} onClick={handleDecrement}>
            -
          </button>
        </div>
      </div>
    </div>
  );
};

export default Counter;
