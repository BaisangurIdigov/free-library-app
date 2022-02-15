const initialState = {
  loading: false,
  addingToRend: false,
  returning: false,
  removing: false,
  items: [],
  currentItem: [],
  error: null,
};
export default function books(state = initialState, action) {
  switch (action.type) {
    case "remove/book/pending":
      return {
        ...state,
        removing: true,
      };
    case "remove/book/fulfilled":
      return {
        ...state,
        removing: false,
        items: state.items.filter((item) => item._id !== action.payload),
      };
    case "remove/book/rejected":
      return {
        ...state,
        removing: false,
        items: [],
        error: action.error,
      };
    case "byId/book/pending":
      return {
        ...state,
        loading: true,
      };
    case "byId/book/fulfilled":
      return {
        ...state,
        loading: false,
        currentItem: action.payload,
      };
    case "byId/book/rejected":
      return {
        ...state,
        loading: false,
        currentItem: [],
        error: action.error,
      };

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

    case "rend/book/pending":
      return {
        ...state,
        loading: true,
      };
    case "rend/book/fulfilled":
      return {
        ...state,
        loading: false,
        items: action.payload,
      };
    case "rend/book/rejected":
      return {
        ...state,
        loading: false,
        items: [],
        error: action.error,
      };

    case "add/rend/book/pending":
      return {
        ...state,
        addingToRend: true,
      };
    case "add/rend/book/fulfilled":
      return {
        ...state,
        addingToRend: false,
        items: state.items.map((item) => {
          if (item._id === action.payload._id) {
            return {
              ...item,
              rend: action.payload.rend,
            };
          }
          return item;
        }),
      };
    case "add/rend/book/rejected":
      return {
        ...state,
        loading: false,
        items: [],
        error: action.error,
      };

    case "return/rend/book/pending":
      return {
        ...state,
        returning: true,
      };
    case "return/rend/book/fulfilled":
      return {
        ...state,
        returning: false,
        items: state.items.filter((item) => item._id !== action.payload._id),
      };
    case "return/rend/book/rejected":
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

export const removeBooks = (id) => {
  return async (dispatch, useState) => {
    const state = useState();
    dispatch({ type: "remove/book/pending" });
    try {
      const response = await fetch(`/books/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${state.application.token}`,
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      const json = await response.json();
      if (json.error) {
        dispatch({
          type: "remove/book/rejected",
          error: "При запросе на сервер произошла ошибка",
        });
      } else {
        dispatch({ type: "remove/book/fulfilled", payload: id });
      }
    } catch (e) {
      dispatch({ type: "remove/book/rejected", error: e.toString() });
    }
  };
};

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

export const createBook = ({ name, img, description, price }) => {
  return async (dispatch, useState) => {
    const state = useState();
    dispatch({ type: "create/book/pending" });
    try {
      await fetch("/books", {
        method: "POST",
        body: JSON.stringify({ name, img, description, price }),
        headers: {
          Authorization: `Bearer ${state.application.token}`,
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      dispatch({
        type: "create/book/fulfilled",
        payload: { name, img, description, price },
      });
    } catch (e) {
      dispatch({ type: "create/book/rejected", error: e.toString() });
    }
  };
};

export const fetchBookById = ({ id }) => {
  return async (dispatch) => {
    dispatch({ type: "byId/book/pending" });

    try {
      const response = await fetch(`/book/${id}`);
      const json = await response.json();
      if (json.error) {
        dispatch({
          type: "byId/book/rejected",
          error: "При запросе на сервер произошла ошибка",
        });
      } else {
        dispatch({ type: "byId/book/fulfilled", payload: json });
      }
    } catch (e) {
      dispatch({ type: "byId/book/rejected", error: e.toString() });
    }
  };
};

export const fetchBookRend = () => {
  return async (dispatch, useState) => {
    const state = useState();

    dispatch({ type: "rend/book/pending" });
    try {
      const response = await fetch("/books/rend", {
        headers: {
          Authorization: `Bearer ${state.application.token}`,
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      const json = await response.json();
      if (json.error) {
        dispatch({
          type: "rend/book/rejected",
          error: "При запросе на сервер произошла ошибка",
        });
      } else {
        dispatch({ type: "rend/book/fulfilled", payload: json });
      }
    } catch (e) {
      dispatch({ type: "rend/book/rejected", error: e.toString() });
    }
  };
};

export const addRendBook = (id) => {
  return async (dispatch, useState) => {
    const state = useState();
    dispatch({ type: "add/rend/book/pending" });
    try {
      const response = await fetch(`/books/${id}/rend`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${state.application.token}`,
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      const json = await response.json();
      if (json.error) {
        dispatch({
          type: "add/rend/book/rejected",
          error: "При запросе на сервер произошла ошибка",
        });
      } else {
        dispatch({ type: "add/rend/book/fulfilled", payload: json });
      }
    } catch (e) {
      dispatch({ type: "add/rend/book/rejected", error: e.toString() });
    }
  };
};

export const returningABook = (id) => {
  return async (dispatch, useState) => {
    const state = useState();
    dispatch({ type: "return/rend/book/pending" });
    try {
      const response = await fetch(`/rend/books/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${state.application.token}`,
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      const json = await response.json();
      if (json.error) {
        dispatch({
          type: "return/rend/book/rejected",
          error: "При запросе на сервер произошла ошибка",
        });
      } else {
        dispatch({ type: "return/rend/book/fulfilled", payload: json });
      }
    } catch (e) {
      dispatch({ type: "return/rend/book/rejected", error: e.toString() });
    }
  };
};
