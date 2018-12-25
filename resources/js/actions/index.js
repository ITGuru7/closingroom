
import { db as firebaseDB } from '../firebase/firebase'

import { auth as firebaseAuth } from '../firebase/firebase';

export const fetchAuthUser = () => dispatch => {
  firebaseAuth.onAuthStateChanged(authUser => {
    console.log(authUser)
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

export const fetchUsers = () => async dispatch => {
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

export const fetchUser = (user_id) => async dispatch => {
  console.log(user_id)
  firebaseDB.ref(`users/${user_id}`).on("value", snapshot => {
    let user = snapshot.val()
    user.uid = user_id
    dispatch({
      type: "FETCH_USER",
      payload: user
    });
  });
};

export const fetchRooms = () => async dispatch => {
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

export const fetchRoom = (room_id) => async dispatch => {
  firebaseDB.ref(`rooms/${room_id}`).on("value", snapshot => {
    let room = snapshot.val()
    room.room_id = room_id
    dispatch({
      type: "FETCH_ROOM",
      payload: room
    });
  });
};

export const fetchRoomMessages = (room_id) => async dispatch => {
  firebaseDB.ref(`rooms/${room_id}/messages`).on("value", snapshot => {
    dispatch({
      type: "FETCH_ROOM_MESSAGES",
      payload: snapshot.val()
    });
  });
};

export const fetchRoomUsers = (room_id) => async dispatch => {
  firebaseDB.ref(`rooms/${room_id}/users`).on("value", snapshot => {
    dispatch({
      type: "FETCH_ROOM_USERS",
      payload: snapshot.val()
    });
  });
};

export const fetchDocuments = () => async dispatch => {
  firebaseDB.ref('documents').on("value", snapshot => {
    dispatch({
      type: "FETCH_DOCUMENTS",
      payload: snapshot.val()
    });
  });
};
