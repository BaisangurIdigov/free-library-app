const initialState = {
  loading: false,
  items: [],
  error: null,
};
export default function review(state = initialState, action) {
  switch (action.type) {
    case "create/review/pending":
      return {
        ...state,
        loading: true
      }
    case "create/review/fulfilled":
      return {
        ...state,
        loading: true,
        items: [...state.items, action.payload]
      }
    default:
      return state;
  }
}

export const postReviews =({comment, id})=> {
  return async (dispatch, useState) => {
    const state = useState()
    const text = comment
    dispatch({ type: "create/review/pending"})
    try {
      await fetch(`/reviews/${id}`, {
        method: "POST",
        body: JSON.stringify({ text }),
        headers: {
          Authorization: `Bearer ${state.application.token}`,
          "Content-type": "application/json; charset=UTF-8",
        },
      })
      dispatch({ type: "create/review/fulfilled", payload: { text } })
    } catch (e) {
      dispatch({ type: "create/review/rejected", error: e.toString() })
    }
  }
}
