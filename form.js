document.getElementById("cyberSurvey").addEventListener("submit", function (e) {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);
  let score = 0;
  let summaryParts = [];

  // Custom validation
  const textarea = document.getElementById("userTip");
  const unanswered = [...form.querySelectorAll('select')].filter(select => !select.value);

  if (unanswered.length > 0 || !textarea.value.trim()) {
    alert("⚠️ Please answer all questions and provide a cyber tip before submitting.");
    return;
  }

  formData.forEach((value, key) => {
    score += parseInt(value);

    switch (key) {
      case "passwords":
        summaryParts.push(value == 2 ? "use strong passwords" : value == 1 ? "sometimes use strong passwords" : "reuse passwords");
        break;
      case "2fa":
        summaryParts.push(value == 2 ? "enable 2FA on all accounts" : value == 1 ? "enable 2FA on some accounts" : "do not use 2FA");
        break;
      case "phishing":
        summaryParts.push(value == 2 ? "ignore and report suspicious links" : value == 1 ? "check links before clicking" : "sometimes click suspicious links");
        break;
      case "updates":
        summaryParts.push(value == 2 ? "regularly update your software" : value == 1 ? "occasionally update software" : "rarely update software");
        break;
      case "antivirus":
        summaryParts.push(value == 2 ? "use antivirus software" : value == 1 ? "sometimes use antivirus" : "do not use antivirus");
        break;
      case "backup":
        summaryParts.push(value == 2 ? "regularly back up data" : value == 1 ? "sometimes back up data" : "never back up data");
        break;
      case "urls":
        summaryParts.push(value == 2 ? "always verify URLs" : value == 1 ? "sometimes verify URLs" : "rarely verify URLs");
        break;
      case "wifi":
        summaryParts.push(value == 2 ? "avoid public Wi-Fi for sensitive tasks" : value == 1 ? "use VPN on public Wi-Fi" : "use public Wi-Fi unsafely");
        break;
      case "permissions":
        summaryParts.push(value == 2 ? "check app permissions" : value == 1 ? "sometimes check permissions" : "rarely check permissions");
        break;
      case "workpass":
        summaryParts.push(value == 2 ? "use separate work and personal passwords" : value == 1 ? "sometimes separate passwords" : "reuse passwords across work and personal");
        break;
    }
  });

  const summarySentence = `You ${summaryParts.join(", ")}.`;
  const surveySummary = document.getElementById("surveySummary");
  const surveyFeedback = document.getElementById("surveyFeedback");
  const surveyResult = document.getElementById("surveyResult");

  surveySummary.textContent = summarySentence;

  // Feedback based on score (0-20)
  if (score >= 16) {
    surveyFeedback.textContent = "You are extremely cyber safe! Excellent practices!";
  } else if (score >= 10) {
    surveyFeedback.textContent = "You are moderately cyber safe. Keep improving!";
  } else {
    surveyFeedback.textContent = "You are at high risk! Please follow the tips above to improve your safety.";
  }

  surveyResult.classList.remove("d-none");
  setTimeout(() => surveyResult.classList.add("show"), 50);
  surveyResult.scrollIntoView({ behavior: "smooth" });
});

// Character counter for textarea
const textarea = document.getElementById("userTip");
const charCount = document.getElementById("charCount");

if (textarea && charCount) {
  textarea.addEventListener("input", () => {
    charCount.textContent = textarea.value.length;
  });
}

// Live update for range slider
const rangeSlider = document.getElementById("selfRating");
const ratingOutput = document.getElementById("ratingValue");

if (rangeSlider && ratingOutput) {
  rangeSlider.value = 5;
  ratingOutput.textContent = 5;
  rangeSlider.addEventListener("input", () => {
    ratingOutput.textContent = rangeSlider.value;
  });
}
