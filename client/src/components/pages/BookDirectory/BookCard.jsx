import React from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { Rating } from "@material-ui/lab";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";

const useStyle = makeStyles((theme) => ({
  sizeImg: {
    width: 300,
  },
  rating: {
    display: "flex",
    padding: 5,
  },
}));

function BookCard(props) {
  const classes = useStyle();
  const books = useSelector((state) => state.books.currentItem);

  const rating = useSelector((state) => {
    const getRatingByBookId = state.rating.items;
    if (getRatingByBookId.length === 0) {
      return 0;
    }
    return (
      getRatingByBookId.reduce((value, item) => {
        if (!item.number) {
          return 0;
        }
        return item.number + value;
      }, 0) / getRatingByBookId.length
    );
  });

  return (
    <div className="card mb-3">
      <div className="row g-0">
        <div style={{ width: 300 }}>
          <img src={books.img} className={classes.sizeImg} alt="..." />
          <Box
            component="fieldset"
            mb={0}
            borderColor="transparent"
            className={classes.rating}
          >
            <Typography component="legend">Рейтинг:</Typography>
            <Rating
              name="customized-empty"
              precision={0.5}
              emptyIcon={<StarBorderIcon fontSize="inherit" />}
              value={rating}
            />
          </Box>
        </div>
        <div className="col-md-6 ">
          <div className="card-body">
            <h5 className="card-title">{books.name}</h5>
            <p className="card-text">
              Описание: {' '}{books.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookCard;
