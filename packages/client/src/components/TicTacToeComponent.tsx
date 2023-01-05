import React, { Fragment, FC } from 'react';
import CellComponent from './CellComponent';
import styles from '../styles/TicTacToeComponent.module.css';
import { TransitionGroup } from 'react-transition-group';

interface TicTacToeProps {
   turnHandler: (x: number, y: number) => void;
}

const field: number[][] = [
   [0, 1, 2],
   [3, 4, 5],
   [6, 7, 8]
];

const TicTacToeComponent: FC<TicTacToeProps> = ({ turnHandler }) => {
   return (
      <div className={styles.field}>
         {field.map((row, y) => (
            <Fragment key={row[y]}>
               {row.map((cell, x) => (
                  <TransitionGroup key={cell}>
                     <CellComponent clickHandler={() => turnHandler(x, y)} />
                  </TransitionGroup>
               ))}
            </Fragment>
         ))}
      </div>
   );
};

export default TicTacToeComponent;
