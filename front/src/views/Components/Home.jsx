import React from "react";
// plugin that creates slider
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import GoogleMapComponent from '../../components/GoogleMapComponent';
import CustomInput from "components/CustomInput/CustomInput.jsx";
import basicsStyle from "assets/jss/material-kit-react/views/componentsSections/basicsStyle.jsx";
import QueryString from 'query-string';
import axios from 'axios';
import {default as UUID} from "node-uuid";

var count = 0, update=false;

class Home extends React.Component {
  constructor(props) {
    super(props);    
    this.state = {
      alpha: "",
      beta: "",
      gamma: "",
      angle: "",
      newRotatedX: "",
      newRotatedZ:"",
      x:"",
      y:"",
      z:"",
      r:"",
      lat: 23.083960599999997,
      long: 72.5290442,
      search: '',
      unique_id: '',
    }

    this.getUser = this.getUser.bind(this);
  }

  componentWillMount() {        

    if(!localStorage.userId) {
      localStorage.userId = UUID.v4();
    }

    setInterval(() => {
      const {lat, long, unique_id, alpha, beta, gamma, angle, newRotatedX, newRotatedZ, x, y, z, r} = this.state;
        
      if(localStorage.userId!="" && localStorage.userId!=undefined && localStorage.userId!=null) {
        axios(`${process.env.REACT_APP_API_URL}/getCurrent/${localStorage.userId}`).then((res) => {
          if(res.data.data.length > 0) {
            const {firstAngle, secondAngle} = res.data.data[0]?res.data.data[0]:{};
            var difference = secondAngle - firstAngle;
            if(difference < -180) {
              difference += 360;
            }

            if(difference > 180) {
              difference -= 360;
            }
            
            if(difference > 70  && difference < 72 ) {
              alert("Your mobile device seems to be pointed in direction to other mobile")
            }
          }
        })
      }
      
      // getCurrent
      
      if(alpha!="" || beta!="" || gamma!="" && count == 0 && update) {
        if(!unique_id) {
          this.getUser()
          update = false;
        } else {        
          let obj = {unique_id, alpha, beta, gamma, angle, rotate_x: newRotatedX, rotate_y: newRotatedZ, latitude: lat, longitude: long};
          update = false;
          axios.put(`${process.env.REACT_APP_API_URL}/updateUser/${unique_id}`, obj)
          count = 0;
        }
      }
    }, 10000)
    // var aR = Math.atan2(95.79726622339359, 273.1344826697124);
    // var aD = aR * (180 / Math.PI);
    // aD -= 270;
    // while (aD < 0)
    // {
    //     aD += 360;
    // }

    // Find our div containers in the DOM
    // var dataContainerOrientation = document.getElementById('dataContainerOrientation');
    // var dataContainerMotion = document.getElementById('dataContainerMotion');
    let self = this;
    //Check for support for DeviceOrientation event
    if(window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', function(event) {
             
         var alpha = event.alpha;
         var beta = event.beta;
         var gamma = event.gamma;
         var heading  = 360 - alpha;
         
         navigator.geolocation.getCurrentPosition((res) => {
            var lat = res.coords.latitude,	// Latitude
            lon = res.coords.longitude, 	// Longitude
            z = 12,	// Zoom level
            latRad,
            n,
            xTile,
            yTile;
            
            self.setState({lat, long: lon})

            latRad = lat * Math.PI / 180;
            n = Math.pow(2, z);
            let objFinalPosX = n * ((lon + 180) / 360);
            let objFinalPosZ = n * (1-(Math.log(Math.tan(latRad) + 1/Math.cos(latRad)) /Math.PI)) / 2;

            let angle = heading;
            let newRotatedX = objFinalPosX * Math.cos(angle) - objFinalPosZ * Math.sin(angle);
            let newRotatedZ = objFinalPosZ * Math.cos(angle) + objFinalPosX * Math.sin(angle);            
            if(alpha!=null || beta!=null || gamma!=null)
              self.setState({alpha, beta, gamma, angle, newRotatedX, newRotatedZ});
            //     dataContainerOrientation.innerHTML = `alpha: ${alpha} <br/>beta:  ${beta} <br />gamma: ${gamma} <br /> angle: ${angle}<br />newRotatedX: ${newRotatedX} <br /> newRotatedZ: ${newRotatedZ}`;     
         });
      }, false);
    }

    // Check for support for DeviceMotion events
    if(window.DeviceMotionEvent) {
      window.addEventListener('devicemotion', function(event) {
        var x = event.accelerationIncludingGravity.x;
        var y = event.accelerationIncludingGravity.y;
        var z = event.accelerationIncludingGravity.z;
          var r = event.rotationRate;

        // self.setState({x, y, z, r});
        // var html = 'Acceleration: <br />';
        // html += 'x: ' + x +' <br />y: ' + y + ' <br/>z: ' + z+ ' <br />';
        // html += 'Rotation rate: <br />';        

        // if(r!=null) html += 'alpha: ' + r.alpha +' <br />beta: ' + r.beta + ' <br/>gamma: ' + r.gamma + ' <br />';
        
        // dataContainerMotion.innerHTML = html;
      });
    }      
  }

  componentWillUpdate() {
    update = true;
  }

  getUser = async () => {
    count += 1;
    
    if(localStorage.userId!="" && localStorage.userId!=undefined && localStorage.userId!=null) {
      let data = await axios.get(`${process.env.REACT_APP_API_URL}/getOneUser/${localStorage.userId}`);
      this.setState({unique_id: ''});
      if(data.data.data && data.data.data.length > 0) {
        const { unique_id } = data.data.data;
        this.setState({unique_id});
        count = 0
      } else {
        const {lat, long, unique_id, alpha, beta, gamma, angle, newRotatedX, newRotatedZ, x, y, z, r} = this.state;
        let obj = {unique_id, alpha, beta, gamma, angle, rotate_x: newRotatedX, rotate_y: newRotatedZ, latitude: lat, longitude: long};
        obj.unique_id = localStorage.userId;
        await axios.post(`${process.env.REACT_APP_API_URL}/addLocation`, obj).then(res => {
          this.setState({unique_id: localStorage.userId});
          count = 0
        })
      }
    }
  }
  
  onRender = () => {
    const {lat, long, unique_id, alpha, beta, gamma, angle, newRotatedX, newRotatedZ, x, y, z, r} = this.state;

    return (<div>
      {(alpha!="" || beta!="" || gamma!="") && <div>alpha: {alpha} <br/>beta:  {beta} <br />gamma: {gamma} <br /> angle: {angle}<br />newRotatedX: {newRotatedX} <br /> newRotatedZ: {newRotatedZ}</div>}
      {(alpha=="" || beta=="" || gamma=="") && <div>No device orientation data</div>}
    </div>)
  }
  
  render() {
    const { classes } = this.props;
    
    const { lat, long, alpha, beta, gamma, angle, newRotatedX, newRotatedZ } = this.state;

    return (
      <div className={classes.sections}>
        <div className={classes.container}>
          <div className={classes.space50} />          
          <div>
            <GridContainer>
              <GridItem xs={12} sm={12} md={6} lg={6} style={{marginBottom: 10}}>
                {this.onRender()}
              </GridItem>
              <GridItem xs={12} sm={12} md={12} lg={12}>
                  <GoogleMapComponent lat={lat} long={long}/>
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
    );
  }
}

Home.contextTypes = {
  router: PropTypes.object
};

export default withStyles(basicsStyle)(Home);
