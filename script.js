document.addEventListener('DOMContentLoaded', () => {
    // Form submission handling
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', async (event) => {
            event.preventDefault();
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());

            try {
                const response = await fetch('/api/save-resume', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                if (!response.ok) throw new Error('Failed to save resume');

                showNotification('Resume saved successfully!', 'success');
            } catch (error) {
                showNotification('Error saving resume', 'error');
                console.error('Error:', error);
            }
        });
    });

    // Navigation handling
    document.querySelectorAll('nav ul li a').forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const section = document.querySelector(link.getAttribute('href'));
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Add/Remove buttons handling
    const addButtons = {
        skill: document.querySelector('.add-skill'),
        work: document.querySelector('.add-work'),
        education: document.querySelector('.add-education')
    };

    for (let type in addButtons) {
        if (addButtons[type]) {
            addButtons[type].addEventListener('click', () => createNewItem(type));
        }
    }

    // Handle remove buttons through event delegation
    document.addEventListener('click', (event) => {
        if (event.target.classList.contains('remove-skill') ||
            event.target.classList.contains('remove-work') ||
            event.target.classList.contains('remove-education')) {
            event.target.closest('div').remove();
        }
    });

    // AI Analysis button handling
    const analyzeButton = document.querySelector('.analyze');
    if (analyzeButton) {
        analyzeButton.addEventListener('click', async () => {
            try {
                const response = await fetch('/api/analyze-resume', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(collectResumeData())
                });

                if (!response.ok) throw new Error('Analysis failed');

                const analysis = await response.json();
                displayAnalysisResults(analysis);
            } catch (error) {
                showNotification('Error analyzing resume', 'error');
                console.error('Error:', error);
            }
        });
    }
});

// Helper functions
function createNewItem(type) {
    const container = document.querySelector(`#${type}s form`);
    const count = container.querySelectorAll(`.${type}-item`).length + 1;
    const div = document.createElement('div');
    div.className = `${type}-item`;
    
    switch(type) {
        case 'skill':
            div.innerHTML = `
                <label for="skill${count}">Skill ${count}:</label>
                <input type="text" id="skill${count}" name="skill${count}" required>
                <button type="button" class="remove-skill" aria-label="Remove skill">Remove</button>
            `;
            break;
        case 'work':
            div.innerHTML = `
                <label for="job-title${count}">Job Title:</label>
                <input type="text" id="job-title${count}" name="job-title${count}" required>
                <label for="company${count}">Company:</label>
                <input type="text" id="company${count}" name="company${count}" required>
                <label for="duration${count}">Duration:</label>
                <input type="text" id="duration${count}" name="duration${count}" required>
                <button type="button" class="remove-work" aria-label="Remove work experience">Remove</button>
            `;
            break;
        case 'education':
            div.innerHTML = `
                <label for="degree${count}">Degree:</label>
                <input type="text" id="degree${count}" name="degree${count}" required>
                <label for="school${count}">School:</label>
                <input type="text" id="school${count}" name="school${count}" required>
                <label for="graduation${count}">Graduation Year:</label>
                <input type="number" id="graduation${count}" name="graduation${count}" min="1900" max="2099" required>
                <button type="button" class="remove-education" aria-label="Remove education">Remove</button>
            `;
            break;
    }

    container.insertBefore(div, container.lastElementChild);
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

function collectResumeData() {
    const data = {};
    document.querySelectorAll('form').forEach(form => {
        const formData = new FormData(form);
        for (let [key, value] of formData.entries()) {
            data[key] = value;
        }
    });
    return data;
}

function displayAnalysisResults(analysis) {
    const resultsDiv = document.querySelector('#analysis-results');
    if (!resultsDiv) return;

    resultsDiv.innerHTML = `
        <h3>Analysis Results</h3>
        <p>Score: ${analysis.score}/100</p>
        <h4>Suggestions:</h4>
        <ul>
            ${analysis.suggestions.map(suggestion => `<li>${suggestion}</li>`).join('')}
        </ul>
    `;
}
