

var copyButton = document.querySelector('.copy')
copyButton.addEventListener("click", () => {
    navigator.clipboard.writeText("RO20BRDE050SV09394520500");
    copyButton.textContent = "IBAN copiat ✓";
    copyButton.style.color = "green";
});