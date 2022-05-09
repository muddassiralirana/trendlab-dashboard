import React from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  Input,
  FormGroup,
  Form,
  Label,
  Button,
} from 'reactstrap';
import { useFormik } from 'formik';
import axios from 'axios';
import { toast } from 'react-toastify';
import { server, fetchToken } from '../../helpers/constants';

const ChangePasswordModal = ({ isOpen, toggle }) => {
  let config = fetchToken();
  const validate = values => {
    let errors = {};

    if (!values.password) {
      errors.password = '⋆Required';
    } else if (values.password.length < 8) {
      errors.password = 'Password must be 8 characters long';
    }
    if (!values.newPassword) {
      errors.newPassword = '⋆Required';
    } else if (values.newPassword.length < 8) {
      errors.newPassword = 'Password must be 8 characters long';
    }
    if (values.password && values.newPassword) {
      if (values.password === values.newPassword) {
        errors.newPassword = 'Please use different password';
      }
    }
    return errors;
  };

  const initialValues = {
    password: '',
    newPassword: '',
  };
  const onSubmit = async (values, onSubmitProps) => {
    try {
      const res = await axios.put(`${server}/changepassword`, values, config);
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
    validate,
  });
  return (
    <Modal isOpen={isOpen} centered={true} toggle={toggle}>
      <ModalHeader toggle={toggle}>Change Password</ModalHeader>
      <ModalBody className="p-5 mb-3">
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
            <Label for="password">New Password</Label>
            <Input
              id="newPassword"
              placeholder="New password"
              name="newPassword"
              value={formik.values.newPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.newPassword && formik.errors.newPassword ? (
              <div
                className="text-danger text-right"
                style={{ marginBottom: '-13px', fontSize: '13px' }}
              >
                {formik.errors.newPassword}
              </div>
            ) : null}
          </FormGroup>

          <Button className="success mt-4" type="submit">
            Change
          </Button>
        </Form>
      </ModalBody>
    </Modal>
  );
};

export default ChangePasswordModal;
