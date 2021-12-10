import React, {
  createContext,
  ReactNode,
  useCallback,
  useState,
} from 'react';

import Toast from 'react-bootstrap/Toast';

import styles from './index.module.css';

const ToastContext = createContext<(toastMessage: string) => void>(null!);

export function ToastContextProvider({ children }: { children: ReactNode }) {
  const [show, setShow] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  const showToast = useCallback((toastMessage: string) => {
    setMessage(toastMessage);
    setShow(true);
  }, [setMessage, setShow]);

  return (
    <ToastContext.Provider value={showToast}>
      {children}

      <Toast
        className={styles.toast}
        bg="dark"
        show={show}
        delay={3000}
        autohide
        onClose={() => setShow(false)}
      >
        <Toast.Body className="text-white">{message}</Toast.Body>
      </Toast>
    </ToastContext.Provider>
  );
}

export default ToastContext;
