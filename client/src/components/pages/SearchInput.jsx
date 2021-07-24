import React, { useState } from "react";
import ModalBookCreate from "../modal/ModalBookCreate";
import { Button, InputBase, Paper } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import SearchIcon from "@material-ui/icons/Search";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: "70%",
    height: "auto",
    marginTop: 50,
    marginLeft: "15%",
    marginRight: "15%",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 1,
  },
}));

function SearchInput({ setMyBooks }) {
  const classes = useStyles();
  const [opened, setOpened] = useState(false);

  const handleChangeInput = (e) => {
    setMyBooks(e.target.value);
  };

  return (
    <>
      <ModalBookCreate opened={opened} setOpened={setOpened} />
      <Paper component="form" className={classes.root}>
        <IconButton className={classes.iconButton} aria-label="menu">
          <MenuBookIcon />
        </IconButton>
        <InputBase
          className={classes.input}
          placeholder="Поиск книг"
          inputProps={{ "aria-label": "search Books" }}
          onChange={handleChangeInput}
        />
        <IconButton
          type="submit"
          className={classes.iconButton}
          aria-label="search"
        >
          <SearchIcon />
        </IconButton>
        <Button
          variant="contained"
          color="primary"
          disableElevation
          onClick={() => setOpened(true)}
        >
          Добавить новую книгу
        </Button>
      </Paper>
    </>
  );
}
export default SearchInput;
