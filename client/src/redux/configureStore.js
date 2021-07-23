import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import application from "./features/application";
import { composeWithDevTools } from "redux-devtools-extension";
import books from "./features/book";
import users from "./features/users";
import review from './features/review'


export const store = createStore(
  combineReducers({
    application,
    books,
    users,

    review
  }),
  composeWithDevTools(applyMiddleware(thunk))
);
