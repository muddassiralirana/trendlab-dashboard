import React, { useEffect } from 'react';
import {
  Col,
  Row,
  Card,
  CardBody,
  CardTitle,
  CardText,
  Input,
  Container,
  Button,
  Form,
} from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import Breadcrumbs from '../../components/Common/Breadcrumb';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { editProfile } from '../../store/actions';

const Profile = () => {
  const dispatch = useDispatch();
  const { Admin } = useSelector(state => state);
  const { name, tradingView } = Admin?.authUser?.user;

  const breadcrumbItems = [
    { title: 'Trend Labs', link: '/' },
    { title: 'Profile', link: '#' },
  ];

  const validate = values => {
    let errors = {};
    if (!values.name) {
      errors.name = '⋆Required';
    } else if (values.name.length < 3) {
      errors.name = 'Full Name must be 8 characters long';
    }

    if (!values.tradingView) {
      errors.tradingView = '*Required';
    } else if (values.tradingView.length < 3) {
      errors.tradingView = 'Trading View must be 8 characters long';
    }
    return errors;
  };

  useEffect(() => {
    document.body.classList.add('auth-body-bg');

    return () => {
      document.body.classList.remove('auth-body-bg');
    };
  }, []);

  const initialValues = {
    name: name,
    tradingView: tradingView,
  };

  const onSubmit = async values => {
    const dataSubmit = {
      name: values.name,
      tradingView: values.tradingView,
    };

    if (dataSubmit.name === name) {
      delete dataSubmit.name;
    }
    if (dataSubmit.tradingView === tradingView) {
      delete dataSubmit.tradingView;
    }
    if (Object.keys(dataSubmit).length <= 0) {
      toast.warning('Please edit something first', { autoClose: 3000 });
    } else {
      dispatch(editProfile(dataSubmit));
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validate,
  });

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Profile" breadcrumbItems={breadcrumbItems} />
          <Row>
            <Col lg={4}>
              <Card className="text-white-50">
                <CardBody>
                  <CardTitle className="mb-4 text-white">
                    <i className="mdi mdi-bullseye-arrow me-3"></i> Admin
                  </CardTitle>

                  <ul className="list-group list-group-flush">
                    <CardText>
                      <li className="list-group-item">
                        Email address: support@trendlabs.io
                        <CopyToClipboard text="support@trendlabs.io">
                          <button>
                            <i class="ri-clipboard-line"></i>
                          </button>
                        </CopyToClipboard>
                      </li>
                    </CardText>

                    <CardText>
                      <li className="list-group-item">
                        Creation Date: 2021-06-19
                      </li>
                    </CardText>
                  </ul>
                </CardBody>
              </Card>
            </Col>

            <Col xl={8}>
              <Card className="text-white-50">
                <CardBody>
                  <CardTitle className="mb-4 text-white">
                    Admin Settings
                  </CardTitle>

                  <ul className="list-group list-group-flush">
                    <Form
                      className="form-horizontal"
                      onSubmit={formik.handleSubmit}
                    >
                      <CardText>
                        <li className="list-group-item">
                          Full Name
                          <Input
                            name="name"
                            type="text"
                            className="form-control"
                            id="name"
                            value={formik.values.name}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                          />
                          {formik.touched.name && formik.errors.name ? (
                            <div
                              className="text-danger text-right"
                              style={{
                                marginBottom: '-13px',
                                fontSize: '14px',
                              }}
                            >
                              {formik.errors.name}
                            </div>
                          ) : null}
                        </li>
                      </CardText>
                      <CardText>
                        <li className="list-group-item">
                          Email
                          <Input placeholder="support@trendlabs.io" disabled />
                        </li>
                      </CardText>
                      <CardText>
                        <li className="list-group-item">
                          Trading View
                          <Input
                            name="tradingView"
                            type="text"
                            className="form-control"
                            id="tradingView"
                            value={formik.values.tradingView}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                          />
                          {formik.touched.tradingView &&
                          formik.errors.tradingView ? (
                            <div
                              className="text-danger text-right"
                              style={{
                                marginBottom: '-13px',
                                fontSize: '14px',
                              }}
                            >
                              {formik.errors.tradingView}
                            </div>
                          ) : null}
                        </li>
                      </CardText>
                      <Button color="success">Update Profile</Button>
                    </Form>
                  </ul>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Profile;
