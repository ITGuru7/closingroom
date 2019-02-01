
import { db as firebaseDB } from '../firebase/firebase'

import { auth as firebaseAuth } from '../firebase/firebase';

import {SERVER_URL} from '../constants/urls';
import { getFormattedID } from '../functions';

import axios from 'axios';
import _ from 'lodash';

export const fetchAuthUser = () => dispatch => {
  firebaseAuth.onAuthStateChanged(authUser => {
    if (authUser) {
      dispatch({
        type: "FETCH_AUTHUSER",
        payload: authUser
      });
    } else {
      dispatch({
        type: "FETCH_AUTHUSER",
        payload: null
      });
    }
  });
};

export const fetchUsers = () => dispatch => {
  firebaseDB.ref('users').orderByChild('id').on("value", snapshot => {
    let users = snapshot.val()
    Object.keys(users).map(key => {
      users[key].uid = key
    })
    dispatch({
      type: "FETCH_USERS",
      payload: users
    });
  });
};

export const fetchUser = (uid) => dispatch => {
  firebaseDB.ref(`users/${uid}`).on("value", snapshot => {
    let user = snapshot.val()
    user.uid = uid
    dispatch({
      type: "FETCH_USER",
      payload: user
    });
  });
};

export const fetchRooms = () => dispatch => {
  firebaseDB.ref('rooms').orderByChild('id').on("value", snapshot => {
    let rooms = snapshot.val()
    Object.keys(rooms).map(key => {
      rooms[key].rid = key
    })
    dispatch({
      type: "FETCH_ROOMS",
      payload: rooms
    });
  });
};

export const fetchRoom = (rid) => dispatch => {
  firebaseDB.ref(`rooms/${rid}`).on("value", snapshot => {
    let room = snapshot.val()
    room.rid = rid
    dispatch({
      type: "FETCH_ROOM",
      payload: room
    });
  });
};

export const fetchRoomMessages = (rid) => dispatch => {
  firebaseDB.ref(`rooms/${rid}/messages`).on("value", snapshot => {
    dispatch({
      type: "FETCH_ROOM_MESSAGES",
      payload: snapshot.val()
    });
  });
};

export const fetchRoomUsers = (rid) => dispatch => {
  firebaseDB.ref(`rooms/${rid}/users`).on("value", snapshot => {
    dispatch({
      type: "FETCH_ROOM_USERS",
      payload: snapshot.val()
    });
  });
};

export const fetchDocuments = () => dispatch => {
  firebaseDB.ref('documents').on("value", snapshot => {
    dispatch({
      type: "FETCH_DOCUMENTS",
      payload: snapshot.val()
    });
  });
};

export const doSendInviteEmail = (room, authUser, email, role, users) => {
  let invitedUser = null
  _.forEach(users, function(user, index){
    if (email.toLowerCase() === user.email.toLowerCase()) {
      invitedUser = user
    }
  })

  let link
  if (invitedUser) {
    firebaseDB.ref(`rooms/${room.rid}/users/${invitedUser.uid}`).set({
      roomname: '',
    })
    link = `${SERVER_URL}/rooms/${room.rid}`
   } else {
    firebaseDB.ref(`rooms/${room.rid}/invitedUsers`).push({
      email,
      role,
    })
    link = `${SERVER_URL}/signup`
   }

  const url = `${SERVER_URL}/api/send_email?
    sender_email=${authUser.email}&
    receiver_email=${email}&
    displayname=${authUser.displayname}&
    role=${role}&
    rid=${getFormattedID(room.id, 6)}&
    participants=${_.size(room.users)}&
    link=${link}
  `;
  return axios.post(url)
}

export const doEnterInvitedRooms = (uid, email) => {
  firebaseDB.ref('rooms').on("value", snapshot => {
    let rooms = snapshot.val()
    Object.keys(rooms).map(key => {
      rooms[key].rid = key
    })
    _.forEach(rooms, function(room, index){
      let invitedUsers = room.invitedUsers
      if (invitedUsers) {
        Object.keys(invitedUsers).map(key => {
          let invitedUser = invitedUsers[key]
          if (email.toLowerCase() === invitedUser.email.toLowerCase()) {
            firebaseDB.ref(`rooms/${room.rid}/invitedUsers/${key}`).remove()
            firebaseDB.ref(`rooms/${room.rid}/users/${uid}`).set({
              roomname: '',
              role: invitedUser.role,
            })
          }
        })
      }
    })
  })
}
