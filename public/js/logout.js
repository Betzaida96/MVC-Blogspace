document.addEventListener('DOMContentLoaded', () => {
    const logoutButton = document.querySelector('#logoutButton');
    
    // check if the logout button exists before adding the event listener
    if (logoutButton) {
        logoutButton.addEventListener('click', logout);
    }
});

// Handler for logout butotn click
const logout = async () => {
    const response = await fetch('/api/users/logout', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
    });
    
    if (response.ok) {
        document.location.replace('/');
    } else {
        alert(response.statusText);
    }
};
