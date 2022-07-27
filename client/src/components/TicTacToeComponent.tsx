import React, { Fragment } from 'react';
import CellComponent from './CellComponent';
import styles from '../styles/TicTacToeComponent.module.css';

const field: number[][] = [
   [0, 1, 2],
   [3, 4, 5],
   [6, 7, 8]
];

const TicTacToeComponent = () => {
   return (
      <div className={styles.field}>
         {field.map((row, y) => (
            <Fragment key={row[y]}>
               {row.map((cell, x) => (
                  <CellComponent key={cell} />
               ))}
            </Fragment>
         ))}
      </div>
   );
};

export default TicTacToeComponent;
