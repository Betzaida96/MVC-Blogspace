document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.delete-post').forEach(button => {
        button.addEventListener('click', async (event) => {
            event.preventDefault();
            const postId = event.target.dataset.id;

            if (confirm('Are you sure you want to delete this post?')) {
                const response = await fetch(`/api/posts/${postId}`, {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                });

                if (response.ok) {
                    document.location.reload();
                } else {
                    alert(response.statusText);
                }
            }
        });
    });
});
