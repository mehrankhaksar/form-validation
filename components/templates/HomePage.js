import React from "react";

import Link from "next/link";

import { Box, Button } from "@mui/material";

function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  React.useEffect(() => {
    fetch("/api/user")
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") setIsLoggedIn(true);
      });
  }, []);

  return (
    <Box
      component="section"
      width="100%"
      height="100%"
      display="grid"
      justifyItems="center"
      alignContent="center"
    >
      <Box component="div">
        {isLoggedIn ? (
          <Link href="/dashboard">
            <Button sx={{ fontWeight: 700 }} variant="contained">
              Dashboard
            </Button>
          </Link>
        ) : (
          <>
            <Link href="/sign-up" style={{ marginRight: 16 }}>
              <Button sx={{ fontWeight: 700 }} variant="contained">
                Sign Up
              </Button>
            </Link>
            <Link href="/sign-in">
              <Button sx={{ fontWeight: 700 }} variant="contained">
                Sign In
              </Button>
            </Link>
          </>
        )}
      </Box>
    </Box>
  );
}

export default HomePage;
