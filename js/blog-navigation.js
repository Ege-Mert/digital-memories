// Function to sort blog posts by date
function sortPosts(posts) {
    return posts.sort((a, b) => {
        const dateA = new Date(a.date.replace(/\./g, '-'));
        const dateB = new Date(b.date.replace(/\./g, '-'));
        return dateB - dateA;
    });
}

// Function to extract date from post content
function extractDate(content) {
    const dateMatch = content.match(/<div class="post-date">(\d{4}\.\d{2}\.\d{2})<\/div>/);
    return dateMatch ? dateMatch[1] : null;
}

// Function to extract title from post content
function extractTitle(content) {
    const titleMatch = content.match(/<h1 class="post-title">(.*?)<\/h1>/);
    return titleMatch ? titleMatch[1] : null;
}

// Function to get all blog posts
async function getAllPosts() {
    try {
        // Use the correct path based on current page location
        const metadataPath = window.location.pathname.includes('/posts/') ? 
            '../../posts-metadata.json' : 
            './posts-metadata.json';
        
        const response = await fetch(metadataPath);
        const posts = await response.json();
        return sortPosts(posts);
    } catch (error) {
        console.error('Error loading posts:', error);
        console.error('Current path:', window.location.pathname);
        return [];
    }
}

// Function to update navigation links
async function updateNavigation() {
    const posts = await getAllPosts();
    const currentPath = window.location.pathname;
    const currentFileName = currentPath.split('/').pop();
    
    const currentIndex = posts.findIndex(post => post.filename === currentFileName);
    
    if (currentIndex === -1) return;
    
    const prevPost = currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null;
    const nextPost = currentIndex > 0 ? posts[currentIndex - 1] : null;
    
    const navElement = document.querySelector('.post-navigation');
    if (navElement) {
        navElement.innerHTML = `
            <span class="nav-previous">
                ${prevPost ? `Previous: <a href="${prevPost.filename}">${prevPost.title}</a>` : 'Previous: None'}
            </span>
            <span class="nav-next">
                ${nextPost ? `Next: <a href="${nextPost.filename}">${nextPost.title}</a>` : 'Next: None'}
            </span>
        `;
    }
}

// Update archive page if we're on it
async function updateArchivePage() {
    if (window.location.pathname.endsWith('blog.html')) {
        console.log('Updating archive page...');
        const posts = await getAllPosts();
        console.log('Retrieved posts:', posts);
        const blogPostsContainer = document.querySelector('.blog-posts');
        
        if (blogPostsContainer) {
            console.log('Found blog posts container, updating content...');
            blogPostsContainer.innerHTML = posts.map(post => `
                <article class="blog-post">
                    <div class="post-date">${post.date}</div>
                    <h3 class="post-title">
                        <a href="posts/${post.filename}" class="post-link">${post.title}</a>
                    </h3>
                    <div class="post-content">
                        <p>${post.excerpt}</p>
                    </div>
                    <div class="post-tags">
                        ${post.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                </article>
            `).join('');
            console.log('Archive page updated successfully');
        } else {
            console.error('Blog posts container not found');
        }
    } else {
        console.log('Not on archive page, current path:', window.location.pathname);
    }
}

// Update latest posts on index page
async function updateLatestPosts() {
    if (window.location.pathname.endsWith('index.html')) {
        const posts = await getAllPosts();
        const latestPosts = posts.slice(0, 2);
        const blogPostsContainer = document.querySelector('.blog-posts');
        
        if (blogPostsContainer) {
            blogPostsContainer.innerHTML = latestPosts.map(post => `
                <article class="blog-post">
                    <div class="post-date">${post.date}</div>
                    <h3 class="post-title">
                        <a href="posts/${post.filename}" class="post-link">${post.title}</a>
                    </h3>
                    <div class="post-content">
                        <p>${post.excerpt}</p>
                    </div>
                    <div class="post-tags">
                        ${post.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                </article>
            `).join('') + `
                <div class="archive-link">
                    <a href="blog.html" class="memory-link">View All Memory Fragments →</a>
                </div>
            `;
        }
    }
}

// Initialize everything when the page loads
document.addEventListener('DOMContentLoaded', () => {
    updateNavigation();
    updateArchivePage();
    updateLatestPosts();
});
