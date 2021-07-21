import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { fetchBook } from "../../redux/features/book";
import style from "./style.module.css";

const useStyles = makeStyles((themes) => ({
  content: {
    width: "70%",
    height: "auto",
    marginTop: 100,
    marginLeft: "15%",
    marginRight: "15%",
  },
  cardMedia: {
    width: 145,
    height: 200,
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

  useEffect(() => {
    dispatch(fetchBook());
  }, [dispatch]);

  if (loading) {
    return <div>loading...</div>;
  }
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <ul className={style.cards}>
      {books.map((item) => {
        return (
          <li>
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
                    src={item.user.img}
                    alt=""
                  />

                  <h3 className={style.card__title}>{item.user.login}</h3>
                  <span className={style.card__status}>{item.name}</span>
                </div>
                <p className={style.card__description}>{item.description}</p>
              </div>
            </a>
          </li>
        );
      })}
    </ul>
  );
}
