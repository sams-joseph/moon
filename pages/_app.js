import { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import { store } from "@moon/app/store";

import "../styles/globals.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "@moon/app/firebase";
import { login } from "@moon/features/Auth/authSlice";
import Spinner from "@moon/common/Spinner";
import { collection, getDocs } from "firebase/firestore";
import { clearFlash, showFlash } from "@moon/features/Flash/flashSlice";
import { setAllCoins } from "@moon/features/Coins/coinsSlice";

const App = ({ Component, pageProps }) => {
  const dispatch = useDispatch();
  const [user, loading, error] = useAuthState(auth);
  const getLayout = Component.getLayout || ((page) => page);

  useEffect(() => {
    const promise = async () => {
      const response = await getDocs(collection(db, "coin_metas"));

      const coins = response.docs.map((doc) => doc.data());

      dispatch(setAllCoins(coins));
    };

    promise();
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      dispatch(showFlash({ message: error.message, type: "error" }));
    }

    return () => {
      dispatch(clearFlash());
    };
  }, [error, dispatch]);

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

  if (loading)
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <Spinner className="h-20 w-20" />
      </div>
    );

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
