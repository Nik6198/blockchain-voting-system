import React, { Component } from 'react';
import { Alert,Button,  Card, CardBody, CardHeader, CardFooter, Col, Row, UncontrolledTooltip } from 'reactstrap';
import { SocialIcon } from 'react-social-icons';
import './Appp.css';
class Voter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: true,
    };

    this.onDismiss = this.onDismiss.bind(this);
  }

  onDismiss() {
    this.setState({ visible: false });
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" sm="6" lg="4" style={{'text-align':'center'}}>
            <Button color="success" size="lg">Vote</Button>
          </Col>
          <Col xs="12" sm="6" lg="4" style={{'text-align':'center'}}>
            <Button color="success" size="lg">Vote</Button>
          </Col>
          <Col xs="12" sm="6" lg="4" style={{'text-align':'center'}}>
            <Button color="success" size="lg">Vote</Button>
          </Col>
        </Row>
        <Row style={{'margin': '30px 0px 0px 0px'}}>
          <Col xs="12" sm="6" lg="4" style={{'text-align':'center'}}>
            <div>
              <img src={require("./member1.jpeg")} className="img-size" id="t1"/>
              <UncontrolledTooltip placement="top" target="t1">
                <div className="toolt">
                <p>Name:<br/> Dinesh Pawar</p><p>Party Name:<br/> BJP</p>
                <p><b>Objectives:<br/></b>1)Increased Water <br/>Supply<br/>
                2)Reduce Poverty<br/> Line</p>
              </div>
              </UncontrolledTooltip>
            </div>
          </Col>

          <Col xs="12" sm="6" lg="4" style={{'text-align':'center'}}>
            <img src={require("./member2.jpg")} className="img-size" id="t2"/>
            <UncontrolledTooltip placement="top" target="t2">
            <div className="toolt">
                <p>Name:<br/>Supriya Datta</p><p>Party Name:<br/> NCP</p>
                <p><b>Objectives:<br/></b>1)Strengthen<br/> Economic Growth<br/>
                2)Central <br/>Identification System</p>
              </div>
            </UncontrolledTooltip>
          </Col>

          <Col xs="12" sm="6" lg="4" style={{'text-align':'center'}}>
            <img src={require("./member3.jpeg")} className="img-size" id="t3"/>
            <UncontrolledTooltip placement="top" target="t3">
            <div className="toolt">
                <p>Name:<br/> Lokesh Gaikwad</p><p>Party Name:<br/> AAP</p>
                <p><b>Objectives:<br/></b>1)Cleanliness And<br/> Hygiene Management<br/>
                2)Digitalization</p>
              </div>
            </UncontrolledTooltip>
          </Col>
        </Row>
        <br/><br/><br/><br/><br/><br/><br/><br/><br/>
        <br/><br/><br/><br/><br/><br/><br/><br/><br/>
      </div>
    );
  }
}


export default Voter;
