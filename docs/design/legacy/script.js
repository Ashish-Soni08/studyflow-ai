const toast = document.querySelector("#toast");
const statusStrip = document.querySelector("#statusStrip");
const flowCopy = document.querySelectorAll("[data-flow-copy]");

function syncFlowCopyState() {
  flowCopy.forEach((element) => {
    element.classList.toggle(
      "is-overflowing",
      element.scrollWidth > element.clientWidth + 1
    );
  });
}

if (flowCopy.length) {
  const resizeObserver = new ResizeObserver(syncFlowCopyState);
  resizeObserver.observe(document.querySelector(".workspace"));
  flowCopy.forEach((element) => {
    new MutationObserver(syncFlowCopyState).observe(element, {
      characterData: true,
      childList: true,
      subtree: true,
    });
  });
  document.fonts?.ready.then(syncFlowCopyState);
  syncFlowCopyState();
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove("show"), 2800);
}

document.querySelectorAll(".nav-item").forEach((item) => {
  item.addEventListener("click", () => {
    document.querySelectorAll(".nav-item").forEach((nav) => nav.classList.remove("active"));
    item.classList.add("active");
    const label = item.textContent.replace(/\s+/g, " ").trim();
    showToast(`${label} geöffnet. Für den Demo-Mockup bleibt die Übersicht im Fokus.`);
  });
});

document.querySelectorAll(".language-toggle button").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".language-toggle button").forEach((btn) => btn.classList.remove("selected"));
    button.classList.add("selected");
    const language = button.textContent.trim();
    if (language === "DE") {
      showToast("Deutsch bleibt die Hauptsprache der App.");
    } else {
      showToast(`${language} wird als Materialsprache erkannt. Die Oberfläche bleibt deutsch.`);
    }
  });
});

document.querySelectorAll(".action-row").forEach((button) => {
  button.addEventListener("click", () => {
    showToast(button.dataset.message);
  });
});

document.querySelectorAll(".confirm-button").forEach((button) => {
  button.addEventListener("click", () => {
    const row = button.closest("tr");
    row.classList.remove("pending-row");
    row.querySelector("td:nth-child(7)").innerHTML = '<span class="chip green">Bestätigt</span>';
    row.querySelector("td:nth-child(8)").innerHTML = '<button class="icon-button" type="button" aria-label="Termin bestätigt"><span class="material-symbols-rounded">check</span></button>';
    showToast("Termin bestätigt und in Mayas Lernplan übernommen.");
  });
});

document.querySelector("#linkCheckBtn").addEventListener("click", () => {
  showToast("Verknüpfungen geprüft: Folien 10-15 passen zu Notizen 4-6.");
});

document.querySelector("#addEventBtn").addEventListener("click", () => {
  const tbody = document.querySelector("#eventRows");
  const row = document.createElement("tr");
  row.innerHTML = `
    <td>Fr, 30. Mai</td>
    <td>11:30</td>
    <td>Unterrichtsentwurf Abgabe</td>
    <td><span class="chip red">Abgabe</span></td>
    <td>Notizen_Seminar.pdf</td>
    <td>84%</td>
    <td><span class="chip amber">Ausstehend</span></td>
    <td><button class="confirm-button" type="button" aria-label="Termin bestätigen">OK</button></td>
  `;
  row.querySelector(".confirm-button").addEventListener("click", () => {
    row.querySelector("td:nth-child(7)").innerHTML = '<span class="chip green">Bestätigt</span>';
    row.querySelector("td:nth-child(8)").innerHTML = '<button class="icon-button" type="button" aria-label="Termin bestätigt"><span class="material-symbols-rounded">check</span></button>';
    showToast("Neuer Termin bestätigt.");
  });
  tbody.appendChild(row);
  showToast("Neuer erkannter Termin wurde ergänzt.");
});

document.querySelector("#processBtn").addEventListener("click", () => {
  const button = document.querySelector("#processBtn");
  button.disabled = true;
  button.innerHTML = '<span class="material-symbols-rounded">progress_activity</span> Prüfe...';
  window.setTimeout(() => {
    statusStrip.classList.remove("show");
    button.disabled = false;
    button.innerHTML = '<span class="material-symbols-rounded">task_alt</span> Jetzt prüfen';
    showToast("Uploads geprüft: 2 Termine, 1 neue Wissenslücke und 12 Karteikarten gefunden.");
  }, 650);
});

document.querySelectorAll(".focus-list input").forEach((checkbox) => {
  checkbox.addEventListener("change", () => {
    showToast(checkbox.checked ? "Lernblock als erledigt markiert." : "Lernblock wieder geöffnet.");
  });
});

document.querySelector('[data-view="uploads"]').addEventListener("click", () => {
  statusStrip.classList.add("show");
});
