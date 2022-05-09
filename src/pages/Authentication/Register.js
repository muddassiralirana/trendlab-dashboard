import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {
  Row,
  Col,
  Button,
  Container,
  Label,
  FormGroup,
  Input,
  Form,
} from 'reactstrap';
import { useDispatch } from 'react-redux';
import logodark from '../../assets/images/logo-dark.png';
import { register } from '../../store/actions';
import { useFormik } from 'formik';

const Register = ({ loading }) => {
  const validate = values => {
    let errors = {};
    if (!values.email) {
      errors.email = '⋆Required';
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = 'Invalid Email';
    }
    if (!values.username) {
      errors.username = '*Required';
    } else if (values.username.length <= 2) {
      errors.username = '*Too short';
    }
    if (!values.password) {
      errors.password = '*Required';
    } else if (values.password.length < 8) {
      errors.password = 'Password must be 8 characters long';
    }
    return errors;
  };

  useEffect(() => {
    document.body.classList.add('auth-body-bg');

    return () => {
      document.body.classList.remove('auth-body-bg');
    };
  }, []);
  const history = useHistory();
  const dispatch = useDispatch();
  const initialValues = {
    email: '',
    username: '',
    password: '',
  };

  const onSubmit = async (values, onSubmitProps) => {
    const res = await dispatch(register(values));
    if (res && res.success) {
      onSubmitProps.resetForm();
      history.push('/login');
    }
  };
  const formik = useFormik({
    initialValues,
    onSubmit,
    validate,
  });

  return (
    <React.Fragment>
      <div>
        <Container fluid className="p-0">
          <Row className="g-0">
            <Col lg={4}>
              <div className="authentication-page-content p-4 d-flex align-items-center min-vh-100">
                <div className="w-100">
                  <Row className="justify-content-center">
                    <Col lg={9}>
                      <div>
                        <div className="text-center">
                          <div>
                            <Link to="#" className="logo">
                              <img src={logodark} height="20" alt="logo" />
                            </Link>
                          </div>

                          <h4 className="font-size-18 mt-4">
                            Register account
                          </h4>
                          <p className="text-muted">
                            Get your free Trend Labs account now.
                          </p>
                        </div>

                        {/* ------------------------------ */}

                        <div className="p-2 mt-5">
                          <Form
                            className="form-horizontal"
                            onSubmit={formik.handleSubmit}
                          >
                            <FormGroup className="auth-form-group-custom mb-4">
                              <i className="ri-mail-line auti-custom-input-icon"></i>
                              <Label htmlFor="useremail">Email</Label>
                              <Input
                                name="email"
                                type="email"
                                className="form-control"
                                id="useremail"
                                placeholder="Enter email"
                                value={formik.values.email}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                              />
                              {formik.touched.email && formik.errors.email ? (
                                <div
                                  className="text-danger text-right"
                                  style={{
                                    marginBottom: '-13px',
                                    fontSize: '14px',
                                  }}
                                >
                                  {formik.errors.email}
                                </div>
                              ) : null}
                            </FormGroup>

                            <FormGroup className="auth-form-group-custom mb-4">
                              <i className="ri-user-2-line auti-custom-input-icon"></i>
                              <Label htmlFor="username">Username</Label>
                              <Input
                                name="username"
                                type="text"
                                className="form-control"
                                id="username"
                                placeholder="Enter username"
                                value={formik.values.username}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                              />
                              {formik.touched.username &&
                              formik.errors.username ? (
                                <div
                                  className="text-danger text-right"
                                  style={{
                                    marginBottom: '-13px',
                                    fontSize: '14px',
                                  }}
                                >
                                  {formik.errors.username}
                                </div>
                              ) : null}
                            </FormGroup>

                            <FormGroup className="auth-form-group-custom mb-4">
                              <i className="ri-lock-2-line auti-custom-input-icon"></i>
                              <Label htmlFor="userpassword">Password</Label>
                              <Input
                                name="password"
                                type="password"
                                className="form-control"
                                id="userpassword"
                                placeholder="Enter password"
                                value={formik.values.password}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                              />
                              {formik.touched.password &&
                              formik.errors.password ? (
                                <div
                                  className="text-danger text-right"
                                  style={{
                                    marginBottom: '-13px',
                                    fontSize: '14px',
                                  }}
                                >
                                  {formik.errors.password}
                                </div>
                              ) : null}
                            </FormGroup>

                            <div className="text-center">
                              <Button
                                color="primary"
                                className="w-md waves-effect waves-light"
                                type="submit"
                                onClick={onSubmit}
                              >
                                {loading ? 'Loading ...' : 'Register'}
                              </Button>
                            </div>

                            <div className="mt-4 text-center">
                              <p className="mb-0">
                                By registering you agree to the Trend Labs{' '}
                                <Link to="#" className="text-primary">
                                  Terms of Use
                                </Link>
                              </p>
                            </div>
                          </Form>
                        </div>

                        {/* --------------------------------- */}

                        <div className="mt-5 text-center">
                          <p>
                            Already have an account ?{' '}
                            <Link
                              to="/login"
                              className="fw-medium text-primary"
                            >
                              {' '}
                              Login
                            </Link>{' '}
                          </p>
                          <p>© 2021 Trend Labs. All Rights Reserved</p>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
            </Col>
            <Col lg={8}>
              <div className="authentication-bg">
                <div className="bg-overlay"></div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Register;
