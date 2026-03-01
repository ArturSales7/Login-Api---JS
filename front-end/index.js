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

  // LOGIN
  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      
      const username = loginForm.username.value.trim();
      const password = loginForm.password.value;

      if (!username || !password) {
        alert("Preencha todos os campos");
        return;
      }

      try {
        const response = await fetch("http://localhost:3000/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (response.ok) {
          alert("Login realizado com sucesso!");
          // opcional: limpar campos
          loginForm.reset();
        } else {
          alert(data.error || "Erro no login");
        }
      } catch (error) {
        alert("Erro ao conectar com o servidor. Verifique se ele está rodando.");
        console.error(error);
      }
    });
  }

  // CADASTRO
  if (registerForm) {
    registerForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const username = registerForm.username.value.trim();
      const email = registerForm.email.value.trim();
      const password = registerForm.password.value;
      const confirm = registerForm.confirmPassword.value;

      if (!username || !email || !password || !confirm) {
        alert("Preencha todos os campos");
        return;
      }

      if (password !== confirm) {
        alert("As senhas não coincidem.");
        return;
      }

      try {
        const response = await fetch("http://localhost:3000/cadastro", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, email, password })
        });

        const data = await response.json();

        if (response.ok) {
          alert("Cadastro realizado com sucesso!");
          registerForm.reset();
          showLogin(); // Volta pra tela de login
        } else {
          alert(data.error || "Erro no cadastro");
        }
      } catch (error) {
        alert("Erro ao conectar com o servidor. Verifique se ele está rodando.");
        console.error(error);
      }
    });
  }
});