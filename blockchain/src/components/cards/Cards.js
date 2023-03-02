import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Grid } from "@material-ui/core";
import UserIcon from "@material-ui/icons/Search";
import Avatar from "@material-ui/core/Avatar";
import Owner from "../images/Distributer.jpg";
import Distributer from "../images/Distributer.jpg";
import Supplier from "../images/Supplier1.jpg";
import Manufacturer from "../images/Manufacturer1.jpg";
import Transporter from "../images/Transporter2.jpg";

import Wholesaler from "../images/Wholesaler.jpg";

import SignIn from "../login/SignIn";
import { BrowserRouter as Router, NavLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root1: {
    maxWidth: 350,
    marginLeft: 30,
    marginBottom: 10,
    marginTop: 10,
  },
  root2: {
    marginTop: 10,
    marginBottom: 10,
    maxWidth: 350,
    marginLeft: 30,
  },
  root3: {
    marginTop: 10,
    marginBottom: 10,
    maxWidth: 350,
    marginLeft: 30,
  },
  root4: {
    marginBottom: 10,
    maxWidth: 350,
    marginLeft: 30,
  },
  root5: {
    marginBottom: 10,
    maxWidth: 350,
    marginLeft: 30,
  },
  root6: {
    marginBottom: 10,
    maxWidth: 350,
    marginLeft: 30,
  },
  media: {
    height: 280,
    paddingLeft: 20,
  },
  title: {
    fontSize: "30px",
    fontWeight: 700,
    lineHeight: 1.2,
    color: "#0D2239",
  },
  para: {
    textAlign: "center",
    fontSize: "16px",
    paddingLeft: "100px",
    paddingRight: "100px",
    color: "#374957",
  },
  herotext: {
    textAlign: "center",
    marginTop: "100px",
  },
  avatar: {
    margin: theme.spacing(1),
    background: "#0D2239",
  },
  searchbar: {
    display: "flex",
    alignItems: "center",

    justifyContent: "center",
  },
  search: {
    display: "flex",
    background: "#EFF3F6",
    flex: 1,
    padding: "5px",
    margin: "5%",
    justifyContent: "space-between",
    border: "solid 1px black",
    borderRadius: "12px",
  },
  input: {
    display: "flex",
    padding: "15px",
    textAlign: "center",
    border: "none",
    borderRadius: "12px",
    background: "#eeeeee",
    flex: 1,
    fontSize: "15px",
    fontWeight: 700,
    lineHeight: 1.2,
    color: "#0D2239",
  },
  herocont: {
    // display: "flex",
    // justifyContent: "center",
    // alignItems: "center",
    display: "grid",
    justifyItems: "center",
    gridTemplateColumns: "repeat(3, 220px)",

    alignItems: "center",
    margin: "auto",
  },

  user: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  img: {
    padding: "5px",
    border: "solid 3px #0d2239",
    borderRadius: "50%",
    width: "50%",
  },
  btn: {
    width: "80%",
    padding: "2px",
    margin: "5px",
    border: "solid 1px #0d2239",
    background: "#0d2239",
    color: "white",
  },
  center: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const handleClick = () => {
  return (
    <div>
      <SignIn />
    </div>
  );
};
function Cards() {
  const classes = useStyles();

  return (
    <Router style={{ background: "#FFFFFF" }}>
      <div className={classes.herotext}>
        <Typography variant="h1" className={classes.title}>
          Blockchain Enabled Supply Chain System <br></br>100% Visibility &
          Accountability
        </Typography>
        <p className={classes.para}>
          Easy product monitoring and tracking from production to consumers
          ensuring safety and efficacy
        </p>
      </div>
      <div className={classes.searchbar}>
        <div className={classes.search}>
          <input className={classes.input} placeholder="Search Everything..." />
          <Avatar className={classes.avatar}>
            <UserIcon style={{ background: "##EFF3F6" }} />
          </Avatar>
        </div>
      </div>
      <div className={classes.center}>
        <div className={classes.herocont}>
          <div className={classes.user}>
            <img className={classes.img} src="./user.png" />

            <Button className={classes.btn} href="/supplier">
              SUPPLIER
            </Button>
          </div>
          <div className={classes.user}>
            <img className={classes.img} src="./user.png" />

            <Button className={classes.btn} href="/manufacturer">
              MANUFACTURER
            </Button>
          </div>{" "}
          <div className={classes.user}>
            <img className={classes.img} src="./user.png" />

            <Button className={classes.btn} href="/transporter">
              TRANSPORTER
            </Button>
          </div>{" "}
          <div className={classes.user}>
            <img className={classes.img} src="./user.png" />

            <Button className={classes.btn} href="/wholesaler">
              WHOLESALER
            </Button>
          </div>{" "}
          <div className={classes.user}>
            <img className={classes.img} src="./user.png" />

            <Button className={classes.btn} href="/distributor">
              DISTRIBUTOR
            </Button>
          </div>
          <div className={classes.user}>
            <img className={classes.img} src="./user.png" />

            <Button className={classes.btn} href="/owner">
              REGULATOR
            </Button>
          </div>
        </div>
      </div>
    </Router>
  );
}
export default Cards;
