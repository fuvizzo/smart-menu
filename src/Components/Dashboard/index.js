import React, { useEffect, useCallback } from 'react';
import { connect, useDispatch } from 'react-redux';
import { signOut } from '../../Actions/index';
import Button from '@material-ui/core/Button';

const Dashboard = props => {
  const dispatch = useDispatch();
  const signOutHandler = useCallback(() => {
    dispatch(signOut());
  }, []);

  return (
    <>
      <Button
        type="submit"
        fullWidth
        onClick={signOutHandler}
        variant="contained"
        color="primary"
      >
        Sign out
      </Button>
      {props.children}
    </>
  );
};

export default connect(null, {
  signOut,
})(Dashboard);
