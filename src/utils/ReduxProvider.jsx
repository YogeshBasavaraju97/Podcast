
"use client";

import { Provider } from "react-redux";
import appStore from "./appStore";

export default function ReduxProvider({ children }) {
  return <Provider store={appStore}>{children}</Provider>;
}
