  const btn = document.getElementById("readMoreBtn");
  const text = document.getElementById("descText");

  btn.addEventListener("click", () => {
    text.classList.toggle("expanded");
    btn.textContent = text.classList.contains("expanded")
      ? "Read Less"
      : "Read More";
  });
