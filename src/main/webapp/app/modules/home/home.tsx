import './home.scss';

import React, { useState, useEffect } from 'react';
import { Redirect, RouteComponentProps, Link } from 'react-router-dom';

import { Row, Col, Alert } from 'reactstrap';

import LoginModal from '../login/login-modal';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { login } from 'app/shared/reducers/authentication';
import NewLogin from '../login/newLogin';
import Login from '../login/login';

export const Home = (props: RouteComponentProps<any>) => {
  const account = useAppSelector(state => state.authentication.account);
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(state => state.authentication.isAuthenticated);
  const loginError = useAppSelector(state => state.authentication.loginError);
  const showModalLogin = useAppSelector(state => state.authentication.showModalLogin);
  const [showModal, setShowModal] = useState(showModalLogin);

  const handleLogin = (username, password, rememberMe = false) => dispatch(login(username, password, rememberMe));

  const handleClose = () => {
    setShowModal(false);
    props.history.push('/');
  };

  return (
    <Row>
      <Col md="3" className="pad">
        <span className="hipster rounded" />
      </Col>
      <Col md="9">
        <h2>Welcome, Java Hipster!</h2>
        <p className="lead">This is your homepage</p>
        {account?.login ? (
          <div>
            <Alert color="success">You are logged in as user {account.login}.</Alert>
          </div>
        ) : (
          <div>
            <Alert color="warning">
              You do not have an account yet?&nbsp;
              <Link to="/account/register" className="alert-link">
                Register a new account
              </Link>
            </Alert>
          </div>
        )}
        <NewLogin handleLogin={handleLogin} handleClose={handleClose} loginError={loginError}></NewLogin>
        <p>
          If you like JHipster, do not forget to give us a star on{' '}
          <a href="https://github.com/jhipster/generator-jhipster" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          !
        </p>
      </Col>
    </Row>
  );
};

export default Home;
