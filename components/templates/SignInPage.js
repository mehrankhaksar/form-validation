import React from "react";

import { useRouter } from "next/router";

import { useFormik } from "formik";

import { toast } from "react-toastify";

import { Box } from "@mui/material";

import Form from "../modules/Form";
import { signInSchema } from "@/schemas/validations";

function SignInPage() {
  React.useEffect(() => {
    fetch("/api/user")
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") window.location.href = "/dashboard";
      });
  }, []);

  const router = useRouter();

  const onSubmit = async (values) => {
    const res = await fetch("/api/auth/sign-in", {
      method: "POST",
      body: JSON.stringify({ email: values.email, password: values.password }),
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

      router.push("/dashboard");
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
    values,
    touched,
    handleBlur,
    handleChange,
    errors,
    handleSubmit,
    isSubmitting,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: signInSchema,
    onSubmit,
  });

  return (
    <Box
      component="section"
      width="100%"
      height="100%"
      display="grid"
      justifyItems="center"
      alignContent="center"
    >
      <Form
        signUp={false}
        values={values}
        handleBlur={handleBlur}
        onChange={handleChange}
        touched={touched}
        errors={errors}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </Box>
  );
}

export default SignInPage;
