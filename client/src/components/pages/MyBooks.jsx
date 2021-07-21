import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { fetchBooks } from "../../redux/features/book";
import { Box, CircularProgress } from '@material-ui/core'
import { makeStyles } from "@material-ui/core/styles";
import style from "./style.module.css";
import { fetchUsersId } from "../../redux/features/users";
import { auth } from "../../redux/features/application";

const useStyles = makeStyles((theme) => ({
  content: {
    width: "70%",
    height: "auto",
    marginTop: 50,
    marginLeft: "15%",
    marginRight: "15%",
  },
  cardMedia: {
    width: 145,
    height: 200,
  },
  gridItem: {
    width: 200,
    height: 300,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

export default function MyBooks({ myBooks }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.books.loading);
  const books = useSelector((state) => {
    return state.books.items.filter(
      (item) => item.name.toLowerCase().indexOf(myBooks.toLowerCase()) !== -1
    );
  });
  const error = useSelector((state) => state.books.error);
  const users = useSelector((state) => state.users.items);

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchUsersId());
  }, [dispatch]);

  if (loading) {
    return (
      <div style={{paddingLeft: "50%", marginTop: 100}}>
        <CircularProgress  />
      </div>
    );
  }
  if (error) {
    return <div>{error}</div>;
  }

  if (auth) {
    return (
      <Box className={classes.content}>
        <Box className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4">
          {books.map((item) => {
            return (
              <Box className="col" align="center">
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
                  </div>
                </a>
              </Box>
            );
          })}
        </Box>
      </Box>
    );
  }
}
