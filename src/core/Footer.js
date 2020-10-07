import React from "react";
import InstagramIcon from '@material-ui/icons/Instagram';
import { makeStyles } from '@material-ui/core/styles';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Typography from '@material-ui/core/Typography';
const useStyles = makeStyles((theme) => ({

footer:{
  backgroundColor:"#051c33",
  marginTop:50,
  textAlign:"center",
  paddingBottom:10
},
contact:{
  color:"#fff",
  textAlign:"center",
  marginTop:25
},
phone:{
  color:"#fff",
  textAlign:"center",
  "& :hover":{
    color:"#fff",
    textDecoration:"none"
  }
},
insta:{
  color:"#fff",
  height:50,
  width:50
},
link:{
  textAlign:"center"
}


}));

const Footer=()=>{
  const classes = useStyles();
  return(
  <div className={classes.footer}>
  <Container>
  <Row>
  <Col xs={12} md={6}>
    <Typography gutterBottom variant="h6" className={classes.contact}>
    Contact
    </Typography>
    <Typography gutterBottom variant="body1" className={classes.phone}>
    +91 6354589411
    </Typography>
    <Typography gutterBottom variant="body1" className={classes.phone}>
    +91 9099256713
    </Typography>
    <Typography gutterBottom variant="body1" className={classes.phone}>
    <a href="mailto:dreamycreations351a@gmail.com" className={classes.phone}>
    dreamycreations351@gmail.com
    </a>
    </Typography>
  </Col>
  <Col xs={12} md={6}>
    <Typography gutterBottom variant="h6" className={classes.contact}>
    Follow us
    </Typography>
    <a href="https://www.instagram.com/the.dreamy.creations/"className={classes.link}><InstagramIcon className={classes.insta}/></a>

  </Col>
  </Row>

  <Row>
  <Col xs={12} md={12}>
  <Typography gutterBottom variant="h6" className={classes.contact}>
  © Copyright {new Date().getFullYear()}
  </Typography>
  <Typography gutterBottom variant="h6" className={classes.phone}>
  Heli Vakharia
  </Typography>
  </Col>
  </Row>
  </Container>
  </div>)

}

export default Footer;
