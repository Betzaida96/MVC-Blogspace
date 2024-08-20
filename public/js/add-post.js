document.addEventListener('DOMContentLoaded', () => {
    const addPostBtn = document.getElementById('add-post-btn');
    const addPostModal = document.getElementById('add-post-modal');
    const addPostForm = document.getElementById('add-post-form');
  
    // Show the form when the button is clicked
    addPostBtn.addEventListener('click', () => {
      addPostModal.style.display = 'block';
    });
  
    // Handle form submission
    addPostForm.addEventListener('submit', async (event) => {
      event.preventDefault();
  
      const title = document.getElementById('post-title').value.trim();
      const content = document.getElementById('post-content').value.trim();
  
      if (title && content) {
        const response = await fetch('/dashboard/new', {  // Change '/api/posts' to '/dashboard/new'
          method: 'POST',
          body: JSON.stringify({ title, content }),
          headers: { 'Content-Type': 'application/json' },
        });
  
        if (response.ok) {
          document.location.replace('/dashboard'); // Redirect to dashboard
        } else {
          alert('Failed to add post');
        }
      } else {
        alert('Please fill out both fields');
      }
    });
  });

  