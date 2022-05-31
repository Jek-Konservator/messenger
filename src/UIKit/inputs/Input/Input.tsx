import React from 'react';
import styles from "./Input.module.css"
import {TInput} from "./InputType";

export const Input = (props:TInput) => {
    return (
        <input className={styles.Input} {...props}/>
    );
};
