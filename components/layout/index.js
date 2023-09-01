import React from "react";

import { Box } from "@mui/material";

function Layout({ children }) {
  return (
    <Box component="div" width="100%" height="100vh">
      {children}
    </Box>
  );
}

export default Layout;
