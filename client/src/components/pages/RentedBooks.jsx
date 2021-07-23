import React, { useEffect } from "react";
import { auth } from "../../redux/features/application";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookRend } from '../../redux/features/book';
import { Box } from '@material-ui/core';
import style from './style.module.css'
export function RentedBooks(props) {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.books.items);
  useEffect(() => {
    dispatch(fetchBookRend());
  }, [dispatch]);



  if (auth) {
    return (
      <Box className="col" align="center" style={{marginTop: 100}}>
        {books.map(item => {
          return (
            <a href="" className={style.card}>
              <img src={item.img} className={style.card__image} alt="" />
              <div className={style.card__overlay}>
                <div className={style.card__header}>
                  <svg
                    className={style.card__arc}
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path />
                  </svg>
                  <h3 className={style.card__title}>{item.name}</h3>

                </div>
                <p className={style.card__description}>
                  {item.description}
                </p>
              </div>
            </a>
          )
        })}
      </Box>
    )
  }
}
