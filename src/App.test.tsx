// import { render, screen } from "@testing-library/react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./store";
it("renders App ", () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const Element = screen.getByText(/programming/i);
  expect(Element).toBeInTheDocument();
});
