document.addEventListener("DOMContentLoaded", () => {

  // ===== POPUP REGISTRATION =====
  const popup = document.getElementById("popup");
  const registerBtn = document.getElementById("registerBtn");

  if (registerBtn && popup) {
    registerBtn.onclick = () => {
      popup.style.display = "block";
    };
  }

  window.closeForm = function () {
    popup.style.display = "none";
  };

  window.submitForm = function () {
    const player = document.getElementById("player").value;
    const team = document.getElementById("team").value;
    const email = document.getElementById("email").value;

    if (!player || !team || !email) {
      alert("Please fill all fields");
      return;
    }

    window.database.ref("registrations").push({
      playerName: player,
      teamName: team,
      email: email,
      time: new Date().toLocaleString()
    });

    alert("✅ Registration saved!");
    closeForm();
  };

  // ===== SHOW MATCHES =====
  const matchList = document.getElementById("matchList");

  if (matchList) {
    window.database.ref("matches").on("value", (snapshot) => {
      matchList.innerHTML = "";

      if (!snapshot.exists()) {
        matchList.innerHTML = "<p>No matches scheduled yet.</p>";
        return;
      }

      snapshot.forEach((child) => {
        const match = child.val();

        matchList.innerHTML += `
          <div class="match-card">
            <h3>${match.team1} ⚔ ${match.team2}</h3>
            <p>📅 Date: ${match.date}</p>
            <p>⏰ Time: ${match.time}</p>
          </div>
        `;
      });
    });
  }

});
// ===== SHOW MATCH RESULTS =====
const resultList = document.getElementById("resultList");

if (resultList) {
  window.database.ref("results").on("value", (snapshot) => {
    resultList.innerHTML = "";

    if (!snapshot.exists()) {
      resultList.innerHTML = "<p>No results yet.</p>";
      return;
    }

    snapshot.forEach((child) => {
      const r = child.val();

      resultList.innerHTML += `
        <div class="match-card">
          <p><b>${r.team1}</b> vs <b>${r.team2}</b></p>
          <p>🏆 Winner: <b>${r.winner}</b></p>
        </div>
      `;
    });
  });
}
