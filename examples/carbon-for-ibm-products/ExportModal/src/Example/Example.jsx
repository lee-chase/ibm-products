import React, { useState } from 'react';
import { ExportModal } from '@carbon/ibm-products';
import { Button } from '@carbon/react';

export const Example = () => {
  const [open, setOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [successful, setSuccessful] = useState(false);
  const [error, setError] = useState(false);

  const onSubmitHandler = async () => {
    setSuccessful(true);
    setLoading(false);
  };

  const onCloseHandler = () => {
    setOpen(false);
    setSuccessful(false);
    setError(false);
  };

  const defaultProps = {
    filename: 'Sample02.pdf',
    inputLabel: 'File name',
    onClose: () => {},
    onRequestSubmit: () => {},
    open: true,
    primaryButtonText: 'Export',
    secondaryButtonText: 'Cancel',
    title: 'Export',
  };

  return (
    <>
      <ExportModal
        {...defaultProps}
        open={open}
        onClose={onCloseHandler}
        onRequestSubmit={onSubmitHandler}
        loading={loading}
        successful={successful}
        loadingMessage="Exporting file..."
        successMessage="The file has been exported."
        error={error}
        errorMessage="Server error 500"
      />
      <Button onClick={() => setOpen(true)}>Launch modal</Button>
    </>
  );
};

export default Example;
