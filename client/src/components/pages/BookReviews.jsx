import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookById, fetchBooks } from "../../redux/features/book";
import { auth } from "../../redux/features/application";
import { Button, InputBase, Paper, TextField } from '@material-ui/core'
const useStyle = makeStyles((theme) => ({
  content: {
    width: "70%",
    height: "auto",
    marginTop: 100,
    marginLeft: "15%",
    marginRight: "15%",
  },
  sizeImg: {
    width: 300,
  },
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: "100%"
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
    width: "100%"
  },
  Button: {
    marginLeft: 50
  },
  divider: {

  },
}));

function BookReviews(props) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const classes = useStyle();
  const books = useSelector((state) => state.books.currentItem);
  console.log(books);
  useEffect(() => {
    dispatch(fetchBookById({ id }));
  }, [dispatch]);

  if (auth) {
    return (
      <>
        <div className={classes.content}>
          <div className="card mb-3">
            <div className="row g-0">
              <div className="col-md-4">
                <img src={books.img} className={classes.sizeImg} alt="..." />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">{books.name}</h5>
                  <p className="card-text">
                    This is a wider card with supporting text below as a natural
                    lead-in to additional content. This content is a little bit
                    longer.
                  </p>
                  <p className="card-text">
                    <small className="text-muted">
                      Last updated 3 mins ago
                    </small>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <Paper component="form" className={classes.root}>
            <InputBase
              className={classes.input}
              placeholder="Comments"
              inputProps={{ "aria-label": "search google maps" }}
            />
            <Button variant="contained" color="primary" className={classes.Button}>
              Добавить
            </Button>
          </Paper>
        </div>
      </>
    );
  }
}

export default BookReviews;
