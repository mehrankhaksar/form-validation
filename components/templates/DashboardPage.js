import React from "react";

import { useRouter } from "next/router";

import { useFormik } from "formik";

import { Box, Typography, Button, Grid, Container } from "@mui/material";

import InputElement from "../elements/InputElement";
import { userInfoSchema } from "@/schemas/validations";

function DashboardPage({ email, currentFirstName, currentLastName }) {
  const [edit, setEdit] = React.useState(false);

  const router = useRouter();

  const onSubmit = async (values) => {
    console.log("Fuck");
    const res = await fetch("/api/user/update-user-info", {
      method: "POST",
      body: JSON.stringify(values),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();

    if (data.status === "success") {
      toast.success(data.message, {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      router.reload();
    } else {
      toast.error(data.message, {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const {
    values: { firstName, lastName, password },
    touched,
    handleBlur,
    handleChange,
    errors,
    handleSubmit,
  } = useFormik({
    initialValues: {
      firstName: currentFirstName || "",
      lastName: currentLastName || "",
      password: "",
    },
    validationSchema: userInfoSchema,
    onSubmit,
  });

  const handleSignOut = async () => {
    const res = await fetch("/api/auth/sign-out");
    const data = await res.json();

    if (data.status === "success") router.reload();
  };

  return (
    <Box
      component="section"
      width="100%"
      height="100%"
      display="grid"
      justifyItems="center"
      alignContent="center"
    >
      <Box
        maxWidth="500px"
        width="100%"
        bgcolor="white"
        p={2.5}
        borderRadius={1.5}
      >
        <Box
          component="div"
          width="100%"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={5}
        >
          <Typography component="h3" variant="h6" fontWeight={700}>
            {email}
          </Typography>
          <Button
            sx={{ fontWeight: 700 }}
            variant="contained"
            onClick={handleSignOut}
          >
            Sign Out
          </Button>
        </Box>
        <form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2.5}>
            <Grid item xs={12}>
              <InputElement
                disabled={!edit}
                id="firstName"
                label="First Name"
                type="text"
                value={firstName}
                touched={touched.firstName}
                onBlur={handleBlur}
                onChange={handleChange}
                error={errors.firstName}
              />
            </Grid>
            <Grid item xs={12}>
              <InputElement
                disabled={!edit}
                id="lastName"
                label="Last Name"
                type="text"
                value={lastName}
                touched={touched.lastName}
                onBlur={handleBlur}
                onChange={handleChange}
                error={errors.lastName}
              />
            </Grid>
            <Grid item xs={12}>
              <InputElement
                disabled={!edit}
                id="password"
                label="Password"
                type="password"
                value={password}
                touched={touched.password}
                onBlur={handleBlur}
                onChange={handleChange}
                error={errors.password}
              />
            </Grid>
            <Grid item xs={12}>
              {edit ? (
                <Grid container spacing={1.5}>
                  <Grid item xs={12} sm={6}>
                    <Button
                      sx={{ fontWeight: 700 }}
                      fullWidth
                      variant="contained"
                      color="error"
                      onClick={() => setEdit(false)}
                    >
                      Cancel
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Button
                      sx={{ fontWeight: 700 }}
                      fullWidth
                      variant="contained"
                      color="success"
                      type="submit"
                    >
                      Save
                    </Button>
                  </Grid>
                </Grid>
              ) : (
                <Button
                  sx={{ fontWeight: 700 }}
                  fullWidth
                  variant="contained"
                  onClick={() => setEdit(true)}
                >
                  Edit
                </Button>
              )}
            </Grid>
          </Grid>
        </form>
      </Box>
    </Box>
  );
}

export default DashboardPage;
