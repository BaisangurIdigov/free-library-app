import React, { useState } from 'react'
import { Button, InputBase, Paper } from '@material-ui/core'
import Box from '@material-ui/core/Box'
import { postReviews } from '../../../redux/features/review'
import { useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { useParams } from 'react-router'


const useStyle = makeStyles((theme) => ({
  root: {
    padding: "1px 2px",
    display: "flex",
    alignItems: "center",
    width: "88%",
    height: "100%",
    marginLeft: 15,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
    width: "100%",
  },
  Button: {
    width: "100%",
  },
}));


function BookReviews (props) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const classes = useStyle();
  const [comment, setComment] = useState("");

  const handleComment = () => {
    dispatch(postReviews({ comment, id }));
    setComment("");
  };

  const handleChangeComment = (e) => {
    setComment(e.target.value);
  };

  return (
    <Paper component="form" className={classes.root}>
      <InputBase
        className={classes.input}
        placeholder="Comments"
        inputProps={{ "aria-label": "search google maps" }}
        multiline
        rows={1}
        onChange={handleChangeComment}
        value={comment}
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
  )
}

export default BookReviews