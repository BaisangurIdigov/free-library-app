const initialState = {
  loading: false,
  items: [],
  error: null,
};
export default function review(state = initialState, action) {
  switch (action.type) {
    case "get/review/pending":
      return {
        ...state,
        loading: true
      }
    case "get/review/fulfilled":
      return {
        ...state,
        loading: false,
        items: action.payload
      }
    case "get/review/rejected":
      return {
        ...state,
        loading: false,
        items: [],
        error: action.error,
      }
    case "create/review/pending":
      return {
        ...state,
        loading: true
      }
    case "create/review/fulfilled":
      return {
        ...state,
        loading: false,
        items: [...state.items, action.payload]
      }
    case "create/review/rejected":
      return {
        ...state,
        loading: false,
        items: [],
        error: action.error,
      }
    default:
      return state;
  }
}

export const fetchReviews =({id})=> {
  return async (dispatch) => {
    dispatch({ type: "get/review/pending" })
    try {
      const response = await fetch(`/reviews/${id}`)
      const json = await response.json()
      if (json.error) {
        dispatch({
          type: "get/review/rejected",
          error: "При запросе на сервер произошла ошибка",
        });
      } else {
        dispatch({ type: "get/review/fulfilled", payload: json });
      }
    } catch (e) {
      dispatch({ type: "get/review/rejected", error: e.toString() })
    }
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
