import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Layout } from "./utility/context/Layout";
import * as serviceWorker from "./serviceWorker";
import { store, persistor } from "./redux/storeConfig/store.js";
import Spinner from "./components/@vuexy/spinner/Fallback-spinner";
import { PersistGate } from "redux-persist/integration/react";
import "font-awesome/css/font-awesome.min.css";
import "./index.scss";
import "./@fake-db";

const LazyApp = lazy(() => import("./App"));

ReactDOM.render(
  <PersistGate loading={null} persistor={persistor}>
    <Provider store={store}>
      <Suspense fallback={<Spinner />}>
        <Layout>
          <LazyApp />
        </Layout>
      </Suspense>
    </Provider>
  </PersistGate>,
  document.getElementById("root")
);

serviceWorker.unregister();
