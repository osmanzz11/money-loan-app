document.addEventListener('DOMContentLoaded', () => {
    const appDiv = document.getElementById('app');
    const apiUrl = 'http://localhost:3000';

    function renderLoginForm() {
        appDiv.innerHTML = `
            <h2>Login</h2>
            <form id="loginForm">
                <label for="username">Username:</label>
                <input type="text" id="username" name="username" required>
                <br>
                <label for="password">Password:</label>
                <input type="password" id="password" name="password" required>
                <br>
                <button type="button" onclick="login()">Login</button>
                <br>
                <p>Don't have an account? <a href="#" onclick="navigateTo('register')">Register</a></p>
            </form>
        `;
    }

    function renderRegisterForm() {
        appDiv.innerHTML = `
            <h2>Register</h2>
            <form id="registerForm">
                <label for="newUsername">Username:</label>
                <input type="text" id="newUsername" name="newUsername" required>
                <br>
                <label for="newPassword">Password:</label>
                <input type="password" id="newPassword" name="newPassword" required>
                <br>
                <button type="button" onclick="register()">Register</button>
                <br>
                <p>Already have an account? <a href="#" onclick="navigateTo('login')">Login</a></p>
            </form>
        `;
    }

    function renderLoanOptions(options) {
        appDiv.innerHTML = `
            <h2>Choose a Lender</h2>
            <ul>
                ${options.map(option => `<li>${option.name} - Amount: $${option.amount} | Interest Rate: ${option.interestRate}% | <a href="#" onclick="selectLender(${option.id})">Select</a></li>`).join('')}
            </ul>
        `;
    }

    function renderProfile(user) {
        appDiv.innerHTML = `
            <h2>User Profile</h2>
            <p>Welcome, ${user.username}!</p>
            <p><a href="#" onclick="navigateTo('loan-options')">Back to Loan Options</a></p>
        `;
    }

    function navigateTo(route) {
        history.pushState({}, route, `/${route}`);
        renderPage(route);
    }

    function renderPage(route) {
        switch (route) {
            case 'login':
                renderLoginForm();
                break;
            case 'register':
                renderRegisterForm();
                break;
            case 'loan-options':
                fetchLoanOptions();
                break;
            case 'profile':
                fetchUserProfile();
                break;
            default:
                renderLoginForm();
                break;
        }
    }

    // Update this function in the file
function fetchLoanOptions() {
    fetch(apiUrl+'/loan-options')
    .then(response => response.json())
    .then(data => displayLoanOptions(data))
    .catch(error => console.error('Error:', error));
}


    function fetchUserProfile() {
        const userId = localStorage.getItem('userId');
        if (!userId) {
            navigateTo('login');
            return;
        }

        fetch(`${apiUrl}/profile/${userId}`)
            .then(response => response.json())
            .then(data => {
                const user = data.user || {};
                renderProfile(user);
            });
    }

    window.login = function () {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        fetch(`${apiUrl}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                localStorage.setItem('userId', data.user.id);
                navigateTo('loan-options');
            } else {
                alert(data.message || 'Login failed');
            }
        });
    };

    window.register = function () {
        const newUsername = document.getElementById('newUsername').value;
        const newPassword = document.getElementById('newPassword').value;

        fetch(`${apiUrl}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: newUsername, password: newPassword }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                localStorage.setItem('userId', data.user.id);
                navigateTo('loan-options');
            } else {
                alert('Registration failed');
            }
        });
    };

    window.selectLender = function (lenderId) {
        localStorage.setItem('lenderId', lenderId);
        navigateTo('profile');
    };

    renderPage('login');
});
// Add these functions at the end of the file
function registerUser() {
    const username = prompt('Enter your username:');
    const password = prompt('Enter your password:');
    const apiUrl = 'http://localhost:3000';
    fetch(apiUrl+'/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    })
    .then(response => response.json())
    .then(data => alert(data.message))
    .catch(error => console.error('Error:', error));
}

function loginUser() {
    const username = prompt('Enter your username:');
    const password = prompt('Enter your password:');

    fetch(apiUrl+'/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    })
    .then(response => response.json())
    .then(data => alert(data.message))
    .catch(error => console.error('Error:', error));
}
