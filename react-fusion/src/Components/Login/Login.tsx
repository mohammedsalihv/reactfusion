import styles from './Login.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { useState } from 'react';

const Login: React.FC = () => {

    const  [action , setAction] = useState('Login')
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.text}>{action}</div>
        <div className={styles.underline}></div>
      </div>
      <div className={styles.inputs}>
        {action === 'Login' ? <div> </div> : <div className={styles.input}>
          <FontAwesomeIcon icon={faUser} size="lg" className={styles.icons} />
          <input type="text" placeholder="Username"/>
        </div>}
        <div className={styles.input}>
        <FontAwesomeIcon icon={faEnvelope} size="lg" className={styles.icons}/>
          <input type="email" placeholder="Email"/>
        </div>
        <div className={styles.input}>
        <FontAwesomeIcon icon={faLock} className={styles.icons} />
          <input type="password" placeholder="Password"/>
        </div>
      </div>
      {action === 'Sign Up' ? <div> </div> : <div className={styles.forgot}>Forgot password? <span>Click here!</span></div>}
      <div className={styles.submitContainer}>
        <div className={action === 'Login' ? styles.submitGray : styles.submit} onClick={()=> {setAction('Sign Up')}}>Login</div>
        <div className={action === 'Sign Up' ? styles.submitGray : styles.submit} onClick={()=> {setAction('Login')}}>Signup</div>
      </div>
    </div>
  );
};

export default Login;
