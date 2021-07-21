import { Avatar, Box, Button, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchUsersId } from "../../redux/features/users";
import { auth } from '../../redux/features/application';

const useStyles = makeStyles((theme) => ({
  profileCard: {
    position: 'relative',
    width: 600,
    height: 370,
    marginLeft: "30%",
    marginRight: "30%",
    padding: 30,
    borderRadius: 50
  },
  large: {
    width: theme.spacing(30),
    height: theme.spacing(30),
  },
  profileItems: {

  },
  profileBox: {
    display: "flex",
  },
  userName: {
    position: 'absolute',
    left: 350,
    top: 40
  },
  userWallet: {
    position: 'absolute',
    bottom:10,
    right: 410
  }
}));

function Profile() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const users = useSelector(state => state.users.items)


  useEffect(() => {
    dispatch(fetchUsersId());
  }, [dispatch]);

  if (auth){
    return (
      <Paper
        className={classes.profileCard}
        style={{ marginTop: 50 }}
        elevation={3}
      >
        <Box className={classes.profileItems}>
          <Box className={classes.profileBox}>
            <Box>
              <Avatar src={users.img} className={classes.large} />
            </Box>
          </Box>
          <Box>
            <div className={classes.userName}>
              <h1>{users.login}</h1>
            </div>
            <hr/>
            <div className={classes.userWallet}>
            <h1>${' '}{users.wallet}</h1>
          </div>
          </Box>
          <Box>
            {/*<Button variant="contained" color="primary">*/}
            {/*  Edit Profile*/}
            {/*</Button>*/}
          </Box>
        </Box>
        <Box>

        </Box>
      </Paper>
    );
  }
  }


export default Profile;
