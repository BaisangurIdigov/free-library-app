const initialState = {
  loader: true,
  image: [],
  error: null,
};

export default function avatar(state = initialState, action) {
  switch (action.type) {
    case "avatar/upload/pending":
      return {
        ...state,
        loading: true,
      };

    case "avatar/upload/fulfilled":
      return {
        ...state,
        loading: false,
        image: [state.image],
      };
    default:
      return state;
  }
}

export const addAvatar = (e) => {
  return async (dispatch, useState) => {
    const state = useState();
    dispatch({ type: "avatar/upload/pending" });

    const { files } = e.target;
    const data = new FormData();
    data.append("image", files[0]);

    const response = await fetch("/avatar", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${state.application.token}`,
      },
      body: data,
    });

    const json = await response.json();

    dispatch({ type: "avatar/upload/fulfilled", payload: json.image });
    window.location.reload();
  };
};
