import { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import { store } from "@moon/app/store";

import "../styles/globals.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@moon/app/firebase";
import { login } from "@moon/features/Auth/authSlice";

const App = ({ Component, pageProps }) => {
  const dispatch = useDispatch();
  const [user, loading, error] = useAuthState(auth);

  const getLayout = Component.getLayout || ((page) => page);

  useEffect(() => {
    if (user) {
      dispatch(login(JSON.parse(JSON.stringify(user))));
    }
  }, [user, dispatch]);

  useEffect(() => {
    if (localStorage.getItem("color-theme") === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  return getLayout(<Component {...pageProps} />);
};

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <App Component={Component} pageProps={pageProps} />
    </Provider>
  );
}

export default MyApp;
