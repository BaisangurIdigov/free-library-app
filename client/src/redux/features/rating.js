const initialState = {
  loading: false,
  items: [],
  error: null
}

export default function raiting(state = initialState, action) {
  switch (action.type) {
    case "get/rating/pending":
      return {
        ...state,
        loading: true
      }
    case "get/rating/fulfilled":
      return {
        ...state,
        loading: false,
        items: action.payload
      }
    case "get/rating/rejected":
      return {
        loading: false,
        items: [],
        error: action.error
      }
    case "create/rating/pending":
      return {
        ...state,
        loading: true
      }
    case "create/rating/fulfilled":
      return {
        ...state,
        loading: false,
        items: [...state.items, action.payload]
      }
    case "create/rating/rejected":
      return {
        ...state,
        loading: false,
        items: [],
        error: action.error,
      }
    default:
      return state
  }
}

export const fetchRatings = ({id})=> {
  return async (dispatch) => {
    dispatch({ type: "get/rating/pending"})
    try {
      const response = await fetch(`/rating/${id}`)
      const json = await response.json()
      if (json.error) {
        dispatch({
          type: "get/rating/rejected",
          error: "При запросе произошла ошибка"
        })
      } else {
        dispatch({ type: "get/rating/fulfilled", payload: json })
      }
    } catch (e) {
      dispatch({ type: "get/rating/rejected", error: e.toString()})
    }
  }
}

export const postRatings =({value, id})=> {
  return async (dispatch, useState) => {
    const state = useState()
    const number = value
    dispatch({ type: "create/rating/pending"})
    try {
      await fetch(`/rating/${id}`, {
        method: "POST",
        body: JSON.stringify({ number }),
        headers: {
          Authorization: `Bearer ${state.application.token}`,
          "Content-type": "application/json; charset=UTF-8",
        },
      })
      dispatch({ type: "create/rating/fulfilled", payload: { number } })
    } catch (e) {
      dispatch({ type: "create/rating/rejected", error: e.toString() })
    }
  }
}