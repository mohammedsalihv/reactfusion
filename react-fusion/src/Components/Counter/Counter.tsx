import { useSelector , useDispatch } from "react-redux"
import { increment , decrement , reset } from "../../Redux/counterSlice"
import { RootState } from "../../Redux/Store"
import styles from '../Counter/Counter.module.css'


const Counter = () =>{
    const count = useSelector((state : RootState) => state.counter.count)
    const dispatch = useDispatch()

    const handleIncrement = (() => dispatch(increment()))
    const handleDecrement = (() => dispatch(decrement()))
    const handleReset = (() => dispatch(reset()))

    const backgroundStyle = {
        background: `linear-gradient(to right, rgba(255, 0, 0, 0) ${count}%, rgba(255, 0, 0, 1) ${count}%)`,
      };

    return (
        <div className={styles.counter} style={backgroundStyle}>
             <h1>Counter</h1>
            <div>
                <h3>Count : {count}</h3>
                <button className={styles.button} onClick={handleIncrement}>+</button>
                <button className={styles.button} onClick={handleReset}>reset</button>
                <button className={styles.button} onClick={handleDecrement}>-</button>
            </div>
        </div>
    )
}   

export default Counter;