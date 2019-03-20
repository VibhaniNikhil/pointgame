import React from "react";
// plugin that creates slider
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import GoogleMapComponent from '../../components/GoogleMapComponent';
import CustomInput from "components/CustomInput/CustomInput.jsx";
import basicsStyle from "assets/jss/material-kit-react/views/componentsSections/basicsStyle.jsx";

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
      lat: '',
      long: ''
    }
    
  }

  componentWillMount() {
    //Find our div containers in the DOM
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

        self.setState({x, y, z, r});
        // var html = 'Acceleration: <br />';
        // html += 'x: ' + x +' <br />y: ' + y + ' <br/>z: ' + z+ ' <br />';
        // html += 'Rotation rate: <br />';        

        // if(r!=null) html += 'alpha: ' + r.alpha +' <br />beta: ' + r.beta + ' <br/>gamma: ' + r.gamma + ' <br />';
        
        // dataContainerMotion.innerHTML = html;
      });
    }      
  }
  
  onRender() {
    const {alpha, beta, gamma, angle, newRotatedX, newRotatedZ, x, y, z, r} = this.state;

    return (<div>
      {(alpha!="" || beta!="" || gamma!="") && <div>alpha: {alpha} <br/>beta:  {beta} <br />gamma: {gamma} <br /> angle: {angle}<br />newRotatedX: {newRotatedX} <br /> newRotatedZ: {newRotatedZ}</div>}
      {(alpha=="" || beta=="" || gamma=="") && <div>No device orientation data</div>}
      
    </div>)
  }

  render() {
    const { classes } = this.props;

    const { lat, long, alpha, beta, gamma, angle, newRotatedX, newRotatedZ } = this.state;
    console.log("alpha, beta, gamma, angle, newRotatedX, newRotatedZ", alpha, beta, gamma, angle, newRotatedX, newRotatedZ);
    
    if(!lat && !long) {
      return "";
    }

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

export default withStyles(basicsStyle)(Home);
