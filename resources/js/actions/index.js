
import { db as firebaseDB } from '../firebase/firebase'

import { auth as firebaseAuth } from '../firebase/firebase';

import { SERVER_URL } from '../constants/urls';
import { ROLES, RANKS } from '../constants/roles';
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

export const doSendInviteEmail = (room, authUser, invite, users) => {
  invite.role = parseInt(invite.role)

  let user_invited = null
  _.forEach(users, (user, index) => {
    if (invite.email.toLowerCase() === user.email.toLowerCase()) {
      user_invited = user
    }
  })

  let rank
  if (invite.admin) {
    rank = 1
  } else {
    if (_.includes(_.map([ROLES.BUYER, ROLES.SELLER, ROLES.BUYER_MANDATE, ROLES.SELLER_MANDATE], _.property('index')), invite.role)) {
      rank = RANKS.INTERMEDIARY.index
    } else if (_.includes(_.map([ROLES.BUYER_INTERMEDIARY, ROLES.SELLER_INTERMEDIARY], _.property('index')), invite.role)) {
      rank = RANKS.INTERMEDIARY.index
    } else if (_.includes(_.map([ROLES.ESCROW_AGENT, ROLES.LAWYER], _.property('index')), invite.role)) {
      rank = RANKS.PROFESSIONAL.index
    }
  }

  let link
  if (user_invited) {
    firebaseDB.ref(`rooms/${room.rid}/users/${user_invited.uid}`).set({
      role: invite.role,
      rank,
    })
    link = `${SERVER_URL}/rooms/${room.rid}`
   } else {
    firebaseDB.ref(`rooms/${room.rid}/invites`).push({
      email: invite.email,
      role: invite.role,
      rank,
    })
    link = `${SERVER_URL}/signup`
   }

  const url = `${SERVER_URL}/api/send_email?
    sender_email=${authUser.email}&
    receiver_email=${invite.email}&
    displayname=${authUser.displayname}&
    role=${_.find(ROLES, _.matchesProperty('index', invite.role)).label}&
    rid=${getFormattedID(room.id, 6)}&
    participants=${_.size(room.users)}&
    link=${link}
  `;
  return axios.post(url)
}

export const doEnterInvitedRooms = (uid, email) => {
  firebaseDB.ref('rooms').on("value", snapshot => {
    let rooms = snapshot.val()
    _.map(rooms, (room, key) => {
      room.rid = key
    })
    _.forEach(rooms, function(room, index){
      let invites = room.invites
      if (invites) {
        Object.keys(invites).map(key => {
          let invite = invites[key]
          if (email.toLowerCase() === invite.email.toLowerCase()) {
            firebaseDB.ref(`rooms/${room.rid}/invites/${key}`).remove()
            firebaseDB.ref(`rooms/${room.rid}/users/${uid}`).set({
              roomname: '',
              role: invite.role,
              rank: invite.rank,
            })
          }
        })
      }
    })
  })
}
