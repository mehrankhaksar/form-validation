import { ThemeProvider } from "@mui/material";
import theme from "@/mui/theme";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Layout from "@/components/layout";

import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
        <ToastContainer />
      </Layout>
    </ThemeProvider>
  );
}
