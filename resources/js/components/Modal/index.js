import React from 'react';

import UploadDocumentModal from './UploadDocumentModal';
import AddUsersModal from './AddUsersModal';

const MyModal = () => (
  <div className="modal-background d-none">
    <UploadDocumentModal/>
    <AddUsersModal/>
  </div>
);

export default MyModal;
