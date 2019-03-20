import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react components for routing our app without refresh
import { Link } from "react-router-dom";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
// core components
import Header from "components/Header/Header.jsx";
import Footer from "components/Footer/Footer.jsx";
// sections for this page
import Home from "./Home.jsx";

import componentsStyle from "assets/jss/material-kit-react/views/components.jsx";

const styles = {
  ...componentsStyle,
  firstDiv: {
    margin: '97px 30px 0px !important'
  }
}

class Components extends React.Component {
  render() {
    const { classes, ...rest } = this.props;
    return (
      <div>
        <Header
          brand="Point Game"          
          fixed
          color="transparent"
          changeColorOnScroll={{
            height: 400,
            color: "white"
          }}
          {...rest}
        />
        <div className={classes.firstDiv}></div>
        <div className={classNames(classes.main, classes.mainRaised, classes.firstDiv)}>
          <Home />          
        </div>
        <Footer />
      </div>
    );
  }
}

export default withStyles(styles)(Components);
