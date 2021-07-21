const initialState = {
  loading: true,
  items: [],
  token: localStorage.getItem("token"),
};
export default function users(state = initialState, action) {
  switch (action.type) {
    case "todos/users/pending":
      return {
        ...state,
        loading: true,
      };
    case "todos/users/fulfilled":
      return {
        ...state,
        loading: false,
        items: action.payload,
      };
    case "todos/users/rejected":
      return {
        ...state,
        loading: false,
        items: [],
      };

    case "load/user/pending":
      return {
        ...state,
        loading: true,
      };
    case "load/user/fulfilled":
      return {
        ...state,
        loading: false,
        items: action.payload,
      };
    case "load/user/rejected":
      return {
        ...state,
        loading: false,
        items: [],
      };

    default:
  }
  return state;
}

export const fetchUsers = () => {
  return async (dispatch) => {
    dispatch({ type: "todos/users/pending" });
    try {
      const response = await fetch("/users", {});
      const json = await response.json();

      dispatch({ type: "todos/users/fulfilled", payload: json });
    } catch (e) {
      return dispatch({ type: "todos/users/rejected" + e.toString() });
    }
  };
};

export const fetchUsersId = () => {
  return async (dispatch, getState) => {
    const state = getState();
    dispatch({ type: "load/user/pending" });
    try {
      const response = await fetch("/users", {
        headers: {
          Authorization: `Bearer ${state.application.token}`,
        },
      });
      const json = await response.json();
      dispatch({ type: "load/user/fulfilled", payload: json });
    } catch (e) {
      return dispatch({ type: "load/user/rejected" + e.toString() });
    }
  };
};
