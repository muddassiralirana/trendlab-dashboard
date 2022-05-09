import React, { useEffect, useState } from 'react';
import {
  Col,
  Row,
  Card,
  CardBody,
  CardTitle,
  CardText,
  Container,
  Input,
  Button,
  Form,
} from 'reactstrap';
import { useFormik } from 'formik';
import axios from 'axios';
import { toast } from 'react-toastify';
import { server, fetchToken } from '../../helpers/constants';
import Breadcrumbs from '../../components/Common/Breadcrumb';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const Settings = () => {
  let config = fetchToken();
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch(`${server}/settings`, config)
      .then(resp => resp.json())
      .then(resp => setData(resp.settings));
  }, [setData]);

  const breadcrumbItems = [
    { title: 'Trend Labs', link: '/' },
    { title: 'Profile', link: '#' },
  ];

  const initialValues = {
    publicKey: '',
    privateKey: '',
    subscriptionPrice: '',
    withdrawLimit: '',
    discount: '',
  };
  const onSubmit = async (values, onSubmitProps) => {
    try {
      console.log(values, 'Talha values');
      const res = await axios.put(`${server}/updatesettings`, values, config);
      console.log(res);
      toast.success(res?.data?.message);
      onSubmitProps.resetForm();
    } catch (err) {
      console.log(err?.response?.data?.message);
      toast.error(err?.response?.data?.message);
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    // validate,
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
                    Settings
                  </CardTitle>

                  <ul className="list-group list-group-flush">
                    <CardText>
                      <li className="list-group-item">
                        Public key
                        {data.publicKey}
                        <CopyToClipboard text={data.publicKey}>
                          <button>
                            {' '}
                            <i class="ri-clipboard-line"></i>
                          </button>
                        </CopyToClipboard>
                      </li>
                    </CardText>

                    <CardText>
                      <li className="list-group-item">
                        Private key
                        {data.privateKey}
                        <CopyToClipboard text={data.privateKey}>
                          <button>
                            {' '}
                            <i class="ri-clipboard-line"></i>
                          </button>
                        </CopyToClipboard>
                      </li>
                    </CardText>

                    <CardText>
                      <li className="list-group-item">
                        Price: {data.subscriptionPrice}
                      </li>
                      <li className="list-group-item">
                        Discount: {data.discount}
                      </li>
                      <li className="list-group-item">
                        Withdraw Limit: {data.withdrawLimit}
                      </li>
                    </CardText>
                  </ul>
                </CardBody>
              </Card>
            </Col>

            <Col xl={8}>
              <Card className="text-white-50">
                <CardBody>
                  <CardTitle className="mb-4 text-white">Settings</CardTitle>
                  <Form onSubmit={formik.handleSubmit}>
                    <ul className="list-group list-group-flush">
                      <CardText>
                        <li className="list-group-item">
                          Public Key
                          <Input
                            name="publicKey"
                            id="publicKey"
                            type="text"
                            placeholder={data.publicKey}
                            value={formik.values.publicKey}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                        </li>
                      </CardText>
                      <CardText>
                        <li className="list-group-item">
                          Private key
                          <Input
                            id="privateKey"
                            type="text"
                            placeholder={data.privateKey}
                            value={formik.values.privateKey}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            name="privateKey"
                          />
                        </li>
                      </CardText>
                      <CardText>
                        <li className="list-group-item">
                          Sub Price
                          <Input
                            placeholder={data.subscriptionPrice}
                            id="subscriptionPrice"
                            type="text"
                            value={formik.values.subscriptionPrice}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            name="subscriptionPrice"
                          />
                        </li>
                      </CardText>
                      <CardText>
                        <li className="list-group-item">
                          Discount
                          <Input
                            placeholder={data.discount}
                            id="discount"
                            type="text"
                            value={formik.values.discount}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            name="discount"
                          />
                        </li>
                      </CardText>
                      <CardText>
                        <li className="list-group-item">
                          Withdraw Limit
                          <Input
                            placeholder={data.withdrawLimit}
                            id="withdrawLimit"
                            type="text"
                            value={formik.values.withdrawLimit}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            name="withdrawLimit"
                          />
                        </li>
                      </CardText>

                      <Button color="success" type="submit">
                        Update Settings
                      </Button>
                    </ul>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Settings;
