import React, { useState } from "react";
import { Button, Paper } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { Rating } from "@material-ui/lab";
import { fetchRatings, postRatings } from "../../../redux/features/rating";
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from "react-router";
import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles((theme) => ({
  Button: {
    width: "100%",
  },
  ratingValue: {
    marginBottom: 50,
    padding: 3,
    height: "100%",
    textAlign: "center",
  },
}));

function BookRating(props) {
  const classes = useStyle();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);

  const handleRating = () => {
    dispatch(postRatings({ value, id }));
    // dispatch(fetchRatings({ id }));
    setValue("");
  };

  const handleChangeRating = (e) => {
    setValue(e.target.value);
  };

  return (
    <Paper mb={2} borderColor="transparent" className={classes.ratingValue}>
      <Box component="fieldset" mb={0} borderColor="transparent">
        <Typography component="legend">Оцените</Typography>
        <Rating
          name="simple-controlled"
          value={value}
          onChange={handleChangeRating}
        />
      </Box>
      <Box>
        <Button
          variant="contained"
          color="primary"
          className={classes.Button}
          onClick={handleRating}
        >
          Добавить
        </Button>
      </Box>
    </Paper>
  );
}

export default BookRating;
