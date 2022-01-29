import React, { Component } from 'react';
import { Button, Card, CardBody, CardFooter, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import axios from 'axios';
class AddEO extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.submitreg = this.submitreg.bind(this);
    this.handle_change = this.handle_change.bind(this);
    this.handle = this.handle.bind(this);
    this.state = {
      dropdownOpen: false,
      "name": "",
      "alloted_ward_number":"",
      "email": "",
      "phoneno": "",
      "aadharno": "",
      "voterid": "",
      "name_of_sponsoring": "",
      "designation": "Designation"
    };
  }
  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }
  handle_change(e) {
    this.setState({
      [e.target.name]: e.target.value
  })
}
handle(e) {
  let designation = e.target.name
  this.setState({designation})
}
  submitreg()
   {
     console.log(this.state);
     axios.post('http://localhost:3002/register', this.state)
          .then((result) => {
            console.log(result)
            alert("Election Officer Added Successfully");
            return this.props.history.push('/election_officer')
          })
          .catch(err => alert("Missing/Incorrect Values"));
   }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" md="12">
            <Container>
              <Row className="justify-content-center">
                <Col md="6">
                  <Card className="mx-4">
                    <CardBody className="p-4">
                      <Form>
                        <h3>Register new Election Officer</h3>
                        <p className="text-muted">Create account</p>
                        <InputGroup className="mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="icon-user"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input onChange={this.handle_change}type="text" placeholder="First Middle Last Name" name="name" autoComplete="username" />
                        </InputGroup>
                        <InputGroup className="mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="icon-briefcase"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input onChange={this.handle_change}type="text" placeholder="Allotted Ward Number" name="alloted_ward_number"/>
                        </InputGroup>
                        <InputGroup className="mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>@</InputGroupText>
                          </InputGroupAddon>
                          <Input onChange={this.handle_change}type="text" placeholder="Email" autoComplete="email" name="email"/>
                        </InputGroup>
                        <InputGroup className="mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="icon-phone"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input onChange={this.handle_change}type="text" placeholder="Phone Number" name="phoneno"/>
                        </InputGroup>
                        <InputGroup className="mb-4">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="icon-lock"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input onChange={this.handle_change}type="text" placeholder="Aadhar Number" name="aadharno"/>
                        </InputGroup>
                        <InputGroup className="mb-4">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="icon-lock"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input onChange={this.handle_change}type="text" placeholder="Voter ID" name="voterid"/>
                        </InputGroup>
                        <InputGroup className="mb-4">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="icon-home"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input onChange={this.handle_change}type="text" placeholder="Name of Sponsoring" name="name_of_sponsoring"/>
                        </InputGroup>
                        <InputGroup>
                          <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                            <DropdownToggle caret  style={{'backgroundColor':'white'}}>
                              {this.state.designation}
                            </DropdownToggle>
                            <DropdownMenu>
                              <DropdownItem onClick={this.handle} name="District Election Officer">District Election Officer</DropdownItem>
                              <DropdownItem onClick={this.handle} name="Returning Officer">Returning Officer</DropdownItem>
                              <DropdownItem onClick={this.handle} name="Presiding Officer">Presiding Officer</DropdownItem>
                              <DropdownItem onClick={this.handle} name="Polling Officer 1">Polling Officer 1</DropdownItem>
                              <DropdownItem onClick={this.handle} name="Polling Officer 2">Polling Officer 2</DropdownItem>
                              <DropdownItem onClick={this.handle} name="Polling Officer 3">Polling Officer 3</DropdownItem>
                              <DropdownItem onClick={this.handle} name="Polling Officer 4">Polling Officer 4</DropdownItem>
                              <DropdownItem onClick={this.handle} name="Polling Officer 5">Polling Officer 5</DropdownItem>
                              <DropdownItem onClick={this.handle} name="Counting Supervisor">Counting Supervisor</DropdownItem>
                              <DropdownItem onClick={this.handle} name="Counting Assistant">Counting Assistant</DropdownItem>
                              <DropdownItem onClick={this.handle} name="Other">Other</DropdownItem>
                            </DropdownMenu>
                          </Dropdown>
                        </InputGroup>
                        <br/>
                        <Button color="success" block onClick={this.submitreg}>Add User</Button>
                      </Form>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </div>
    );
  }
}


export default AddEO;
