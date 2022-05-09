import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  Row,
  Col,
  Input,
  Button,
  Container,
  Label,
  Form,
  FormGroup,
} from 'reactstrap';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import logodark from '../../assets/images/logo-dark.png';
import logolight from '../../assets/images/logo-light.png';
import { login } from '../../store/actions';
import { useFormik } from 'formik';

const Login = ({ loading }) => {
  const validate = values => {
    let errors = {};
    if (!values.email) {
      errors.email = '⋆Required';
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = 'Invalid Email';
    }

    if (!values.password) {
      errors.password = '*Required';
    } else if (values.password.length < 8) {
      errors.password = 'Password must be 8 characters long';
    }
    return errors;
  };

  const history = useHistory();
  useEffect(() => {
    document.body.classList.add('auth-body-bg');

    return () => {
      document.body.classList.remove('auth-body-bg');
    };
  }, []);

  const dispatch = useDispatch();

  const initialValues = {
    email: '',
    password: '',
  };

  const onSubmit = async (values, onSubmitProps) => {
    const res = await dispatch(login(values));
    if (res && res.success) {
      onSubmitProps.resetForm();
      history.push('/dashboard');
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
                            <Link to="/" class="">
                              <img
                                src={logodark}
                                alt=""
                                height="50"
                                class="auth-logo logo-dark mx-auto"
                              />
                              <img
                                src={logolight}
                                alt=""
                                height="100"
                                class="auth-logo logo-light mx-auto"
                              />
                            </Link>
                          </div>

                          <h4 className="font-size-18 mt-4">Welcome Back !</h4>
                          <p className="text-muted">
                            Sign in to continue to Trend Labs.
                          </p>
                        </div>

                        <div className="p-2 mt-5">
                          <Form
                            className="form-horizontal"
                            onSubmit={formik.handleSubmit}
                          >
                            <FormGroup className="auth-form-group-custom mb-4">
                              <i className="ri-user-2-line auti-custom-input-icon"></i>
                              <Label htmlFor="username">Email</Label>
                              <Input
                                name="email"
                                type="email"
                                className="form-control"
                                id="useremail"
                                placeholder="Enter Email"
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

                            <div className="form-check">
                              <Input
                                type="checkbox"
                                className="form-check-input"
                                id="customControlInline"
                              />
                              <Label
                                className="form-check-label"
                                htmlFor="customControlInline"
                              >
                                Remember me
                              </Label>
                            </div>

                            <div className="mt-4 text-center">
                              <Button
                                color="primary"
                                className="w-md waves-effect waves-light"
                                type="submit"
                                onClick={onSubmit}
                              >
                                {loading ? 'Loading ...' : 'Log In'}
                              </Button>
                            </div>

                            <div className="mt-4 text-center">
                              <Link
                                to="/forgot-password"
                                className="text-muted"
                              >
                                <i className="mdi mdi-lock me-1"></i> Forgot
                                your password?
                              </Link>
                            </div>
                          </Form>
                        </div>

                        <div className="mt-5 text-center">
                          <p>
                            Don't have an account ?{' '}
                            <Link
                              to="/register"
                              className="fw-medium text-primary"
                            >
                              {' '}
                              Register{' '}
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

export default Login;
