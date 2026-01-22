// =============================
// COPY DATABASE (EDIT THIS ONLY)
// =============================
const copies = [
  {
    searchName: "Update Announced (Game)",
    copy: `UPDATE ANNOUNCED!

Join the update for:
- ???

EVENT LINKS:
Event Link: PASTE`
  },
  {
    searchName: "Update Announced (Cook a Brainrot)",
    copy: `UPDATE ANNOUNCED! :Suprised: 

Join the update for:
- Limited/Rare brainrots :Garama67::LosTegos:
- Events :rainbow: :star_struck::Suprised:
- Luck :four_leaf_clover::fingers_crossed:
- And more fun and cool stuff :sunglasses::fire:

EVENT LINKS:
Discord Event: Paste
Roblox Event: Paste`
  }
];

// =============================
// ELEMENTS
// =============================
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const results = document.getElementById("results");
const copyOutput = document.getElementById("copyOutput");
const copyBtn = document.getElementById("copyBtn");
const downloadBtn = document.getElementById("downloadBtn");
const resultCount = document.getElementById("resultCount");

let currentCopy = "";
let currentTitle = "";

// =============================
// SEARCH MATCHING (FUZZY)
// =============================
function matchesSearch(name, query) {
  const nameWords = name.toLowerCase().split(" ");
  const searchWords = query.toLowerCase().split(" ");

  return searchWords.some(word =>
    nameWords.some(nw => nw.includes(word))
  );
}

// =============================
// SEARCH EXECUTION
// =============================
function runSearch() {
  const query = searchInput.value.trim();

  results.innerHTML = "";
  resultCount.textContent = "";
  copyOutput.textContent = "Copy here...";
  currentCopy = "";
  currentTitle = "";

  if (!query) return;

  const filtered = copies.filter(c =>
    matchesSearch(c.searchName, query)
  );

  resultCount.textContent = `${filtered.length} result(s)`;

  filtered.forEach(c => {
    const div = document.createElement("div");
    div.className = "result";
    div.textContent = c.searchName;
    div.onclick = () => {
      currentCopy = c.copy;
      currentTitle = c.searchName;
      copyOutput.textContent = c.copy;
    };
    results.appendChild(div);
  });
}

// =============================
// COPY (WORKS IN CODEPEN)
// =============================
function copyToClipboard(text) {
  const temp = document.createElement("textarea");
  temp.value = text;
  document.body.appendChild(temp);
  temp.select();
  document.execCommand("copy");
  document.body.removeChild(temp);
}

copyBtn.addEventListener("click", () => {
  if (!currentCopy) return;
  copyToClipboard(currentCopy);
  copyBtn.textContent = "Copied!";
  setTimeout(() => (copyBtn.textContent = "Copy"), 1000);
});

// =============================
// DOWNLOAD AS TXT
// =============================
downloadBtn.addEventListener("click", () => {
  if (!currentCopy) return;

  const blob = new Blob([currentCopy], { type: "text/plain" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = `${currentTitle || "copy"}.txt`;
  a.click();

  URL.revokeObjectURL(url);
});

// =============================
// EVENTS
// =============================
searchBtn.addEventListener("click", runSearch);

searchInput.addEventListener("keydown", e => {
  if (e.key === "Enter") runSearch();
});
