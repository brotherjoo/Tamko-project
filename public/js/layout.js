document.addEventListener("DOMContentLoaded", () => {
    const logo = document.querySelector(".logo");
    const loginBtn = document.querySelector(".login-btn");
    const writeBtn = document.querySelector(".write-btn");
    const joinBtn = document.querySelector(".join-btn");
    const logoutBtn = document.querySelector(".logout-btn");

    if (logo) {
        logo.addEventListener("click", () => {
            window.location.assign("/");
        });
    }

    if (loginBtn) {
        loginBtn.addEventListener("click", () => {
            window.location.assign("/login");
        });
    }

    if (writeBtn) {
        writeBtn.addEventListener("click", () => {
            window.location.assign("/blog");
        });
    }

    if (joinBtn) {
        joinBtn.addEventListener("click", () => {
            window.location.assign("/join");
        });
    }

    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            window.location.assign("/auth/logout");
        });
    }
});
