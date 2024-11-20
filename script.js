const analyzeButton = document.getElementById('analyze-button');
const resumeText = document.getElementById('resume-text');
const analysisResults = document.getElementById('analysis-results');

analyzeButton.addEventListener('click', (e) => {
  e.preventDefault();
  const resumeTextValue = resumeText.value;
  fetch('/analyze', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ resumeText: resumeTextValue }),
  })
    .then((response) => response.json())
    .then((data) => {
      analysisResults.innerHTML = '';
      data.forEach((result) => {
        const resultElement = document.createElement('p');
        resultElement.textContent = result.form;
        analysisResults.appendChild(resultElement);
      });
    })
    .catch((error) => console.error(error));
});
