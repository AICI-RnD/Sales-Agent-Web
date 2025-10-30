import React, { useState, useEffect } from 'react';
import styles from './HomeMain.module.css';

const TypingEffect = ({ words, typeSpeed = 150, deleteSpeed = 100, delay = 2000 }) => {
  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];
    let timeoutId;

    if (isDeleting) {
      // Logic for deleting text
      timeoutId = setTimeout(() => {
        setText(currentWord.substring(0, text.length - 1));
      }, deleteSpeed);
    } else {
      // Logic for typing text
      timeoutId = setTimeout(() => {
        setText(currentWord.substring(0, text.length + 1));
      }, typeSpeed);
    }

    // Switch to deleting when word is fully typed
    if (!isDeleting && text === currentWord) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => setIsDeleting(true), delay);
    } 
    // Switch to typing next word when text is deleted
    else if (isDeleting && text === '') {
      setIsDeleting(false);
      setWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    }

    // Cleanup timeout on component unmount or state change
    return () => clearTimeout(timeoutId);
  }, [text, isDeleting, wordIndex, words, typeSpeed, deleteSpeed, delay]);

  return (
    <span className={styles.typedText}>
      {text}
    </span>
  );
};

export default TypingEffect;