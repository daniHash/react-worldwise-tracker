// helpers/Loadable.js
import { Suspense } from "react";
import SpinnerFullPage from "../Components/SpinnerFullPage";

export default function Loadable(Component, fallback = <SpinnerFullPage />) {
  return (props) => (
    <Suspense fallback={fallback}>
      <Component {...props} />
    </Suspense>
  );
}
