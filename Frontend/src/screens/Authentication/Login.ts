import { useState, useEffect } from 'react';

function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log("Login erfolgreich");
    // Logik für erfolgreichen Login hier einfügen
  };

  const handleForgotPassword = () => {
    console.log("Passwort vergessen...");
    // Logik für "Passwort vergessen" hier einfügen
  };

  useEffect(() => {
    const usernameInput = document.getElementById('username') as HTMLInputElement;
    const passwordInput = document.getElementById('password') as HTMLInputElement;
    const forgotPasswordButton = document.getElementById('forgotPasswordButton');
    const loginButton = document.getElementById('loginButton');

    if (forgotPasswordButton) {
      forgotPasswordButton.addEventListener('click', handleForgotPassword);
    }

    if (loginButton) {
      loginButton.addEventListener('click', handleLogin);
    }

    if (usernameInput && passwordInput) {
      usernameInput.addEventListener('input', function (event) {
        setUsername((event.target as HTMLInputElement).value);
      });

      passwordInput.addEventListener('input', function (event) {
        setPassword((event.target as HTMLInputElement).value);
      });
    }
  }, []);

  return null;
}

export default LoginScreen;
