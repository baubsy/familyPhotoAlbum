import React from 'react';
import { ValidatedField } from 'react-jhipster';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Alert, Row, Col, Form } from 'reactstrap';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { render } from 'react-dom';

export interface newLoginProps {
  loginError: boolean;
  handleLogin: (username: string, password: string, rememberMe: boolean) => void;
  handleClose: () => void;
}
const NewLogin = (props: newLoginProps) => {
  const history = useHistory();
  const login = ({ username, password, rememberMe }) => {
    props.handleLogin(username, password, rememberMe);
    history.push('/landingpage');
  };
  /*
  const handleClose = () => {
    setShowModal(false);
    props.history.push('/');
  };
  */

  const {
    handleSubmit,
    register,
    formState: { errors, touchedFields },
  } = useForm({ mode: 'onTouched' });

  const { loginError, handleClose } = props;
  return (
    <div>
      <p>New Login</p>
      <Form onSubmit={handleSubmit(login)}>
        <ValidatedField
          name="username"
          label="Username"
          placeholder="Your username"
          required
          autoFocus
          data-cy="username"
          validate={{ required: 'Username cannot be empty!' }}
          register={register}
          error={errors.username}
          isTouched={touchedFields.username}
        />
        <ValidatedField
          name="password"
          type="password"
          label="Password"
          placeholder="Your password"
          required
          data-cy="password"
          validate={{ required: 'Password cannot be empty!' }}
          register={register}
          error={errors.password}
          isTouched={touchedFields.password}
        />
        <ValidatedField name="rememberMe" type="checkbox" check label="Remember me" value={true} register={register} />
        <Button color="primary" type="submit" data-cy="submit">
          Sign in
        </Button>
      </Form>
    </div>
  );
};

export default NewLogin;
