import React, { useState, useEffect } from 'react';

const Toast = ({ message, setMessage, success=false, error=false, duration = 3000 }) => {
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (message) {
      setShowToast(true);

      const timer = setTimeout(() => {
        setShowToast(false);
      }, duration);
      const timer2 = setTimeout(() => {
        clearTimeout(timer);
        setMessage()
      }, duration+1000);

      return () => clearTimeout(timer2); 
    }
  }, [message, duration]);

  return (
    <div className={`toast-msg ${showToast ? 'show' : ''} ${success?"success":""} ${error?"error":""}`}>
      {message}
    </div>
  );
};

export default Toast;
