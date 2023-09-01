import * as yup from "yup";

const passwordRule = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;

const signUpSchema = yup.object().shape({
  email: yup.string().email("Please enter a valid email!").required("Required"),
  password: yup
    .string()
    .min(5)
    .matches(passwordRule, { message: "Please create stronger password!" })
    .required("Required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match!")
    .required("Required"),
});

const signInSchema = yup.object().shape({
  email: yup.string().email("Please enter a valid email!").required("Required"),
  password: yup
    .string()
    .matches(passwordRule, { message: "Please create stronger password!" })
    .required("Required"),
});

const userInfoSchema = yup.object().shape({
  firstName: yup.string().min(3).required("Required"),
  lastName: yup.string().min(3).required("Required"),
  password: yup.string().required("Required"),
});

export { signUpSchema, signInSchema, userInfoSchema };
