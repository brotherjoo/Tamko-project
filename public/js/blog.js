document.addEventListener("DOMContentLoaded", () => {
    const gameSelect = document.getElementById("game");
    const otherGameInput = document.querySelector(".other-game-input");

    gameSelect.addEventListener("change", () => {
        const isOther = gameSelect.value === "other";
        otherGameInput.style.display = isOther ? "block" : "none";
        document.getElementById("otherGameTitle").required = isOther;
        document.getElementById("otherGameImage").required = isOther;
    });

    const form = document.getElementById("write-form");
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        // 가져올 입력 요소들
        const rating = document.querySelector('input[name="rating"]:checked')?.value;
        const description = document.getElementById("description")?.value.trim();
        const game = gameSelect.value;

        // 기타 게임 정보
        const otherGameTitle = document.getElementById("otherGameTitle")?.value.trim();
        const otherGameImageFile = document.getElementById("otherGameImage")?.files[0];

        // 유효성 검사
        if (!rating || !description || !game) {
            alert("모든 필드를 올바르게 입력해주세요.");
            return;
        }

        if (game === "other") {
            if (!otherGameTitle || !otherGameImageFile) {
                alert("기타 게임의 제목과 이미지를 입력해주세요.");
                return;
            }
        }

        // FormData 구성
        const formData = new FormData();
        formData.append("rating", rating);
        formData.append("description", description);
        formData.append("game", game);

        if (game === "other") {
            formData.append("otherGameTitle", otherGameTitle);
            formData.append("otherGameImage", otherGameImageFile);
        }

        // 서버로 전송
        try {
            const response = await axios.post("/blog/register", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            if (response.status === 200) {
                alert("글이 성공적으로 등록되었습니다!");
                window.location.href = "/";
            } else {
                alert("등록에 실패했습니다. 다시 시도해주세요.");
            }
        } catch (error) {
            alert("오류 발생: " + (error.response?.data?.message || error.message));
        }
    });
});
