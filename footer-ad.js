document.addEventListener("DOMContentLoaded", function () {
  const footer = document.querySelector("footer");
  if (!footer) return;

  const adDiv = document.createElement("div");
  adDiv.style.width = "100%";
  adDiv.style.textAlign = "center";
  adDiv.style.marginTop = "10px";

  adDiv.innerHTML = `
    <a href="https://t.me/GmailFarmerBot?start=6875072919"
       target="_blank"
       rel="noopener noreferrer">
      <img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjDvAVtw0MhB2PE7m4Wf4ygK5Zj6tHRh1vNLU9AHQ5vCayfEC8d5dv6EoMekR7XwJGuOT-J4lL9nixxO_nMiok7CAByXgd2QvHA6bA7x-la6-0nKzot3sbNnDzWUx9R6_GPEuBCMsgzfrOUqCFEcX1FsF8g_i5NsfR7IGPnyDeFNSXkw1nJ-nGVDDPdXtc/s1280/20260205_234955.png" 
           alt="Footer Ad">
    </a>
  `;

  footer.insertAdjacentElement("afterend", adDiv);
});
