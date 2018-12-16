import { db } from './firebase';
import { auth } from './firebase';

// User API

export const doCreateUser = (id, username, displayname, email) => {
  return db.ref('users').once('value')
  .then(function(snapshot) {
    db.ref(`users/${id}`).set({
      id: snapshot.numChildren()+1,
      username,
      displayname,
      email,
      level: 0,
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

export const doCreateRoom = (user_id, roomname, level, timelimit) => {
  db.ref('rooms').once('value')
  .then(function(snapshot) {
    let create_date = Date.now()
    let expire_date = new Date()
    expire_date.setDate(expire_date.getDate() + parseInt(timelimit))
    expire_date = Date.parse(expire_date)

    const room = db.ref('rooms').push({
      id: snapshot.numChildren()+1,
      level,
      timelimit,
      create_date,
      expire_date,
    });
    room.child(`users/${user_id}`).set({
      roomname,
    })

    doCreateMessage(room.key, user_id, null, 'Welcome')
  })
}

export const doChangeRoomname = (room_id, user_id, roomname) => (
  db.ref(`rooms/${room_id}/users/${user_id}`).set({
    roomname: roomname,
  })
);

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
  })
);

export const doDownloadPassport = (user_id, url) => (
  db.ref(`users/${user_id}`).update({
    passport: url,
  })
);

export const doDownloadAddress = (user_id, url) => (
  db.ref(`users/${user_id}`).update({
    address: url,
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
