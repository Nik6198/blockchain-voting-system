import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, CardFooter } from 'reactstrap';
import ReactSvgPieChart from "react-svg-piechart"

class EO extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: true,
      bjp: 60,
      ncp: 30,
      congress: 10   
  };
  }
  
  render() {
    let data = [
      { title: "Congress", value: this.state.congress, color: "#F2F82A" },
      { title: "BJP", value: this.state.bjp, color: "#F8912A" },
      { title: "NCP", value: this.state.ncp, color: "#2AD9F8" },
    ]
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" md="12">
            <Card>
              <CardHeader style={{'backgroundColor':'white' }}>
                <i className="fa fa-align-justify"></i><strong>Status of Voting</strong>
                <b><i className="icon-emotsmile" style={{'color':'#F8912A','fontSize':'25px','paddingRight':'15px','paddingLeft':'57%'}}>BJP</i></b>
                <b><i className="icon-emotsmile" style={{'color':'#F2F82A','fontSize':'25px','paddingRight':'15px'}}>Congress</i></b>
                <b><i className="icon-emotsmile" style={{'color':'#2AD9F8','fontSize':'25px','paddingRight':'15px'}}>NCP</i></b>
              </CardHeader>
              <CardBody>
                <Row>
                <Col sm="3" md="3" lg="3"/>
                <Col sm="6" md="6" lg="6">
                <ReactSvgPieChart
                  data={data}
                />
                </Col>
                <Col sm="3" md="3" lg="3"/>
                </Row>
              </CardBody>
             
            </Card>
          </Col>
        </Row>

      </div>
    );
  }
}


export default EO;
