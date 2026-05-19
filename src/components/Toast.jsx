import React, { useEffect } from 'react';
import { Info } from 'lucide-react';

export default function Toast({ message, visible, onHide }) {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        onHide();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [visible, onHide]);

  return (
    <div className={`toast ${visible ? 'show' : ''}`} id="toast">
      <Info size={16} className="text-blue-400" /> <span id="toast-msg">{message}</span>
    </div>
  );
}
