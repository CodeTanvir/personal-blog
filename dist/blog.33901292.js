document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('nav a');
    const logoutBtn = document.querySelector('nav button');
    const sections = document.querySelectorAll('main article, main section, aside, footer');
    const backToTopBtn = document.createElement('button');
    backToTopBtn.id = 'backToTop';
    backToTopBtn.textContent = 'Back to Top';
    backToTopBtn.style.cssText = `
        display: none;
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: #1f3c88;
        color: white;
        border: none;
        padding: 10px 15px;
        border-radius: 5px;
        cursor: pointer;
        z-index: 1000;
    `;
    document.body.appendChild(backToTopBtn);
    showWelcomeMessage();
    navLinks.forEach((link)=>{
        link.addEventListener('mouseover', function() {
            this.style.color = '#f4d160';
            this.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
        });
        link.addEventListener('mouseout', function() {
            this.style.color = '';
            this.style.backgroundColor = '';
        });
    });
    function updateActiveNav() {
        const scrollY = window.scrollY;
        const sectionMap = {
            '#Home': document.getElementById('Home'),
            '#About': document.getElementById('About'),
            '#Post': document.getElementById('Post'),
            '#Contact': document.getElementById('Contact')
        };
        for (const [hash, section] of Object.entries(sectionMap))if (section) {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach((link)=>{
                    link.classList.remove('active');
                    if (link.getAttribute('href') === hash) link.classList.add('active');
                });
                break;
            }
        }
    }
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) backToTopBtn.style.display = 'block';
        else backToTopBtn.style.display = 'none';
        updateActiveNav();
    });
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    navLinks.forEach((link)=>{
        link.addEventListener('click', function(e) {
            showLoadingMessage();
            setTimeout(()=>{
                hideLoadingMessage();
            }, 500);
        });
    });
    logoutBtn.addEventListener('click', function(e) {
        const confirmed = confirm('Are you sure you want to logout?');
        if (!confirmed) e.preventDefault();
    });
    updateActiveNav();
});
function showWelcomeMessage() {
    const welcomeDiv = document.createElement('div');
    welcomeDiv.id = 'welcome-message';
    welcomeDiv.textContent = 'Welcome to my Personal Blog!';
    welcomeDiv.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: #1f3c88;
        color: white;
        padding: 20px;
        border-radius: 5px;
        z-index: 1001;
        font-size: 18px;
    `;
    document.body.appendChild(welcomeDiv);
    setTimeout(()=>{
        welcomeDiv.remove();
    }, 5000);
}
function showLoadingMessage() {
    const loadingDiv = document.createElement('div');
    loadingDiv.id = 'loading-message';
    loadingDiv.textContent = 'Loading...';
    loadingDiv.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 20px;
        border-radius: 5px;
        z-index: 1002;
        font-size: 18px;
    `;
    document.body.appendChild(loadingDiv);
}
function hideLoadingMessage() {
    const loadingDiv = document.getElementById('loading-message');
    if (loadingDiv) loadingDiv.remove();
}
// Asynchronous data handling
async function loadPosts() {
    const main = document.querySelector('main');
    const postsSection = document.getElementById('Post');
    if (!postsSection) return;
    // Show loading
    showLoadingSpinner(postsSection);
    try {
        // Bad async for Experiment 7 - unnecessary delay
        await new Promise((resolve)=>setTimeout(resolve, 2000));
        // Static data
        const posts = [
            {
                "id": 1,
                "title": "Introduction to JavaScript",
                "content": "JavaScript is a versatile programming language used for web development. It allows you to add interactivity to websites.",
                "author": "John Doe",
                "date": "2023-10-01",
                "category": "Programming"
            },
            {
                "id": 2,
                "title": "CSS Grid Layout",
                "content": "CSS Grid is a powerful layout system that allows you to create complex web layouts with ease.",
                "author": "Jane Smith",
                "date": "2023-10-05",
                "category": "Web Design"
            },
            {
                "id": 3,
                "title": "React Best Practices",
                "content": "Learn the best practices for building React applications, including component structure and state management.",
                "author": "Bob Johnson",
                "date": "2023-10-10",
                "category": "React"
            }
        ];
        // Clear existing posts
        postsSection.innerHTML = '<h2>Recent Posts</h2>';
        posts.forEach((post)=>{
            const article = document.createElement('article');
            article.innerHTML = `
                <h3>${post.title}</h3>
                <p>${post.content}</p>
                <p><strong>Author:</strong> ${post.author} | <strong>Date:</strong> ${post.date} | <strong>Category:</strong> ${post.category}</p>
                <button class="view-comments" data-post-id="${post.id}">View Comments</button>
                <div class="comments" id="comments-${post.id}" style="display: none;">
                    <h4>Comments</h4>
                    <div class="comments-list"></div>
                    <form class="comment-form">
                        <input type="text" placeholder="Your name" required>
                        <textarea placeholder="Your comment" required></textarea>
                        <button type="submit">Submit Comment</button>
                    </form>
                </div>
            `;
            postsSection.appendChild(article);
        });
        // Add event listeners for comments
        document.querySelectorAll('.view-comments').forEach((btn)=>{
            btn.addEventListener('click', (e)=>{
                const postId = e.target.dataset.postId;
                loadComments(postId);
            });
        });
        document.querySelectorAll('.comment-form').forEach((form)=>{
            form.addEventListener('submit', handleCommentSubmit);
        });
    } catch (error) {
        showError(postsSection, 'Failed to load posts. <button id="retry-posts">Retry</button>');
        document.getElementById('retry-posts').addEventListener('click', loadPosts);
    } finally{
        hideLoadingSpinner(postsSection);
    }
}
async function loadComments(postId) {
    const commentsDiv = document.getElementById(`comments-${postId}`);
    const commentsList = commentsDiv.querySelector('.comments-list');
    commentsDiv.style.display = 'block';
    showLoadingSpinner(commentsList);
    try {
        // Bad async for Experiment 7 - unnecessary delay
        await new Promise((resolve)=>setTimeout(resolve, 1000));
        // Static data
        const allComments = [
            {
                "id": 1,
                "postId": 1,
                "author": "Alice",
                "content": "Great introduction! Looking forward to more posts.",
                "date": "2023-10-02"
            },
            {
                "id": 2,
                "postId": 1,
                "author": "Charlie",
                "content": "JavaScript is indeed versatile. Thanks for sharing!",
                "date": "2023-10-03"
            },
            {
                "id": 3,
                "postId": 2,
                "author": "Diana",
                "content": "CSS Grid makes layout so much easier.",
                "date": "2023-10-06"
            }
        ];
        const comments = allComments.filter((c)=>c.postId == postId);
        commentsList.innerHTML = '';
        comments.forEach((comment)=>{
            const commentEl = document.createElement('div');
            commentEl.className = 'comment';
            commentEl.innerHTML = `<strong>${comment.author}:</strong> ${comment.content} <em>(${comment.date})</em>`;
            commentsList.appendChild(commentEl);
        });
    } catch (error) {
        commentsList.innerHTML = 'Failed to load comments.';
    } finally{
        hideLoadingSpinner(commentsList);
    }
}
async function handleCommentSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const postId = form.closest('article').querySelector('.view-comments').dataset.postId;
    const [nameInput, contentInput] = form.elements;
    const newComment = {
        id: Date.now(),
        postId: parseInt(postId),
        author: nameInput.value,
        content: contentInput.value,
        date: new Date().toISOString().split('T')[0]
    };
    // Optimistic update
    const commentsList = form.previousElementSibling;
    const commentEl = document.createElement('div');
    commentEl.className = 'comment';
    commentEl.innerHTML = `<strong>${newComment.author}:</strong> ${newComment.content} <em>(Pending...)</em>`;
    commentsList.appendChild(commentEl);
    form.reset();
    try {
        // Simulate POST
        await new Promise((resolve)=>setTimeout(resolve, 1000)); // Fake delay
        // In real, fetch('/api/comments', { method: 'POST', body: JSON.stringify(newComment) })
        commentEl.innerHTML = `<strong>${newComment.author}:</strong> ${newComment.content} <em>(${newComment.date})</em>`;
    } catch (error) {
        commentEl.remove();
        alert('Failed to submit comment. Please try again.');
    }
}
async function loadUserProfile() {
    try {
        // Bad async for Experiment 7 - unnecessary delay
        await new Promise((resolve)=>setTimeout(resolve, 500));
        // Static data
        const user = {
            "username": "johndoe",
            "name": "John Doe",
            "avatar": "https://via.placeholder.com/50",
            "bio": "A passionate web developer with 5 years of experience."
        };
        const nav = document.querySelector('nav');
        const profileDiv = document.createElement('div');
        profileDiv.className = 'user-profile';
        profileDiv.innerHTML = `
            <img src="${user.avatar}" alt="Avatar" style="width: 30px; height: 30px; border-radius: 50%;">
            <span>${user.name}</span>
        `;
        nav.appendChild(profileDiv);
    } catch (error) {
        console.error('Failed to load user profile');
    }
}
function showLoadingSpinner(container) {
    const spinner = document.createElement('div');
    spinner.className = 'loading-spinner';
    spinner.textContent = 'Loading...';
    container.appendChild(spinner);
}
function hideLoadingSpinner(container) {
    const spinner = container.querySelector('.loading-spinner');
    if (spinner) spinner.remove();
}
function showError(container, message) {
    container.innerHTML = `<p class="error">${message}</p>`;
}
// Font size controls
function initFontControls() {
    const smallBtn = document.getElementById('font-small');
    const mediumBtn = document.getElementById('font-medium');
    const largeBtn = document.getElementById('font-large');
    if (!smallBtn || !mediumBtn || !largeBtn) return;
    smallBtn.addEventListener('click', ()=>setFontSize('small'));
    mediumBtn.addEventListener('click', ()=>setFontSize('medium'));
    largeBtn.addEventListener('click', ()=>setFontSize('large'));
    // Load saved font size
    const savedSize = localStorage.getItem('fontSize') || 'medium';
    setFontSize(savedSize);
}
function setFontSize(size) {
    document.body.classList.remove('font-small', 'font-medium', 'font-large');
    document.body.classList.add(`font-${size}`);
    localStorage.setItem('fontSize', size);
}
// Initialize
window.addEventListener('load', ()=>{
    initFontControls();
    loadPosts();
    loadUserProfile();
});
// Refresh data
document.getElementById('refresh-data').addEventListener('click', loadPosts);
// Load theme script
function loadScript(src) {
    const script = document.createElement('script');
    script.src = src;
    document.head.appendChild(script);
}
loadScript('../js/theme.js');

//# sourceMappingURL=blog.33901292.js.map
