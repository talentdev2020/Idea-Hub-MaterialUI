import React, { useEffect, useState } from "react";

import { Row, Card, CardTitle, Form, Label, Input, Button } from "reactstrap";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { registerUser } from "../../redux/actions";

import IntlMessages from "../../helpers/IntlMessages";
import { Colxx } from "../../components/common/CustomBootstrap";
import { withRouter } from "react-router";

const Register = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const { error } = useSelector(({ authUser }) => authUser);

  const ValidateEmail = value => {
    let error;
    if (!value) {
      error = "Please enter your email address";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      error = "Invalid email address";
    }
    return error;
  };
  const handleChange = e => {
    if (e.target.name === "email") setEmail(e.target.value);
    if (e.target.name === "password") setPassword(e.target.value);
    if (e.target.name === "name") setName(e.target.value);
  };
  useEffect(() => {
    if (error) alert(error);
  }, [error]);

  const onUserRegister = () => {
    if (name!=="" && email !== "" && password !== "") {
      const error = ValidateEmail(email);
      if (error) alert(error);
      else dispatch(registerUser({name, email, password }, history));
      //this.props.history.push("/");
    } else alert("You should fill out all fields");
  };

  return (
    <Row className="h-100">
      <Colxx xxs="12" md="10" className="mx-auto my-auto">
        <Card className="auth-card">
          <div className="position-relative image-side ">
            <p className="text-white h2">MAGIC IS IN THE DETAILS</p>
            <p className="white mb-0">
              Please use this form to register. <br />
              If you are a member, please{" "}
              <NavLink to={`/user/login`} className="white">
                <strong style={{ color: "#dd6c46" }}> login</strong>
              </NavLink>
              .
            </p>
          </div>
          <div className="form-side">
            <NavLink to={`/`} className="white">
              <img src="/assets/img/nexusF-09.png" alt="logo" />
            </NavLink>
            <CardTitle className="mb-4">
              <IntlMessages id="user.register" />
            </CardTitle>
            <Form>
              <Label className="form-group has-float-label mb-4">
                <Input
                  type="name"
                  defaultValue={name}
                  onChange={e => handleChange(e)}
                  name="name"
                />
                <IntlMessages id="user.fullname" />
              </Label>
              <Label className="form-group has-float-label mb-4">
                <Input
                  type="email"
                  name="email"
                  defaultValue={email}
                  onChange={e => handleChange(e)}
                />
                <IntlMessages id="user.email" />
              </Label>
              <Label className="form-group has-float-label mb-4">
                <Input
                  type="password"
                  onChange={e => handleChange(e)}
                  name="password"
                />
                <IntlMessages id="user.password" defaultValue={password} />
              </Label>
              <div className="d-flex justify-content-end align-items-center">
                <Button
                  color="primary"
                  className="btn-shadow"
                  size="lg"
                  onClick={() => onUserRegister()}
                >
                  <IntlMessages id="user.register-button" />
                </Button>
              </div>
            </Form>
          </div>
        </Card>
      </Colxx>
    </Row>
  );
};
export default withRouter(Register);
