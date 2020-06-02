import React, { Suspense, useEffect, useState } from 'react';
import { Button, CircularProgress, Box, Typography } from '@material-ui/core';
import { Image as ImageIcon, Delete as DeleteIcon } from '@material-ui/icons';
import { Logo, EmptyImageMsgBox } from './styles';
import { BrokenImage, ButtonBar } from '../Common/styles';
import { useImage } from 'react-image';

function Image({ srcList, alt }) {
  const [imageBroken, setImageBroken] = useState(false);
  const imgPromise = url =>
    new Promise((resolve, reject) => {
      resolve(url);
    });

  const { src } = useImage({
    srcList,
    imgPromise,
  });
  return imageBroken ? (
    <BrokenImage />
  ) : (
    <img onError={() => setImageBroken(true)} src={src} alt={alt} />
  );
}

const ImageSelector = props => {
  const { data, alt, onChange, onDelete, labels, id, ...rest } = props;

  const [progressState, setProgressState] = useState({ value: 100 });

  useEffect(() => {
    setProgressState({ value: 100, src: data.url });
  }, [data.url]);

  return (
    <>
      <Logo>
        {data.url ? (
          <Suspense
            fallback={
              <CircularProgress variant="indeterminate" color="secondary" />
            }
          >
            {progressState.value === 100 && progressState.src ? (
              <Image alt="business-logo" srcList={data.url} />
            ) : (
              <CircularProgress
                variant="static"
                color="secondary"
                value={progressState.value}
              />
            )}
          </Suspense>
        ) : (
          <EmptyImageMsgBox>
            <Typography> {labels.MISSING_FIELD} </Typography>
          </EmptyImageMsgBox>
        )}
      </Logo>
      <ButtonBar mt={1}>
        <input
          {...rest}
          id={id}
          type="file"
          onChange={e => {
            onChange([...e.target.files][0], value => {
              setProgressState({ value });
            });
          }}
          style={{ display: 'none' }}
        />
        <label htmlFor={id}>
          <Button
            variant="contained"
            component="span"
            size="small"
            color="primary"
          >
            <ImageIcon /> {data.url ? labels.REPLACE : labels.ADD}
          </Button>
        </label>
        {data.url && (
          <label>
            <Button
              variant="contained"
              component="span"
              size="small"
              color="primary"
              onClick={onDelete}
            >
              <DeleteIcon />
              {labels.REMOVE}
            </Button>
          </label>
        )}
      </ButtonBar>
    </>
  );
};

export default ImageSelector;
