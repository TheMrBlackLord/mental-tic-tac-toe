import React, { FC, useState, useMemo } from 'react';
import { CSSTransition } from 'react-transition-group';
import { useAppSelector } from '../hooks';
import styles from '../styles/CellComponent.module.css';

interface CellComponentProps {
   clickHandler: () => void;
}

const duration = 500;

const CellComponent: FC<CellComponentProps> = ({ clickHandler }) => {
   const { players, turning } = useAppSelector((state) => state);
   const [animationOn, setAnimationOn] = useState<boolean>(false);
   const handleClick = () => {
      if (turning === 'me') {
         clickHandler();
         setAnimationOn(true);
         setTimeout(() => setAnimationOn(false), duration);
      }
   }

   const char = useMemo(() => {
      if (players.me) {
         return `char${players.me.char.toUpperCase()}`;
      }
      return null;
   }, [players]);

   return (
      <CSSTransition
         timeout={duration}
         in={animationOn}
         classNames={{
            enter: styles[`${char}-enter`]
         }}
      >
         <div className={styles.cell} onClick={handleClick}></div>
      </CSSTransition>
   );
};

export default CellComponent;
