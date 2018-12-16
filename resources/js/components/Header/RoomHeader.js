import React from 'react';
import { getFormattedDate } from '../../functions';

const RoomHeader = (props) => {
  const {room} = props;

  const renderInformation = () => (
    <table>
      <thead>
        <tr>
          <th colSpan="2">ClosingRoom Information</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Room ID:</td>
          <td>{room.id}</td>
        </tr>
        <tr>
          <td>Room Level:</td>
          <td>{room.level}</td>
        </tr>
        <tr>
          <td>Participants:</td>
          <td>{Object.keys(room.users).length}</td>
        </tr>
        <tr>
          <td>Creation Date:</td>
          <td>{getFormattedDate(new Date(room.create_date))}</td>
        </tr>
        <tr>
          <td>Expires:</td>
          <td>{getFormattedDate(new Date(room.expire_date))}</td>
        </tr>
      </tbody>
    </table>
  );

  const renderTitle = () => (
    <div className="text-center">
      <div className="title">MNM ClosingRoom</div>
      <div className="room-id">{room.id}</div>
    </div>
  );

  return (
    <div className="room-header d-flex flex-row">
      <div className="info-block px-2">
        {renderInformation()}
      </div>
      <div className="title-block flex-grow-1 d-flex justify-content-center align-items-center">
        {renderTitle()}
      </div>
    </div>
  )
};

export default RoomHeader;
