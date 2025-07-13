document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");

    form.addEventListener("submit", async (e) => {
        e.preventDefault(); // 기본 폼 제출 방지

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;

        if (!email || !password) {
            alert("모든 필드를 입력해주세요.");
            return;
        }

        try {
            const response = await axios.post("/auth/login", {
                email,
                password,
            });

            if (response.status === 200) {
                alert("로그인 완료되었습니다.");
                window.location.href = "/";
            } else {
                alert("로그인이 실패했습니다.");
            }
        } catch (error) {
            console.error(error);
            const msg = error.response?.data?.message || "오류가 발생했습니다.";
            alert(msg);
        }
    });
});
