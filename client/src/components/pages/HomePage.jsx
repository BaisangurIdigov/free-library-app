import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { addRendBook, fetchBook } from "../../redux/features/book";
import style from "./style.module.css";
import Box from "@material-ui/core/Box";
import { Button, CircularProgress } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import { fetchUsersId } from "../../redux/features/users";
import { logger } from "redux-logger/src";

const useStyles = makeStyles((themes) => ({
  content: {
    width: "70%",
    height: "auto",
    marginTop: 100,
    marginLeft: "15%",
    marginRight: "15%",
  },
}));

export default function HomePage({ values }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.books.loading);
  const books = useSelector((state) => {
    return state.books.items.filter(
      (item) => item.name.toLowerCase().indexOf(values.toLowerCase()) !== -1
    );
  });
  const error = useSelector((state) => state.books.error);
  const userId = useSelector((state) => state.users.items._id);




  const handleAddRendBook = (id) => {
    dispatch(addRendBook(id));
  };

  useEffect(() => {
    dispatch(fetchBook());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchUsersId());
  }, [dispatch]);

  if (loading) {
    return (
      <div style={{ paddingLeft: "50%", marginTop: 100 }}>
        <CircularProgress />
      </div>
    );
  }
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Box className={classes.content}>
      <Box className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4">
        {books.map((item) => {
          return (
            <Box className="col" align="center">
              <div className={style.card}>
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
                      src={item.user.img}
                      alt=""
                    />
                    <h3 className={style.card__title}>{item.user.login}</h3>
                    <span className={style.card__status}>{item.name}</span>
                  </div>
                  <p className={style.card__description}>{item.description}</p>
                  <p className={style.card__description}>{item.rating}</p>
                  <NavLink
                    style={{ textDecoration: "none" }}
                    to={`/book/${item._id}`}
                  >
                    <Button>{"Открыть"}</Button>
                  </NavLink>
                  <Button onClick={() => handleAddRendBook(item._id)}>
                    {userId === item.rend?.userRend ? "✔" : "+"}
                  </Button>
                </div>
              </div>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
