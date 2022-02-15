import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookById } from "../../../redux/features/book";
import { auth } from "../../../redux/features/application";
import { Avatar, CircularProgress, Paper } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import { fetchReviews } from "../../../redux/features/review";
import { fetchRatings } from "../../../redux/features/rating";
import BookCard from "./BookCard";
import BookRating from "./BookRating";
import BookReviews from "./BookReviews";

const useStyle = makeStyles((theme) => ({
  content: {
    width: "70%",
    height: "auto",
    marginTop: 100,
    marginLeft: "15%",
    marginRight: "15%",
  },
  display: {
    display: "flex",
    justifyContent: "space-between",
    padding: "1px 2px",
    alignItems: "center",
    width: "100%",
  },
  comments: {
    margin: 10,
    borderRadius: 30,
    display: "flex",
  },
  avatar: {
    margin: 10,
    borderRadius: 30,
    display: "flex",
    width: 100,
  },
  text: {
    padding: 10,
  },
}));

function Book(props) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const classes = useStyle();
  const loading = useSelector((state) => state.books.loading);
  const reviews = useSelector((state) => state.review.items);

  useEffect(() => {
    dispatch(fetchBookById(id));
  }, [id]);

  useEffect(() => {
    dispatch(fetchReviews(id));
  }, [id]);

  useEffect(() => {
    dispatch(fetchRatings(id));
  }, [id]);

  if (loading) {
    return (
      <div style={{ paddingLeft: "50%", marginTop: 100 }}>
        <CircularProgress />
      </div>
    );
  }

  if (auth) {
    return (
      <>
        <div className={classes.content}>
          <BookCard />
          <Box className={classes.display}>
            <BookRating />
            <BookReviews />
          </Box>
          <Box>
            {reviews.map((item) => {
              return (
                <>
                  <Paper className={classes.comments}>
                    <Avatar alt="Remy Sharp" src={item.user.img} />
                    <Box style={{ padding: 10 }}>{item.user.login} │</Box>
                    <Box className={classes.text}>{item.text}</Box>
                  </Paper>
                </>
              );
            })}
          </Box>
        </div>
      </>
    );
  }
}

export default Book;
