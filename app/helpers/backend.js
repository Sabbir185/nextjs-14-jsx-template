import { del, get, patch, post, postForm } from "./api";

export const uploadSingleFile = data => postForm('/file/single-file-upload', data)
export const uploadMultipleFile = data => postForm('/file/multiple-file-upload', data)
export const deleteFile = data => post('/file/delete', data)

export const postSendOtp = data => post('/otp/send', data)
export const postOtpVerify = data => post('/user/otp-verify', data)

//OTP related(forgot password)
export const verifyOTPForgotPass = data => post('/otp/forget-password-verify', data)
export const resetPass = data => post('/auth/forget-password', data)

export const postLogin = data => post('/auth/login', data)
export const postSocialLogin = data => post('/user/social-login-web', data)
export const postSignup = data => post('/user/sign-up', data)
export const fetchProfile = data => get('/user/profile', data)
export const updateProfile = data => patch('/user/profile', data)
export const updatePassword = data => patch('/user/password-change', data)

// languages
export const fetchLanguages = (data) => get("/language/list", data); //paginated
export const fetchLanguage = (data) => get("/language", data);
export const postLanguage = (data) => post("/language", data);
export const updateLanguage = (data) => patch("/language", data);
export const delLanguage = (data) => del("/language", data);

// translations
export const fetchTranslations = (data) => get("/language/translation", data);
export const fetchAllLanguages = (data) => get("/language/all", data); //without paginated

//settings
export const fetchSiteSettings = data => get('/settings', data)
export const fetchSiteSettingsPublic = data => get('/settings/site', data)
export const postSettings = data => post('/settings', data)

//category
export const postVehicleCategory = data => post('/category', data)
export const updateVehicleCategory = data => patch('/category', data)
export const fetchVehicleCategories = data => get('/category/list', data) //paginated
export const fetchAllVehicleCategories = data => get('/category/all', data)
export const deleteVehicleCategory = data => del('/category', data)