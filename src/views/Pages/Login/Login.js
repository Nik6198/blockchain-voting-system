import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Button, Card,FormGroup, Label, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import './login.css';
import axios from 'axios';
export let userdescription = "";
class Login extends Component {
  constructor(props){
    super(props);
    this.login = this.login.bind(this);
     this.resend = this.resend.bind(this);
     this.handle_change = this.handle_change.bind(this);
     this.toggle = this.toggle.bind(this);
     this.toggle_election = this.toggle_election.bind(this);
     this.handle_electiontype = this.handle_electiontype.bind(this);
     this.handle = this.handle.bind(this);
     this.state = {
      dropdownOpen: false,
      dropdownOpen_election:false,
        "account_type": "User",
        "election_type": "Lok Sabha",
        enable : true
     }
  }
  handle_change(e) {
    this.setState({
      [e.target.name]: e.target.value
  })}
  handle(e) {
    let account_type = e.target.name
  this.setState({account_type})
  console.log(account_type)
  }
  handle_electiontype(e){
    let election_type = e.target.name;
    this.setState({election_type});
    console.log(election_type);
  }
  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  toggle_election(){
    this.setState(prevState => ({
      dropdownOpen_election: !prevState.dropdownOpen_election
    }));
  }

  resend(){
    axios.post('http://localhost:3002/send/',this.state)
       .then((result)=> {
        let enable = false;
        this.setState({enable});
       })
       .catch(err => alert("Wrong Email/Password"));
    //this.login();
    console.log("resend");
  }

   async login(arg="none")
   {
     //validation logic here
     console.log(this.state);
     console.log("logib"); 
     if(this.state.enable || (!this.state.otp)) {
       axios.post('http://localhost:3002/send/',this.state)
       .then((result)=> {
        let enable = false;
        this.setState({enable});
       })
       .catch(err => alert("Wrong Email/Password"));
     }
     else{
      let f = true;
      const result = await axios.post('http://localhost:3002/send/verify',this.state)
          if(!result) return alert("erroe");
          if(result.data === "verified"){
            f = false;
            console.log("verifiedddd ",f);
          } 
          else{
            console.log(result);
          }
        
        
      if(!f){
          console.log("yolo");
          axios.post('http://localhost:3002/authorization', this.state)
            .then((result) => {
              console.log(result)
              if(this.state.account_type == "Voter")
              {
                  userdescription="Voter";
                  return this.props.history.push('/voter')
              }
              else 
              {
                userdescription="EO";
                return this.props.history.push('/election_officer')
              }
           
            })
            .catch(err => alert("Wrong Email/Password"));
      }
      else console.log("etf");
  }
}
  
  render() {
    return (
      <div>
        <Row className="App-header1">
          <Col xs="12" sm="12" lg="12">
          </Col>
        </Row>
        <Row className="App-header2">
          <Col xs="12" sm="12" lg="12">
          </Col>
        </Row>
        <Row className="App-header3">
          <Col xs="12" sm="12" lg="12">
          </Col>
        </Row>
      <div className="app flex-row align-items-center pad">
        <Container>
          <Row className="justify-content-center">
            <Col md="5">
              <CardGroup>
                <Card className="p-4 shadow">
                  <CardBody>
                    <Form>
                      <h1>Login</h1>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" placeholder="Aadhar Number"  name="aadharno" onChange={this.handle_change}/>
                      </InputGroup>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" placeholder="Password" onChange={this.handle_change} name="password"/>
                      </InputGroup>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText  >
                            <i className="icon-lock" disabled={this.state.enable}  ></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" placeholder="otp" onChange={this.handle_change} name="otp" disabled={this.state.enable} />
                      </InputGroup>
                      <Row>
                        <Col xs="4" sm="5" lg="4">
                          <b style={{'font-size':'15px'}}>Election Type</b>
                        </Col>
                        <Col xs="4" sm="5" lg="6">
                        <InputGroup>
                          <Dropdown isOpen={this.state.dropdownOpen_election} toggle={this.toggle_election}>
                            <DropdownToggle caret  style={{'backgroundColor':'white'}}>
                              {this.state.election_type}
                            </DropdownToggle>
                            <DropdownMenu>
                              <DropdownItem onClick={this.handle_electiontype} name="Lok Sabha">Lok Sabha</DropdownItem>
                              <DropdownItem onClick={this.handle_electiontype} name="Muncipal Corporation">Muncipal Corporation</DropdownItem>
                              <DropdownItem onClick={this.handle_electiontype} name="Rajya Sabha">Rajya Sabha</DropdownItem>
                              <DropdownItem onClick={this.handle_electiontype} name="President">President</DropdownItem>
                            </DropdownMenu>
                          </Dropdown>
                        </InputGroup>
                        <br/>
                        </Col>
                    </Row>
                      <Row>
                        <Col xs="4" sm="5" lg="4">
                          <b style={{'font-size':'15px'}}>Account Type</b>
                        </Col>
                        <Col xs="4" sm="5" lg="6">
                        <InputGroup>
                          <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                            <DropdownToggle caret  style={{'backgroundColor':'white'}}>
                              {this.state.account_type}
                            </DropdownToggle>
                            <DropdownMenu>
                              <DropdownItem onClick={this.handle} name="Voter">Voter</DropdownItem>
                              <DropdownItem onClick={this.handle} name="EO">Election Official</DropdownItem>
                            </DropdownMenu>
                          </Dropdown>
                        </InputGroup>
                        <br/>
                        </Col>
                    </Row>
                      <Row>
                        <Col xs="12">
                          <Button onClick={this.login} color="primary" className="px-4" disabled={this.state.enable}>Resend otp</Button>
                          <Button onClick={this.login} color="primary" className="px-4" >{this.state.enable?"Send OTP":"Login"}</Button>
                        </Col>                    
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
    );
  }
}

export default Login;
