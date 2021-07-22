import React, { useEffect } from "react";
import style from "./style.module.css";
import { auth } from "../../redux/features/application";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks } from "../../redux/features/book";
import { fetchUsersId } from "../../redux/features/users";

export function RentedBooks(props) {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.books.items);
  const users = useSelector((state) => state.users.items);



  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchUsersId());
  }, [dispatch]);



  if (auth) {
    return (
     <div style={{width:100, height:300, backgroundColor:'red'}}>

     </div>
    );
  }
}
