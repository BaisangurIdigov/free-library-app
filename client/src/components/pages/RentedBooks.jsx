import React from 'react';
import style from './style.module.css'
import { auth } from '../../redux/features/application';


export function RentedBooks(props) {

  if(auth) {
    return (
        <ul className={style.cards}>
              <li>
                <a href="" className={style.card}>
                  <img src={1} className={style.card__image} alt="" />
                  <div className={style.card__overlay}>
                    <div className={style.card__header}>
                      <svg
                        className={style.card__arc}
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path />
                      </svg>
                      <img
                        className={style.card__thumb}
                        src={1}
                        alt=""
                      />
                      <h3 className={style.card__title}>1}</h3>
                      <span className={style.card__status}>{1}</span>
                    </div>
                    <p className={style.card__description}>
                      {1}
                    </p>
                  </div>
                </a>
              </li>
        </ul>
    );
  }

}