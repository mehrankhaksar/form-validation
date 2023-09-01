import React from "react";

import Link from "next/link";

import { Box, Paper, Typography, Grid, Button } from "@mui/material";

import InputElement from "../elements/InputElement";

function Form({
  signUp,
  values,
  touched,
  handleBlur,
  onChange,
  errors,
  onSubmit,
  isSubmitting,
}) {
  return (
    <Box
      component={Paper}
      sx={{ maxWidth: 300, textAlign: "center", py: 5, px: 2.5 }}
    >
      <form autoComplete="off" noValidate onSubmit={onSubmit}>
        <Typography component="h3" variant="h5" fontWeight={700} mb={2.5}>
          {signUp ? "Sign Up" : "Sign In"}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <InputElement
              id="email"
              label="Email"
              type="email"
              value={values.email}
              touched={touched.email}
              onBlur={handleBlur}
              onChange={onChange}
              error={errors.email}
            />
          </Grid>
          <Grid item xs={12}>
            <InputElement
              id="password"
              label="Password"
              type="password"
              value={values.password}
              touched={touched.password}
              onBlur={handleBlur}
              onChange={onChange}
              error={errors.password}
            />
          </Grid>
          {signUp && (
            <Grid item xs={12}>
              <InputElement
                id="confirmPassword"
                label="Confirm Password"
                type="password"
                value={values.confirmPassword}
                touched={touched.confirmPassword}
                onBlur={handleBlur}
                onChange={onChange}
                error={errors.confirmPassword}
              />
            </Grid>
          )}
          <Grid item xs={12}>
            <Button
              sx={{ fontWeight: 700 }}
              fullWidth
              variant="contained"
              type="submit"
              disabled={isSubmitting}
            >
              {signUp ? "Sign Up" : "Sign In"}
            </Button>
          </Grid>
        </Grid>
        <Typography component="p" variant="p" mt={2.5}>
          Have an account?{" "}
          <Link href={`/sign-${signUp ? "in" : "up"}`}>
            <Typography component="span" fontWeight={700} color="primary">
              {signUp ? "Sign In" : "Sign Up"}
            </Typography>
          </Link>
        </Typography>
      </form>
    </Box>
  );
}

export default Form;
