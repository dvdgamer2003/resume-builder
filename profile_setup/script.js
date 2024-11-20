document.addEventListener('DOMContentLoaded', function() {
    const steps = document.querySelectorAll('.step');
    const progress = document.getElementById('progress');
    let currentStep = 0;

    function showStep(stepIndex) {
        steps.forEach((step, index) => {
            step.style.display = index === stepIndex ? 'block' : 'none';
        });
        updateProgressBar();
    }

    function updateProgressBar() {
        const stepWidth = 100 / (steps.length - 1);
        progress.style.width = `${stepWidth * currentStep}%`;
    }

    function nextStep() {
        if (currentStep < steps.length - 1) {
            currentStep++;
            showStep(currentStep);
        }
    }

    function prevStep() {
        if (currentStep > 0) {
            currentStep--;
            showStep(currentStep);
        }
    }

    document.getElementById('contactForm').addEventListener('submit', function(event) {
        event.preventDefault();
        nextStep();
    });

    document.getElementById('skillsForm').addEventListener('submit', function(event) {
        event.preventDefault();
        nextStep();
    });

    document.getElementById('jobExperienceForm').addEventListener('submit', function(event) {
        event.preventDefault();
        nextStep();
    });

    document.getElementById('educationForm').addEventListener('submit', function(event) {
        event.preventDefault();
        alert('Profile setup complete!');
    });

    showStep(currentStep);
});
