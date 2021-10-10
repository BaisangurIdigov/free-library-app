import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from 'react'
import { fetchBooks, removeBooks } from '../../redux/features/book'
import { Box, Button, CircularProgress, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import style from "./style.module.css";
import { fetchUsersId } from "../../redux/features/users";
import { auth } from "../../redux/features/application";
import { NavLink } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

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
  margin: {
    margin: theme.spacing(1),
  },
}));

export default function MyBooks({ myBooks }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false)
  const loading = useSelector((state) => state.books.loading);
  const books = useSelector((state) => {
    return state.books.items.filter(
      (item) => item.name.toLowerCase().indexOf(myBooks.toLowerCase()) !== -1
    );
  });
  const error = useSelector((state) => state.books.error);
  const users = useSelector((state) => state.users.items);

  const handleDeleteBook =(id)=> {
    dispatch(removeBooks(id))
  }

  useEffect(() => {
    dispatch(fetchBooks());
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

  if (auth) {
    return (
      <Box className={classes.content}>
        <Box className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4">
          {books.map((item) => {
            return (
              <Box className="col" align="center" key={item._id}>
                <Box>
                  <Paper elevation={20} className={style.card}>
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
                      {open ? (
                        <>
                          <Box>Удалить?</Box>
                          <Button variant="contained"
                                  style={{ marginBottom: 5 }}
                                  onClick={()=>setOpen(false)}>
                            отмена
                          </Button>
                          <Button variant="contained"
                                  color="secondary"
                                  style={{ marginBottom: 5 }}
                                  onClick={()=>handleDeleteBook(item._id)}
                            >
                            удалить
                          </Button>
                        </>
                      ) : (
                        <>
                          <NavLink
                            style={{ textDecoration: "none" }}
                            to={`/book/${item._id}`}
                          >
                            <Button variant="contained" style={{ marginBottom: 5 }}>
                              Открыть
                            </Button>
                          </NavLink>
                          <IconButton
                            aria-label="delete"
                            className={classes.margin}
                            onClick={()=>setOpen(true)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </>
                      )}
                    </div>
                  </Paper>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>
    );
  }
}
