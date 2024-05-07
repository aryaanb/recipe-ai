import React from 'react';

type Props = {
  error: string;
};
const ErrorAlert = ({ error }: Props) => {
  return (
    <div className='alert alert-error' role='alert'>
      {error}
    </div>
  );
};

export default ErrorAlert;
