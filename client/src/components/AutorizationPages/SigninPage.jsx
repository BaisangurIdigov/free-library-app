import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import {
  Box,
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
} from "@material-ui/core";
import { auth } from "../../redux/features/application";
import clsx from "clsx";
import IconButton from "@material-ui/core/IconButton";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { NavLink } from "react-router-dom";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  display: {
    display: "flex",
    justifyContent: "center",
  },
  signupUp: {
    position: "absolute",
    top: 200,
    textAlign: "center",
    padding: 50,
  },
  input: {
    left: 20,
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: "25ch",
  },
  mTop: {
    marginTop: 50,
    marginBottom: 50,
  },
}));

export default function SigninPage() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState({
    password: "",
    showPassword: false,
  });

  const signingIn = useSelector((state) => state.application.signingIn);
  const error = useSelector((state) => state.application.error);

  const handleClickShowPassword = () => {
    setPassword({ ...password, showPassword: !password.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleChangeLogin = (e) => {
    setLogin(e.target.value);
  };
  const handleChangePassword = (prop) => (event) => {
    setPassword({ ...password, [prop]: event.target.value });
  };
  const handleSubmit = () => {
    dispatch(auth(login, password.password));
  };
  return (
    <div
      style={{ width: "auto", position: "relative" }}
      className={classes.display}
    >
      <Paper elevation={5} className={classes.signupUp}>
        {error ? <Alert severity="error">{error}</Alert> : ""}

        <h1>Вход</h1>
        <Box>
          <TextField
            label="Login"
            id="outlined-start-adornment"
            className={clsx(classes.margin, classes.textField)}
            variant="outlined"
            value={login}
            onChange={handleChangeLogin}
          />
          <FormControl
            className={clsx(classes.margin, classes.textField)}
            variant="outlined"
          >
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={password.showPassword ? "text" : "password"}
              value={password.password}
              onChange={handleChangePassword("password")}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {password.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={70}
            />
          </FormControl>
        </Box>
        <Box>
          <Button
            variant="contained"
            color="primary"
            disableElevation
            onClick={handleSubmit}
            className={classes.mTop}
          >
            Войти
          </Button>
        </Box>
        <Box>
          <NavLink to={"/singup"}>Хотите зарегаться?</NavLink>
        </Box>
      </Paper>
    </div>
  );
}
