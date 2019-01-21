
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
  firebaseDB.ref('users').on("value", snapshot => {
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

export const fetchUser = (user_id) => dispatch => {
  firebaseDB.ref(`users/${user_id}`).on("value", snapshot => {
    let user = snapshot.val()
    user.uid = user_id
    dispatch({
      type: "FETCH_USER",
      payload: user
    });
  });
};

export const fetchRooms = () => dispatch => {
  firebaseDB.ref('rooms').on("value", snapshot => {
    let rooms = snapshot.val()
    Object.keys(rooms).map(key => {
      rooms[key].room_id = key
    })
    dispatch({
      type: "FETCH_ROOMS",
      payload: rooms
    });
  });
};

export const fetchRoom = (room_id) => dispatch => {
  firebaseDB.ref(`rooms/${room_id}`).on("value", snapshot => {
    let room = snapshot.val()
    room.room_id = room_id
    dispatch({
      type: "FETCH_ROOM",
      payload: room
    });
  });
};

export const fetchRoomMessages = (room_id) => dispatch => {
  firebaseDB.ref(`rooms/${room_id}/messages`).on("value", snapshot => {
    dispatch({
      type: "FETCH_ROOM_MESSAGES",
      payload: snapshot.val()
    });
  });
};

export const fetchRoomUsers = (room_id) => dispatch => {
  firebaseDB.ref(`rooms/${room_id}/users`).on("value", snapshot => {
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
    if (email === user.email) {
      invitedUser = user
    }
  })

  let link
  if (invitedUser) {
    firebaseDB.ref(`rooms/${room.room_id}/users/${invitedUser.uid}`).set({
      roomname: '',
    })
    link = `${SERVER_URL}/rooms/${room.room_id}`
   } else {
    firebaseDB.ref(`rooms/${room.room_id}/invitedUsers`).push({
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
    room_id=${getFormattedID(room.id, 6)}&
    participants=${_.size(room.users)}&
    link=${link}
  `;
  return axios.post(url)
}

export const doEnterInvitedRooms = (user_id, email) => {
  firebaseDB.ref('rooms').on("value", snapshot => {
    let rooms = snapshot.val()
    Object.keys(rooms).map(key => {
      rooms[key].room_id = key
    })
    _.forEach(rooms, function(room, index){
      let invitedUsers = room.invitedUsers
      if (invitedUsers) {
        Object.keys(invitedUsers).map(key => {
          let invitedUser = invitedUsers[key]
          if (email === invitedUser.email) {
            firebaseDB.ref(`rooms/${room.room_id}/invitedUsers/${key}`).remove()
            firebaseDB.ref(`rooms/${room.room_id}/users/${user_id}`).set({
              roomname: '',
              role: invitedUser.role,
            })
          }
        })
      }
    })
  })
}
