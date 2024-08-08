import React, { useCallback, useState } from 'react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import { useWallet } from '@solana/wallet-adapter-react';
import styles from '../styles/Signup.module.css';

const Signup = ({ signup }) => {
  const [username, setUsername] = useState('');
  const [profile, setProfile] = useState('');
  const { setVisible } = useWalletModal();
  const { connect, connecting, connected } = useWallet();

  const handleSignupClick = useCallback(() => {
    if (!connected) {
      setVisible(true);
    } else {
      // Log username and profile to the console
      console.log('Username:', username);
      console.log('Profile Image URL:', profile);
      signUpClicked();
    }
  }, [connected, setVisible, username, profile]);

  const signUpClicked = () => {
    console.log("SIGNING UP!");
    // Perform the signup action, like calling the signup function with username and profile
    signup(username, profile);
  };

  return (
    <div className={styles.authContainer}>
      <h1 className={styles.title}>Sign up to use TikTok</h1>
      <div className={styles.signupForm}>
        <div className={styles.inputField}>
          <div className={styles.inputTitle}>UserName</div>
          <div className={styles.inputContainer}>
            <input
              className={styles.input}
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </div>
        </div>
        <div className={styles.inputField}>
          <div className={styles.inputTitle}>Profile Image:</div>
          <div className={styles.inputContainer}>
            <input
              className={styles.input}
              type="text"
              value={profile}
              onChange={e => setProfile(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className={styles.loginButton} onClick={handleSignupClick}>
        Sign up
      </div>
    </div>
  );
};

export default Signup;
