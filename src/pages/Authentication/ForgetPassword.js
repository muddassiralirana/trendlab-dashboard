
import React, { useState } from 'react';
import {
  Row,
  Col,
  Button,
  Container,
  Label,
  Input,
  FormGroup,
  Form,
} from 'reactstrap';
import { Link, useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import axios from 'axios';
import { toast } from 'react-toastify';
import logolight from '../../assets/images/logo-light.png';
import { server, headers } from '../../helpers/constants';
// import { forgetUser } from '../../store/actions';

const ForgetPasswordPage = () => {
  const [response, setResponse] = useState(null);

  const validate = values => {
    let errors = {};
    if (!values.email) {
      errors.email = '⋆Required';
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = 'Invalid Email';
    }
    return errors;
  };

  const initialValues = {
    email: '',
  };
  const onSubmit = async (values, onSubmitProps) => {
    try {
      const res = await axios.put(`${server}/forgotpassword`, values, headers);
      toast.success('Please check your email for new password');
      setResponse(res);
      onSubmitProps.resetForm();
    } catch (err) {
      console.log(err?.response?.data?.message);
      toast.error(err?.response?.data?.message);
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
                            <img src={logolight} height="100" alt="logo" />
                          </div>

                          <h4 className="font-size-18 mt-4">Reset Password</h4>
                          <p className="text-muted">
                            Reset your password of Trend Labs.
                          </p>
                        </div>

                        {!response ? (
                          <Form
                            className="p-2 mt-5"
                            onSubmit={formik.handleSubmit}
                          >
                            <div className="auth-form-group-custom mb-4">
                              <i className="ri-mail-line auti-custom-input-icon"></i>
                              <Label htmlFor="email">Email</Label>
                              <Input
                                name="email"
                                type="email"
                                className="form-control"
                                id="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
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
                            </div>
                            <div className="mt-4 text-center">
                              <Button
                                color="primary"
                                className="w-md waves-effect waves-light"
                                type="submit"
                              >
                                Reset
                              </Button>
                            </div>
                          </Form>
                        ) : (
                          <ForgotPasswordFlow2 response={response} />
                        )}

                        <div className="mt-5 text-center">
                          <p>
                            Don't have an account ?{' '}
                            <Link
                              to="/login"
                              className="fw-medium text-primary"
                            >
                              {' '}
                              Log in{' '}
                            </Link>{' '}
                          </p>
                          <p>&copy; 2021 Trend Labs. All Rights Reserved</p>
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

const ForgotPasswordFlow2 = ({ response }) => {
  const _id = response.data.userid;
  const history = useHistory();

  const validate = values => {
    let errors = {};
    if (!values.password) {
      errors.password = '⋆Required';
    }
    if (!values.token) {
      errors.token = '⋆Required';
    }
    return errors;
  };

  const initialValues = {
    password: '',
    token: '',
  };

  const onSubmit = async (values, onSubmitProps) => {
    try {
      const res = await axios.put(
        `${server}/confirmpassword/${_id}`,
        values,
        headers
      );
      toast.success(res?.data?.message);
      onSubmitProps.resetForm();
      history.push('/dashboard');
    } catch (err) {
      console.log(err?.response?.data?.message);
      toast.error(err?.response?.data?.message);
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validate,
  });

  return (
    <div>
      <div className="p-2 mt-5">
        <Form onSubmit={formik.handleSubmit}>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input
              id="password"
              placeholder="Write your password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password ? (
              <div
                className="text-danger text-right"
                style={{ marginBottom: '-13px', fontSize: '13px' }}
              >
                {formik.errors.password}
              </div>
            ) : null}
          </FormGroup>

          <FormGroup className="mt-4">
            <Label for="password">Token</Label>
            <Input
              id="token"
              placeholder="Enter Token"
              name="token"
              value={formik.values.token}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.token && formik.errors.token ? (
              <div
                className="text-danger text-right"
                style={{ marginBottom: '-13px', fontSize: '13px' }}
              >
                {formik.errors.token}
              </div>
            ) : null}
          </FormGroup>
          <div className="mt-4 text-center">
            <Button
              color="primary"
              className="w-md waves-effect waves-light"
              type="submit"
            >
              Reset
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default ForgetPasswordPage;
