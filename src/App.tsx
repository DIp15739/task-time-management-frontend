import store from "./redux/store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import AppMain from "./routes";

export default function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <AppMain />
        </BrowserRouter>
      </Provider>
    </>
  );
}
