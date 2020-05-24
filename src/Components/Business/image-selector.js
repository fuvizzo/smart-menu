import React from 'react';
import { Button } from '@material-ui/core';
import ImageIcon from '@material-ui/icons/Image';

const ImageSelector = props => {
  const { value, onChange, ...rest } = props;

  return (
    <>
      <input
        {...rest}
        type="file"
        onChange={e => {
          onChange([...e.target.files][0]);
        }}
        id="icon-button-file"
        style={{ display: 'none' }}
      />
      <label htmlFor="icon-button-file">
        <Button
          variant="contained"
          component="span"
          size="small"
          color="primary"
        >
          <ImageIcon /> Replace
        </Button>
      </label>
    </>
  );
};

export default ImageSelector;
