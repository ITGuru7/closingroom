import { db } from './firebase';

import * as actions from '../actions';
import ROLES from '../constants/roles';

// User API

export const doCreateUser = (uid, type, firstname, lastname, displayname, email, timezone) => {
  let join_date = Date.now()
  return db.ref('users').once('value')
  .then(function(snapshot) {
    db.ref(`users/${uid}`).set({
      id: snapshot.numChildren()+1,
      type,
      firstname,
      lastname,
      displayname,
      email,
      timezone,
      level: 0,
      join_date,
      verify: false,
    });
  })
}

export const doEmailVerifyUser = (uid) => (
  db.ref(`users/${uid}`).update({
    verify: true,
  })
);

export const onceGetUsers = () => (
  db.ref('users').once('value')
);

export const onceGetUser = (uid) => (
  db.ref(`users/${uid}`).once('value')
);

  // Other db APIs ...

export const onceGetRooms = () => (
  db.ref('rooms').once('value')
);

export const onceGetRoom = (rid) => (
  db.ref(`rooms/${rid}`).once('value')
)

export const doCreateRoom = (history, user, roomname, level, timelimit, general_details, users) => {
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

    setTimeout(function(){
      history.push(`/rooms/${room.key}`)
    }, 1000);
  })
}

export const doChangeRoomname = (rid, uid, roomname) => {
  if (uid != null) {
    db.ref(`rooms/${rid}/users/${uid}`).update({
      roomname: roomname,
    })
  } else {
    db.ref(`rooms/${rid}`).update({
      roomname: roomname,
    })
  }
};

export const usersRef = (rid) => (
  db.ref(`rooms/${rid}/users`)
);

export const messagesRef = (rid) => (
  db.ref(`rooms/${rid}/messages`)
);

export const doCreateMessage = (rid, sender_uid, receiver_uid, content) => {
  let date = Date.now()

  return db.ref(`rooms/${rid}/messages`).push({
    sender_uid,
    receiver_uid,
    content,
    date,
  })
}

export const doInviteUserToRoom = (rid, uid) => (
  db.ref(`rooms/${rid}/users/${uid}`).set({
    level: 0,
  })
);

export const doUserProfileUpdate = (uid, email, firstname, lastname, displayname) => (
  db.ref(`users/${uid}`).update({
    email,
    firstname,
    lastname,
    displayname,
  })
);

export const doUserKYC = (uid, firstname, lastname, occupation, passport, address) => (
  db.ref(`users/${uid}`).update({
    firstname,
    lastname,
    occupation,
    passport,
    address,
    kyc_status: 'pending',
  })
);

export const doDownloadPassport = (uid, url) => (
  db.ref(`users/${uid}`).update({
    passport_url: url,
  })
);

export const doDownloadAddress = (uid, url) => (
  db.ref(`users/${uid}`).update({
    address_url: url,
  })
);

export const doUploadDocument = (rid, uid, title, type, other, issued, certified, comment) => {
  let date = Date.now()

  return db.ref(`rooms/${rid}/documents/upload`).push({
    title,
    type,
    other,
    issued,
    certified,
    comment,
    uid,
    create_date: date,
  })
};

export const doDownloadDocument = (rid, doc_key, url) => (
  db.ref(`rooms/${rid}/documents/upload/${doc_key}`).update({
    url,
  })
);

export const onceGetDocuments = () => (
  db.ref('documents').once('value')
);

export const doApproveKYC = (uid) => {
  db.ref(`users/${uid}`).update({
    kyc_status: 'verified',
    level: 1,
  })
};

export const doDenyKYC = (uid, reason) => {
  db.ref(`users/${uid}`).update({
    kyc_status: 'failed',
    kyc_deny_reason: reason,
    level: 0,
  })
};

export const doTryAgainKYC = (uid) => {
  db.ref(`users/${uid}`).update({
    kyc_status: 'unverified',
    kyc_deny_reason: '',
    level: 0,
  })
};

export const doUpgradeUser = (uid) => {
  db.ref(`users/${uid}`).update({
    level: 3,
  })
};

export const doNewFolder = (rid) => {
  db.ref(`rooms/${rid}/documents/folders`).push({
    title: 'New Folder',
  })
};

export const doChangeFoldername = (rid, folder_key, foldername) => {
  db.ref(`rooms/${rid}/documents/folders/${folder_key}`).update({
    title: foldername,
  })
};
