import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookById } from "../../redux/features/book";
import { auth } from "../../redux/features/application";
import {
  Button,
  CircularProgress,
  InputBase,
  Paper,
} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import { Rating } from "@material-ui/lab";
import { postReviews } from '../../redux/features/review'
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
    padding: "1px 2px",
    display: "flex",
    alignItems: "center",
    width: "88%",
    height: "100%"
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
    width: "100%",
  },
  Button: {
    width: "100%",
  },
  rating: {
    marginBottom: 5,
    padding: 3,
    height: "100%"
  },
  display: {
    display: "flex",
    justifyContent: 'space-between',
    padding: "1px 2px",
    alignItems: "center",
    width: "100%",
  },
}));

function BookReviews(props) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const classes = useStyle();
  const books = useSelector((state) => state.books.currentItem);
  const loading = useSelector((state) => state.books.loading);
  const [value, setValue] = useState(0);
  const [comment, setComment] = useState("");;
  useEffect(() => {
    dispatch(fetchBookById({ id }));
  }, [dispatch]);

  // const handleRating =()=> {
  //   dispatch(fetchRating({value}))
  // }

  const handleComment =()=> {
    dispatch(postReviews({comment, id}))
  }

  const handleChangeRating = (e) => {
    setValue(e.target.value);
  };

  const handleChangeComment = (e) => {
    setComment(e.target.value);
  };

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
          <Box className={classes.display}>
            <Paper mb={3} borderColor="transparent" className={classes.rating}>
              <Rating
                name="simple-controlled"
                value={value}
                onChange={handleChangeRating}
              />
              <Box>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.Button}
                  // onClick={handleRating}
                >
                  Добавить
                </Button>
              </Box>
            </Paper>
            <Paper component="form" className={classes.root}>
              <InputBase
                className={classes.input}
                placeholder="Comments"
                inputProps={{ "aria-label": "search google maps" }}
                multiline
                rows={1}
                onChange={handleChangeComment}
              />
              <Box>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.Button}
                  onClick={handleComment}
                >
                  Добавить
                </Button>
              </Box>
            </Paper>
          </Box>
          <Box>
            <Paper>asdasd</Paper>
          </Box>
        </div>
      </>
    );
  }
}

export default BookReviews;
