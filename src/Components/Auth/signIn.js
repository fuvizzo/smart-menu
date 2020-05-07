import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { signInWithEmailAndPassword } from '../../Actions/index';

const SignIn = props => {
  const { signInWithEmailAndPassword } = props;
  useEffect(() => {
    signInWithEmailAndPassword('fulvio.cusimano@gmail.com', 'password');
  }, []);

  return <></>;
};

export default connect(null, {
  signInWithEmailAndPassword,
})(SignIn);
