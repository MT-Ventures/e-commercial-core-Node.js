import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import MainLayout from "../../../components/MainLayout.jsx";
import { signup } from "../../../services/auth.js";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../../store/reducers/userReducers.js";

const RegisterPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const useState = useSelector((state) => state.user);
  const { mutate, isLoading } = useMutation({
    mutationFn: ({
      name,
      surname,
      email,
      password,
      address,
      city,
      country,
      phone,
      answer,
    }) => {
      return signup({
        name,
        surname,
        email,
        password,
        address,
        city,
        country,
        phone,
        answer,
      });
    },
    onSuccess: (data) => {
      dispatch(userActions.setUserInfo(data));
      localStorage.setItem("account", JSON.stringify(data));
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  useEffect(() => {
    if (useState.userInfo) {
      navigate("/");
    }
  }, [navigate, useState.userInfo]);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm({
    defaultValues: {
      name: "",
      surname: "",
      email: "",
      password: "",
      confirmPassword: "",
      address: "",
      city: "",
      country: "",
      phone: "",
      answer: "",
    },
    mode: "onChange",
  });

  const submitHandler = (data) => {
    const {
      name,
      surname,
      email,
      password,
      address,
      city,
      country,
      phone,
      answer,
    } = data;
    mutate({ name,surname, email, password, address, city, country, phone, answer });
  };

  const password = watch("password");

  return (
    <MainLayout>
      <section className="container mx-auto px-5 py-10">
        <div className="w-full max-w-sm mx-auto">
          <h1 className="font-roboto text-2xl font-bold text-center text-dark-hard mb-8">
            Sign Up
          </h1>
        </div>
        <form
          onSubmit={handleSubmit(submitHandler)}
          className="px-4 sm:px-10 md:px-20 lg:px-40 py-10"
        >
          {/* Name Field */}
          <div className="flex flex-col mb-6 w-full">
            <label
              htmlFor="name"
              className="text-[#5a7184] font-semibold block"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              {...register("name", {
                minLength: {
                  value: 1,
                  message: "Name length must be at least 1 character",
                },
                required: {
                  value: true,
                  message: "Name is required",
                },
              })}
              placeholder="Enter name"
              className={`placeholder:text-[#959ead] text-dark-hard mt-3 px-5 py-4 font-semibold block outline-none border ${
                errors.name ? "border-red-500" : "border-[#c3cad9]"
              }`}
            />
            {errors.name?.message && (
              <p className="text-red-500 text-xs mt-1">
                {errors.name?.message}
              </p>
            )}
          </div>

          {/* Surname Field */}
          <div className="flex flex-col mb-6 w-full">
            <label
              htmlFor="surname"
              className="text-[#5a7184] font-semibold block"
            >
              Surname
            </label>
            <input
              type="text"
              id="surname"
              {...register("surname", {
                minLength: {
                  value: 1,
                  message: "Surname length must be at least 1 character",
                },
                required: {
                  value: true,
                  message: "Surname is required",
                },
              })}
              placeholder="Enter surname"
              className={`placeholder:text-[#959ead] text-dark-hard mt-3 px-5 py-4 font-semibold block outline-none border ${
                errors.surname ? "border-red-500" : "border-[#c3cad9]"
              }`}
            />
            {errors.surname?.message && (
              <p className="text-red-500 text-xs mt-1">
                {errors.surname?.message}
              </p>
            )}
          </div>

          {/* Email Field */}
          <div className="flex flex-col mb-6 w-full">
            <label
              htmlFor="email"
              className="text-[#5a7184] font-semibold block"
            >
              Email
            </label>
            <input
              type="text"
              id="email"
              {...register("email", {
                pattern: {
                  value:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: "Please enter a valid email",
                },
                required: {
                  value: true,
                  message: "Email is required",
                },
              })}
              placeholder="Enter email"
              className={`placeholder:text-[#959ead] text-dark-hard mt-3 px-5 py-4 font-semibold block outline-none border ${
                errors.email ? "border-red-500" : "border-[#c3cad9]"
              }`}
            />
            {errors.email?.message && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email?.message}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div className="flex flex-col mb-6 w-full">
            <label
              htmlFor="password"
              className="text-[#5a7184] font-semibold block"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              {...register("password", {
                minLength: {
                  value: 6,
                  message: "Password length must be at least 6 characters",
                },
                required: {
                  value: true,
                  message: "Password is required",
                },
              })}
              placeholder="Enter password"
              className={`placeholder:text-[#959ead] text-dark-hard mt-3 px-5 py-4 font-semibold block outline-none border ${
                errors.password ? "border-red-500" : "border-[#c3cad9]"
              }`}
            />
            {errors.password?.message && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password?.message}
              </p>
            )}
          </div>

          {/* Confirm Password Field */}
          <div className="flex flex-col mb-6 w-full">
            <label
              htmlFor="confirmPassword"
              className="text-[#5a7184] font-semibold block"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              {...register("confirmPassword", {
                required: {
                  value: true,
                  message: "Confirm Password is required",
                },
                validate: (value) => {
                  if (value !== password) {
                    return "Passwords do not match";
                  }
                },
              })}
              placeholder="Enter confirm password"
              className={`placeholder:text-[#959ead] text-dark-hard mt-3 px-5 py-4 font-semibold block outline-none border ${
                errors.confirmPassword ? "border-red-500" : "border-[#c3cad9]"
              }`}
            />
            {errors.confirmPassword?.message && (
              <p className="text-red-500 text-xs mt-1">
                {errors.confirmPassword?.message}
              </p>
            )}
          </div>

          {/* Address Field */}
          <div className="flex flex-col mb-6 w-full">
            <label
              htmlFor="address"
              className="text-[#5a7184] font-semibold block"
            >
              Address
            </label>
            <input
              type="text"
              id="address"
              {...register("address", {
                required: {
                  value: true,
                  message: "Address is required",
                },
              })}
              placeholder="Enter address"
              className={`placeholder:text-[#959ead] text-dark-hard mt-3 px-5 py-4 font-semibold block outline-none border ${
                errors.address ? "border-red-500" : "border-[#c3cad9]"
              }`}
            />
            {errors.address?.message && (
              <p className="text-red-500 text-xs mt-1">
                {errors.address?.message}
              </p>
            )}
          </div>

          {/* City Field */}
          <div className="flex flex-col mb-6 w-full">
            <label
              htmlFor="city"
              className="text-[#5a7184] font-semibold block"
            >
              City
            </label>
            <input
              type="text"
              id="city"
              {...register("city", {
                required: {
                  value: true,
                  message: "City is required",
                },
              })}
              placeholder="Enter city"
              className={`placeholder:text-[#959ead] text-dark-hard mt-3 px-5 py-4 font-semibold block outline-none border ${
                errors.city ? "border-red-500" : "border-[#c3cad9]"
              }`}
            />
            {errors.city?.message && (
              <p className="text-red-500 text-xs mt-1">
                {errors.city?.message}
              </p>
            )}
          </div>

          {/* Country Field */}
          <div className="flex flex-col mb-6 w-full">
            <label
              htmlFor="country"
              className="text-[#5a7184] font-semibold block"
            >
              Country
            </label>
            <input
              type="text"
              id="country"
              {...register("country", {
                required: {
                  value: true,
                  message: "Country is required",
                },
              })}
              placeholder="Enter country"
              className={`text-[#959ead]  mt-3 px-5 py-4 font-semibold block outline-none border ${
                errors.country ? "border-red-500" : "border-[#c3cad9]"
              }`}
            />
            {errors.country?.message && (
              <p className="text-red-500 text-xs mt-1">
                {errors.country?.message}
              </p>
            )}
          </div>

          {/* Phone Field */}
          <div className="flex flex-col mb-6 w-full">
            <label
              htmlFor="phone"
              className="text-[#5a7184] font-semibold block"
            >
              Phone
            </label>
            <input
              type="text"
              id="phone"
              {...register("phone", {
                required: {
                  value: true,
                  message: "Phone number is required",
                },
                pattern: {
                  value: /^[0-9]{10,15}$/,
                  message: "Please enter a valid phone number (10-15 digits)",
                },
              })}
              placeholder="Enter phone number"
              className={`placeholder:text-[#959ead] text-dark-hard mt-3 px-5 py-4 font-semibold block outline-none border ${
                errors.phone ? "border-red-500" : "border-[#c3cad9]"
              }`}
            />
            {errors.phone?.message && (
              <p className="text-red-500 text-xs mt-1">
                {errors.phone?.message}
              </p>
            )}
          </div>

          {/* Answer Field */}
          <div className="flex flex-col mb-6 w-full">
            <label
              htmlFor="answer"
              className="text-[#5a7184] font-semibold block"
            >
              Security Answer
            </label>
            <input
              type="text"
              id="answer"
              {...register("answer", {
                required: {
                  value: true,
                  message: "Security answer is required",
                },
              })}
              placeholder="Enter security answer"
              className={`placeholder:text-[#959ead] text-dark-hard mt-3 px-5 py-4 font-semibold block outline-none border ${
                errors.answer ? "border-red-500" : "border-[#c3cad9]"
              }`}
            />
            {errors.answer?.message && (
              <p className="text-red-500 text-xs mt-1">
                {errors.answer?.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={!isValid || isLoading}
            className="bg-[#4a9871] text-white font-bold text-lg py-4 px-8 w-full mb-6 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            Register
          </button>

          <p className="text-sm font-semibold text-[#5a7184]">
            You have an account?
            <Link to="/login" className="text-[#4a9871]">
              Login now
            </Link>
          </p>
        </form>
      </section>
    </MainLayout>
  );
};

export default RegisterPage;