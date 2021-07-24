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