import { db } from "../firebase/firebase";

export const fetchRooms = () => async dispatch => {
  db.ref.child(uid).on("value", snapshot => {
    dispatch({
      type: "FETCH_ROOMS",
      payload: snapshot.val()
    });
  });
};

