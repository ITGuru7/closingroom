import { db } from './firebase';

import * as actions from "../actions";
import {ROLES} from '../constants/roles';

// User API

export const doCreateUser = (id, type, firstname, lastname, displayname, email, timezone) => {
  let join_date = Date.now()
  return db.ref('users').once('value')
  .then(function(snapshot) {
    db.ref(`users/${id}`).set({
      id: snapshot.numChildren()+1,
      type,
      firstname,
      lastname,
      displayname,
      email,
      timezone,
      level: 0,
      join_date,
    });
  })
}

export const onceGetUsers = () => (
  db.ref('users').once('value')
);

export const onceGetUser = (user_id) => (
  db.ref(`users/${user_id}`).once('value')
);

  // Other db APIs ...

export const onceGetRooms = () => (
  db.ref('rooms').once('value')
);

export const onceGetRoom = (room_id) => (
  db.ref(`rooms/${room_id}`).once('value')
)

export const doCreateRoom = (user, roomname, level, timelimit, invites, general_details, users) => {
  db.ref('rooms').once('value')
  .then(function(snapshot) {
    let create_date = Date.now()
    let expire_date = new Date()
    expire_date.setDate(expire_date.getDate() + parseInt(timelimit))
    expire_date = Date.parse(expire_date)

    let room = db.ref('rooms').push({
      id: snapshot.numChildren()+1,
      roomname,
      level,
      timelimit,
      create_date,
      expire_date,
    });
    room.child(`users/${user.uid}`).set({
      roomname,
    })

    doCreateMessage(room.key, user.uid, null, 'Welcome')

    let room_id = room.key
    onceGetRoom(room_id)
    .then(function(snapshot){
      room = snapshot.val()
      room.room_id = room_id
      _.forEach(invites, function(invite, index){
        if (invite.email) {
          actions.doSendInviteEmail(room, user, invite.email, ROLES[invite.role].role_label, users)
        }
      })
    })
  })
}

export const doChangeRoomname = (room_id, user_id, roomname) => {
  if (user_id != null) {
    db.ref(`rooms/${room_id}/users/${user_id}`).update({
      roomname: roomname,
    })
  } else {
    db.ref(`rooms/${room_id}`).update({
      roomname: roomname,
    })
  }
};

export const usersRef = (room_id) => (
  db.ref(`rooms/${room_id}/users`)
);

export const messagesRef = (room_id) => (
  db.ref(`rooms/${room_id}/messages`)
);

export const doCreateMessage = (room_id, sender_id, receiver_id, content) => {
  let date = Date.now()

  return db.ref(`rooms/${room_id}/messages`).push({
    sender_id,
    receiver_id,
    content,
    date,
  })
}

export const doInviteUserToRoom = (room_id, user_id) => (
  db.ref(`rooms/${room_id}/users/${user_id}`).set({
    level: 0,
  })
);

export const doUserProfileUpdate = (user_id, email, firstname, lastname, displayname) => (
  db.ref(`users/${user_id}`).update({
    email,
    firstname,
    lastname,
    displayname,
  })
);

export const doUserKYC = (user_id, firstname, lastname, occupation, passport, address) => (
  db.ref(`users/${user_id}`).update({
    firstname,
    lastname,
    occupation,
    passport,
    address,
    kyc_status: 'pending',
  })
);

export const doDownloadPassport = (user_id, url) => (
  db.ref(`users/${user_id}`).update({
    passport_url: url,
  })
);

export const doDownloadAddress = (user_id, url) => (
  db.ref(`users/${user_id}`).update({
    address_url: url,
  })
);

export const doUploadDocument = (room_id, user_id, type, other, issued, certified, comment) => (
  db.ref(`rooms/${room_id}/users/${user_id}/documents`).push({
    type,
    other,
    issued,
    certified,
    comment,
  })
);

export const doDownloadDocument = (room_id, user_id, doc_key, url) => (
  db.ref(`rooms/${room_id}/users/${user_id}/documents/${doc_key}`).update({
    url,
  })
);

export const onceGetDocuments = () => (
  db.ref('documents').once('value')
);

export const doApproveKYC = (user_id) => {
  db.ref(`users/${user_id}`).update({
    kyc_status: 'verified',
    level: 1,
  })
}

export const doDenyKYC = (user_id, reason) => {
  db.ref(`users/${user_id}`).update({
    kyc_status: 'failed',
    kyc_deny_reason: reason,
    level: 0,
  })
}

export const doTryAgainKYC = (user_id) => {
  db.ref(`users/${user_id}`).update({
    kyc_status: 'unverified',
    kyc_deny_reason: '',
    level: 0,
  })
}
