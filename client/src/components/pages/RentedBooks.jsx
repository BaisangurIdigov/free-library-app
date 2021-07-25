import React, { useEffect } from "react";
import { auth } from "../../redux/features/application";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookRend, returningABook } from "../../redux/features/book";
import { Box, Button } from "@material-ui/core";
import style from "./style.module.css";
import { makeStyles } from "@material-ui/core/styles";
import { NavLink } from 'react-router-dom'

const useStyles = makeStyles((themes) => ({
  content: {
    width: "80%",
    height: "auto",
    marginTop: 100,
    marginLeft: "15%",
    marginRight: "15%",
  },
}));

export function RentedBooks(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const books = useSelector((state) => state.books.items);
  const users = useSelector((state) => state.users.items);
  useEffect(() => {
    dispatch(fetchBookRend());
  }, [dispatch]);

  const handleReturningABook = (id) => {
    dispatch(returningABook(id));
  };

  if (auth) {
    return (
      <Box className={classes.content}>
        <Box className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4">
          {books.map((item) => {
            return (
              <Box className="col" align="center">
                <NavLink to={`/book/${item._id}`} className={style.card}>
                  <img src={item.img} className={style.card__image} alt="" />
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
                        src={users.img}
                        alt=""
                      />

                      <h3 className={style.card__title}>{users.login}</h3>
                      <span className={style.card__status}>{item.name}</span>
                    </div>
                    <p className={style.card__description}>
                      {item.description}
                    </p>
                    <Button
                    className={style.card__description}
                    onClick={() => handleReturningABook(item._id)}
                    >
                    Вернуть книгу
                    </Button>
                  </div>
                </NavLink>
              </Box>
            );
          })}
        </Box>
      </Box>
    );
  }
}
