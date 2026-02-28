document.addEventListener("DOMContentLoaded", () => {
  const tabLogin = document.getElementById("tab-login");
  const tabRegister = document.getElementById("tab-register");
  const loginView = document.getElementById("loginView");
  const registerView = document.getElementById("registerView");
  const toLoginLink = document.getElementById("toLogin");

  function showLogin() {
    tabLogin.classList.add("active");
    tabRegister.classList.remove("active");
    loginView.classList.remove("hidden");
    registerView.classList.add("hidden");
  }

  function showRegister() {
    tabRegister.classList.add("active");
    tabLogin.classList.remove("active");
    registerView.classList.remove("hidden");
    loginView.classList.add("hidden");
  }

  tabLogin.addEventListener("click", (e) => {
    e.preventDefault();
    showLogin();
  });

  tabRegister.addEventListener("click", (e) => {
    e.preventDefault();
    showRegister();
  });

  if (toLoginLink) {
    toLoginLink.addEventListener("click", (e) => {
      e.preventDefault();
      showLogin();
    });
  }

  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");

  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = {
        username: loginForm.username.value.trim(),
        password: loginForm.password.value,
      };
      console.log("Login:", data);
      alert("Tentativa de login enviada (ver console).");
    });
  }

  if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = registerForm.name.value.trim();
      const email = registerForm.email.value.trim();
      const password = registerForm.password.value;
      const confirm = registerForm.confirmPassword.value;

      if (password !== confirm) {
        alert("As senhas não coincidem.");
        return;
      }

      const payload = { name, email, password };
      console.log("Cadastro:", payload);
      alert("Cadastro enviado (ver console).");
      // opcional: limpar formulário
      registerForm.reset();
      showLogin();
    });
  }
});
