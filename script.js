// Toggle password visibility
document.querySelector('.toggle-password').addEventListener('click', function() {
    const passwordInput = document.getElementById('password');
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        this.classList.remove('fa-eye');
        this.classList.add('fa-eye-slash');
    } else {
        passwordInput.type = 'password';
        this.classList.remove('fa-eye-slash');
        this.classList.add('fa-eye');
    }
});

// Handle form submission
document.getElementById('credentialsForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const website = document.getElementById('website').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const credentialCard = document.createElement('div');
    credentialCard.className = 'credential-card fade-in';
    credentialCard.innerHTML = `
        <div class="credential-info">
            <h3>${website}</h3>
            <p>Username: ${username}</p>
            <p class="password-display">
                Password: 
                <span class="masked-password">${'•'.repeat(password.length)}</span>
                <span class="actual-password" style="display: none;">${password}</span>
                <i class="fas fa-eye toggle-saved-password" style="cursor: pointer; margin-left: 4px;"></i>
            </p>
        </div>
        <div class="actions">
            <button onclick="copyPassword('${password}')" title="Copy Password">
                <i class="fas fa-copy"></i> Copy
            </button>
            <button onclick="deleteCredential(this)" title="Delete" style="background-color: #ef4444;">
                <i class="fas fa-trash"></i> Delete
            </button>
        </div>
    `;

    document.getElementById('credentialsList').appendChild(credentialCard);
    this.reset();
    showNotification('Credentials saved successfully!');
});

// Copy password to clipboard
function copyPassword(password) {
    navigator.clipboard.writeText(password).then(() => {
        showNotification('Password copied to clipboard!');
    });
}

// Delete credential card
function deleteCredential(button) {
    const card = button.closest('.credential-card');
    card.remove();
    showNotification('Credentials deleted successfully!');
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Toggle saved password visibility
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('toggle-saved-password')) {
        const passwordDisplay = e.target.closest('.password-display');
        const maskedPassword = passwordDisplay.querySelector('.masked-password');
        const actualPassword = passwordDisplay.querySelector('.actual-password');
        
        if (maskedPassword.style.display !== 'none') {
            maskedPassword.style.display = 'none';
            actualPassword.style.display = 'inline';
            e.target.classList.remove('fa-eye');
            e.target.classList.add('fa-eye-slash');
        } else {
            maskedPassword.style.display = 'inline';
            actualPassword.style.display = 'none';
            e.target.classList.remove('fa-eye-slash');
            e.target.classList.add('fa-eye');
        }
    }
}); 