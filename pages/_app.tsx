import AppWrapper from "../context/state";
import "../styles/globals.scss";
import "prismjs/themes/prism-tomorrow.css";

function MyApp({ Component, pageProps }) {
  return (
    <AppWrapper>
      <Component {...pageProps} />;
    </AppWrapper>
  );
}

export default MyApp;
