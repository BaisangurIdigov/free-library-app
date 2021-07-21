const initialState = {
  loading: false,
  items: [],
  error: null,
};
export default function books(state = initialState, action) {
  switch (action.type) {
    case "create/book/pending":
      return {
        ...state,
        loading: true,
      };
    case "create/book/fulfilled":
      return {
        ...state,
        loading: false,
        items: [...state.items, action.payload],
      };
    case "create/book/rejected":
      return {
        ...state,
        loading: false,
        items: [],
        error: action.error,
      };

    case "all/book/pending":
      return {
        ...state,
        loading: true,
      };
    case "all/book/fulfilled":
      return {
        ...state,
        loading: false,
        items: action.payload,
      };
    case "all/book/rejected":
      return {
        ...state,
        loading: false,
        items: [],
        error: action.error,
      };
    case "todos/book/pending":
      return {
        ...state,
        loading: true,
      };
    case "todos/book/fulfilled":
      return {
        ...state,
        loading: false,
        items: action.payload,
      };
    case "todos/book/rejected":
      return {
        ...state,
        loading: false,
        items: [],
        error: action.error,
      };
    default:
  }
  return state;
}

export const fetchBooks = () => {
  return async (dispatch, getState) => {
    const state = getState();

    dispatch({ type: "todos/book/pending" });
    try {
      const response = await fetch("/books", {
        headers: {
          Authorization: `Bearer ${state.application.token}`,
        },
      });
      const json = await response.json();
      if (json.error) {
        dispatch({
          type: "todos/book/rejected",
          error: "При запросе на сервер произошла ошибка",
        });
      } else {
        dispatch({ type: "todos/book/fulfilled", payload: json });
      }
    } catch (e) {
      dispatch({ type: "todos/book/rejected", error: e.toString() });
    }
  };
};

export const fetchBook = () => {
  return async (dispatch) => {
    dispatch({ type: "all/book/pending" });
    try {
      const response = await fetch("/book");
      const json = await response.json();
      if (json.error) {
        dispatch({
          type: "all/book/rejected",
          error: "При запросе на сервер произошла ошибка",
        });
      } else {
        dispatch({ type: "all/book/fulfilled", payload: json });
      }
    } catch (e) {
      dispatch({ type: "all/book/rejected", error: e.toString() });
    }
  };
};

export const createBook = ({ name, img, description }) => {
  return async (dispatch, useState) => {
    const state = useState()
    dispatch({ type: "create/book/pending" });
    try {
      await fetch("/books", {
        method: "POST",
        body: JSON.stringify({ name, img, description }),
        headers: {
          Authorization: `Bearer ${state.application.token}`,
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      dispatch({ type: "create/book/fulfilled", payload: { name, img, description } });
    } catch (e) {
      dispatch({ type: "create/book/rejected", error: e.toString() })
    }
  };
};
