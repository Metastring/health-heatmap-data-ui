import "../styles/globals.css";
import '@phuocng/react-pdf-viewer/cjs/react-pdf-viewer.css';
import "dhx-spreadsheet/codebase/spreadsheet.min.css"
import { ThemeProvider, CSSReset } from "@chakra-ui/core";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <CSSReset />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
