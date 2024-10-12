document.addEventListener("DOMContentLoaded", () => {
    const callBtn = document.getElementById("callBtn");
    const hangupBtn = document.getElementById("hangupBtn");
    const loginBtn = document.getElementById("loginBtn");
    const userId = document.getElementById("userId");
    const accessToken = document.getElementById("accessToken");
    const callStatus = document.getElementById("callStatus");
  
    loginBtn.addEventListener("click", () => {
      const token = accessToken.value.trim();
      if (token) {
        userId.textContent = "User123"; // Thay thế bằng logic đăng nhập thực tế
        userId.style.color = "green";
        alert("Đăng nhập thành công!");
      } else {
        alert("Vui lòng nhập Access Token!");
      }
    });
  
    callBtn.addEventListener("click", () => {
      if (userId.textContent !== "Not logged in") {
        callStatus.textContent = "Calling...";
        callStatus.style.color = "orange";
      } else {
        alert("Vui lòng đăng nhập trước khi thực hiện cuộc gọi!");
      }
    });
  
    hangupBtn.addEventListener("click", () => {
      if (callStatus.textContent === "Calling...") {
        callStatus.textContent = "Call ended";
        callStatus.style.color = "red";
      }
    });
  
    // Ví dụ thêm sự kiện cho nút mute
    const muteBtn = document.getElementById("muteBtn");
    let isMuted = false;
  
    muteBtn.addEventListener("click", () => {
      isMuted = !isMuted;
      muteBtn.textContent = isMuted ? "Unmute" : "Mute";
      alert(isMuted ? "Đã tắt tiếng" : "Đã bật tiếng");
    });
  });