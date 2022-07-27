import React, { FC } from 'react';
import styles from '../styles/CellComponent.module.css';

interface CellComponentProps { }

const CellComponent: FC<CellComponentProps> = () => {
   return (
      <div className={styles.cell}>
         
      </div>
   );
};

export default CellComponent;
