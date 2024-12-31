export function verifyPassword(password) {
  // Define the conditions
  const lengthCondition = password.length >= 8;
  const uppercaseCondition = /[A-Z]/.test(password);
  const lowercaseCondition = /[a-z]/.test(password);
  const digitCondition = /\d/.test(password);
  const specialCharCondition = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  // Check all conditions
  let message = "Le mot de passe doit contenir :";
  if (!lengthCondition) message += "\n- Au moins 8 caractères";
  if (!uppercaseCondition) message += "\n- Une lettre majuscule";
  if (!lowercaseCondition) message += "\n- Une lettre minuscule";
  if (!digitCondition) message += "\n- Un chiffre";
  if (!specialCharCondition) message += "\n- Un caractère spécial";

  if (
    lengthCondition &&
    uppercaseCondition &&
    lowercaseCondition &&
    digitCondition &&
    specialCharCondition
  ) {
    return { message: "Password is strong!", success: true, color: "green" };
  } else {
    return { message: message, success: false, color: "green" };
  }
}
