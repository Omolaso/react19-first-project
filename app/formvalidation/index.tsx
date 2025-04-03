// import { useEffect, useState } from "react";
// import { SubmitHandler, useForm } from "react-hook-form";
// import { toast } from "react-toastify";
// import { Link } from "react-router-dom";
// import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
// import { axiosFetcher } from "../../hooks/useFetch";
// import { IAuthFormInputs } from "../../types/Forms";
// import {
//   passwordValidation,
//   PassWordRequirementIndicators,
// } from "../resetPassword";
// import { ErrorCheck } from "../../Utils/AxiosError";
// import useNavigator from "../../hooks/useNavigator";
// import emailIcon from "../../images/all-icons/mail-outline.svg";
// import CustomIcon from "../../Utils/CustomIcon";
// import AuthLayout from "../../components/AuthLayout";
// import passwordIcon from "../../images/all-icons/password-outline-icon.svg";
// import userIcon from "../../images/all-icons/form-user-icon.svg";
// import PrimaryButton from "../../Utils/PrimaryButton";

// interface ResetPasswordProps {
//   newPassword: string;
//   confirmPassword: string;
// }
// interface PassWordRequirementIndicatorProps {
//   hasMinLength: boolean;
//   hasUppercase: boolean;
//   hasLowercase: boolean;
//   hasNumber: boolean;
//   hasSpecialChar: boolean;
// }
// type PasswordType = {
//   password: boolean;
//   confirmPassword: boolean;
// };

// export const passwordValidation = {
//   hasUppercase: (value: string) =>
//     /[A-Z]/.test(value) || "Include at least one uppercase character",
//   hasLowercase: (value: string) =>
//     /[a-z]/.test(value) || "Include at least one lowercase character",
//   hasNumber: (value: string) =>
//     /[0-9]/.test(value) || "Include at least one number",
//   hasSpecialChar: (value: string) =>
//     /[!@#$%^&*()_+\-=\\[\]{};':"\\|,.<>\\/?]/.test(value) ||
//     "Include at least one special character",
// };

// export const PassWordRequirementIndicators = (
//   props: PassWordRequirementIndicatorProps,
// ) => {
//   const {
//     hasMinLength,
//     hasLowercase,
//     hasNumber,
//     hasSpecialChar,
//     hasUppercase,
//   } = props;

//   return (
//     <ul className="grid grid-cols-2 w-full gap-1 mt-2">
//       <li className="flex items-center text-sm">
//         <span
//           className={`mr-2 ${hasMinLength ? "text-green" : "text-deepGray"}`}
//         >
//           •
//         </span>
//         <span className={hasMinLength ? "text-green" : "text-deepGray"}>
//           Minimum 8 characters
//         </span>
//       </li>
//       <li className="flex items-center text-sm">
//         <span
//           className={`mr-2 ${hasUppercase ? "text-green" : "text-deepGray"}`}
//         >
//           •
//         </span>
//         <span className={hasUppercase ? "text-green" : "text-deepGray"}>
//           One uppercase character
//         </span>
//       </li>
//       <li className="flex items-center text-sm">
//         <span
//           className={`mr-2 ${hasLowercase ? "text-green" : "text-deepGray"}`}
//         >
//           •
//         </span>
//         <span className={hasLowercase ? "text-green" : "text-deepGray"}>
//           One lowercase character
//         </span>
//       </li>
//       <li className="flex items-center text-sm">
//         <span className={`mr-2 ${hasNumber ? "text-green" : "text-deepGray"}`}>
//           •
//         </span>
//         <span className={hasNumber ? "text-green" : "text-deepGray"}>
//           One number
//         </span>
//       </li>
//       <li className="flex items-center text-sm">
//         <span
//           className={`mr-2 ${hasSpecialChar ? "text-green" : "text-deepGray"}`}
//         >
//           •
//         </span>
//         <span className={hasSpecialChar ? "text-green" : "text-deepGray"}>
//           One special character
//         </span>
//       </li>
//     </ul>
//   );
// };

// const ResetPassword = () => {
//   const [submitState, setSubmitState] = useState<boolean>(false);
//   const [securedPassword, setSecuredPassword] = useState<PasswordType>({
//     password: false,
//     confirmPassword: false,
//   });
//   const [passwordValidationState, setPasswordValidationState] = useState({
//     hasMinLength: false,
//     hasUppercase: false,
//     hasLowercase: false,
//     hasNumber: false,
//     hasSpecialChar: false,
//   });
//   const { state } = useLocation();
//   const { handleNavigation } = useNavigator();

//   const {
//     register,
//     handleSubmit,
//     reset,
//     watch,
//     formState: { errors },
//   } = useForm<ResetPasswordProps>();

//   const {
//     hasLowercase,
//     hasMinLength,
//     hasNumber,
//     hasSpecialChar,
//     hasUppercase,
//   } = passwordValidationState;
//   const tokenParam = new URLSearchParams(document.location.search).get("token");
//   const newPasswordValue = watch("newPassword");
//   const confirmPasswordValue = watch("confirmPassword");
//   const userEmail: string = state;

//   const handlePasswordToggle = (key: keyof PasswordType) => {
//     setSecuredPassword((prev) => ({
//       ...prev,
//       [key]: !prev[key],
//     }));
//   };

//   const handleResetPassword: SubmitHandler<ResetPasswordProps> = async (
//     data,
//   ) => {
//     if (newPasswordValue !== confirmPasswordValue) {
//       toast.error("Passwords do not match");
//       return;
//     }

//     setSubmitState(true);

//     const payload = {
//       token: tokenParam,
//       newPassword: data.newPassword,
//     };

//     try {
//       const res = await axiosFetcher.post("/reset-password", payload);
//       toast(res.data.message || "Successful");
//       handleNavigation("/");
//     } catch (error) {
//       ErrorCheck(error);
//       console.log(error);
//     } finally {
//       setSubmitState(false);
//       reset();
//     }
//   };

//   useEffect(() => {
//     if (newPasswordValue) {
//       setPasswordValidationState({
//         hasMinLength: newPasswordValue.length >= 8,
//         hasUppercase: /[A-Z]/.test(newPasswordValue),
//         hasLowercase: /[a-z]/.test(newPasswordValue),
//         hasNumber: /[0-9]/.test(newPasswordValue),
//         hasSpecialChar: /[!@#$%^&*()_+\-=\\[\]{};':"\\|,.<>\\/?]/.test(
//           newPasswordValue,
//         ),
//       });
//     }
//   }, [newPasswordValue]);

//   if (!tokenParam) {
//     return <Navigate to={"/"} />;
//   }

//   return (
//     <AuthLayout>
//       <div className="flex flex-col gap-5 w-full">
//         <div className="self-center flex flex-col items-center text-center gap-2 w-full">
//           <span className="font-semibold text-[1.25rem] md:text-[1.5rem]">
//             Set a New Password
//           </span>
//           <span className="text-[1rem] md:text-[1.25rem]">
//             Create a strong password to secure your account
//           </span>
//         </div>

//         <form
//           onSubmit={handleSubmit(handleResetPassword)}
//           className="rfv-form flex flex-col gap-4 w-full max-w-full md:max-w-[70%] mx-auto"
//         >
//           <div className="flex flex-row items-center gap-2 max-w-[13rem] w-full mx-auto bg-servicesBgGray rounded-[1.25rem] p-2">
//             <CustomIcon path={userEmailIcon} />
//             <span className="text-black text-base font-normal">
//               {userEmail}
//             </span>
//           </div>

//           <div className="flex flex-col w-full">
//             <div className="flex flex-row items-stretch gap-2 min-h-[3rem] w-full border border-deepGray rounded-md p-2">
//               <CustomIcon path={passwordIcon} />
//               <input
//                 type={securedPassword.password ? "text" : "password"}
//                 placeholder="Password"
//                 className="rounded-md flex-1 outline-0 border-0 focus:outline-0 focus:border-0"
//                 {...register("newPassword", {
//                   required: "Password is required",
//                   minLength: {
//                     value: 8,
//                     message: "Password must be at least 8 characters",
//                   },
//                   validate: passwordValidation,
//                 })}
//               />
//               <button
//                 type="button"
//                 onClick={() => handlePasswordToggle("password")}
//                 className="flex-[0.1] flex items-center justify-center"
//               >
//                 {securedPassword.password ? <FaRegEye /> : <FaRegEyeSlash />}
//               </button>
//             </div>

//             {errors.newPassword && (
//               <small className="text-red">{errors.newPassword.message}</small>
//             )}

//             <PassWordRequirementIndicators
//               hasMinLength={hasMinLength}
//               hasUppercase={hasUppercase}
//               hasLowercase={hasLowercase}
//               hasNumber={hasNumber}
//               hasSpecialChar={hasSpecialChar}
//             />
//           </div>

//           <div className="flex flex-col w-full">
//             <div className="flex flex-row items-stretch gap-2 min-h-[3rem] w-full border border-deepGray rounded-md p-2">
//               <CustomIcon path={passwordIcon} />
//               <input
//                 type={securedPassword.confirmPassword ? "text" : "password"}
//                 placeholder="Confirm Password"
//                 className="rounded-md flex-1 outline-0 border-0 focus:outline-0 focus:border-0"
//                 {...register("confirmPassword", {
//                   required: "Passwords do not match",
//                 })}
//               />
//               <button
//                 type="button"
//                 onClick={() => handlePasswordToggle("confirmPassword")}
//                 className="flex-[0.1] flex items-center justify-center"
//               >
//                 {securedPassword.confirmPassword ? (
//                   <FaRegEye />
//                 ) : (
//                   <FaRegEyeSlash />
//                 )}
//               </button>
//             </div>

//             {newPasswordValue !== confirmPasswordValue && (
//               <small className="text-red">Passwords do not match</small>
//             )}
//           </div>

//           <PrimaryButton
//             btnType="submit"
//             btnValue="Create New Password"
//             disable={submitState}
//           />
//         </form>
//       </div>
//     </AuthLayout>
//   );
// };

// export default ResetPassword;

// const AccountCreation = () => {
//   const [submitState, setSubmitState] = useState(false);
//   const [showPassword, setShowPassword] = useState({
//     password: false,
//     confirmPassword: false,
//   });
//   const [passwordValidationState, setPasswordValidationState] = useState({
//     hasMinLength: false,
//     hasUppercase: false,
//     hasLowercase: false,
//     hasNumber: false,
//     hasSpecialChar: false,
//   });
//   const {
//     register,
//     reset,
//     watch,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<IAuthFormInputs>({
//     mode: "all",
//   });
//   const { handleNavigation } = useNavigator();

//   const {
//     hasLowercase,
//     hasMinLength,
//     hasNumber,
//     hasSpecialChar,
//     hasUppercase,
//   } = passwordValidationState;

//   const passwordValue = watch("password");
//   const confirmPasswordValue = watch("confirmPassword");

//   const togglePasswordVisibility = (
//     key: keyof typeof showPassword,
//     currentState: boolean,
//   ) => {
//     setShowPassword((prevState) => ({
//       ...prevState,
//       [key]: currentState,
//     }));
//   };

//   const handleUserSignup: SubmitHandler<IAuthFormInputs> = async (data) => {
//     setSubmitState(true);

//     const registerUserPayload = {
//       fullname: data.name,
//       email: data.email,
//       password: data.password,
//     };

//     try {
//       const res = await axiosFetcher.post("/userRegister", registerUserPayload);
//       toast.success(res.data.message || "Successful");
//       reset();
//       handleNavigation("/login");
//     } catch (error) {
//       // console.log(error);
//       ErrorCheck(error);
//     } finally {
//       setSubmitState(false);
//     }
//   };

//   useEffect(() => {
//     if (passwordValue) {
//       setPasswordValidationState({
//         hasMinLength: passwordValue.length >= 8,
//         hasUppercase: /[A-Z]/.test(passwordValue),
//         hasLowercase: /[a-z]/.test(passwordValue),
//         hasNumber: /[0-9]/.test(passwordValue),
//         hasSpecialChar: /[!@#$%^&*()_+\-=\\[\]{};':"\\|,.<>\\/?]/.test(
//           passwordValue,
//         ),
//       });
//     }
//   }, [passwordValue]);

//   return (
//     <AuthLayout>
//       <div className="flex flex-col w-full gap-3">
//         <div className="flex flex-col text-center w-full gap-1 items-center self-center">
//           <span className="text-[1.25rem] font-semibold md:text-[1.5rem]">
//             Create an Account
//           </span>
//           <span className="text-[1rem] md:text-[1.25rem]">
//             Enter your details to create an account
//           </span>
//         </div>

//         <form
//           onSubmit={handleSubmit(handleUserSignup)}
//           className="flex flex-col w-full gap-3"
//         >
//           <div className="flex flex-col w-full gap-1">
//             <div className="flex flex-row border border-deepGray p-2 rounded-md w-full gap-2 items-stretch min-h-[3rem]">
//               <CustomIcon path={userIcon} />
//               <input
//                 type="text"
//                 id="name"
//                 placeholder="Full Name"
//                 {...register("name", { required: true })}
//                 className="flex-1 border-0 rounded-md focus:border-0 focus:outline-0 outline-0"
//               />
//             </div>

//             {errors.name && (
//               <small className="text-red">Fullname is required</small>
//             )}
//           </div>

//           <div className="flex flex-col w-full gap-1">
//             <div className="flex flex-row border border-deepGray p-2 rounded-md w-full gap-2 items-stretch min-h-[3rem]">
//               <CustomIcon path={emailIcon} />
//               <input
//                 type="email"
//                 id="email"
//                 placeholder="Email address"
//                 {...register("email", { required: true })}
//                 className="flex-1 border-0 rounded-md focus:border-0 focus:outline-0 outline-0"
//               />
//             </div>

//             {errors.email && (
//               <small className="text-red">Email is required</small>
//             )}
//           </div>

//           <div className="flex flex-col w-full">
//             <div className="flex flex-row border border-deepGray p-2 rounded-md w-full gap-2 items-stretch min-h-[3rem]">
//               <CustomIcon path={passwordIcon} />
//               <input
//                 type={showPassword.password ? "text" : "password"}
//                 placeholder="Password"
//                 className="flex-1 border-0 rounded-md focus:border-0 focus:outline-0 outline-0"
//                 {...register("password", {
//                   required: "Password is required",
//                   minLength: {
//                     value: 8,
//                     message: "Password must be at least 8 characters",
//                   },
//                   validate: passwordValidation,
//                 })}
//               />
//               <button
//                 type="button"
//                 onClick={() =>
//                   togglePasswordVisibility("password", !showPassword.password)
//                 }
//                 className="flex flex-[0.1] justify-center items-center"
//               >
//                 {showPassword.password ? <FaRegEye /> : <FaRegEyeSlash />}
//               </button>
//             </div>

//             {errors.password && (
//               <small className="text-red">{errors.password.message}</small>
//             )}

//             <PassWordRequirementIndicators
//               hasMinLength={hasMinLength}
//               hasUppercase={hasUppercase}
//               hasLowercase={hasLowercase}
//               hasNumber={hasNumber}
//               hasSpecialChar={hasSpecialChar}
//             />
//           </div>

//           <div className="flex flex-col w-full gap-1">
//             <div className="flex flex-row border border-deepGray p-2 rounded-md w-full gap-2 items-stretch min-h-[3rem]">
//               <CustomIcon path={passwordIcon} />
//               <input
//                 type={showPassword.confirmPassword ? "text" : "password"}
//                 placeholder="Confirm Password"
//                 className="flex-1 border-0 rounded-md focus:border-0 focus:outline-0 outline-0"
//                 {...register("confirmPassword", {
//                   required: "Passwords do not match",
//                 })}
//               />
//               <button
//                 type="button"
//                 onClick={() =>
//                   togglePasswordVisibility(
//                     "confirmPassword",
//                     !showPassword.confirmPassword,
//                   )
//                 }
//                 className="flex flex-[0.1] justify-center items-center"
//               >
//                 {showPassword.confirmPassword ? (
//                   <FaRegEye />
//                 ) : (
//                   <FaRegEyeSlash />
//                 )}
//               </button>
//             </div>

//             {passwordValue !== confirmPasswordValue && (
//               <small className="text-red">Passwords do not match</small>
//             )}
//           </div>

//           <div className="flex flex-col w-full">
//             <label htmlFor="terms" className="flex flex-row gap-2 items-center">
//               <input
//                 type="checkbox"
//                 id="terms"
//                 {...register("checkbox", { required: true })}
//                 className="accent-black"
//               />
//               <span className="text-black text-xs">
//                 I've read and accepted the&nbsp;
//                 <Link
//                   to={"/terms-and-condition"}
//                   className="text-secondary font-semibold"
//                 >
//                   Terms and Conditions
//                 </Link>
//                 &nbsp; and&nbsp;
//                 <Link
//                   to={"/terms-and-condition"}
//                   className="text-secondary font-semibold"
//                 >
//                   Privacy Policy
//                 </Link>
//                 &nbsp; of Risk Office
//               </span>
//             </label>

//             {errors.checkbox && (
//               <small className="text-red">Please accept our terms</small>
//             )}
//           </div>

//           <div className="flex flex-col w-full gap-2">
//             <PrimaryButton
//               btnType="submit"
//               btnValue="Create New Password"
//               disable={submitState}
//             />

//             <span className="text-center text-deepGray">
//               Already an account?{" "}
//               <Link to="/login" className="text-primary underline">
//                 Login
//               </Link>
//             </span>
//           </div>
//         </form>
//       </div>
//     </AuthLayout>
//   );
// };

// export default AccountCreation;
