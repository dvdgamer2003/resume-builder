document.addEventListener('DOMContentLoaded', function() {
    const articles = [
        {
            title: "How to Build a Standout Resume",
            category: "resume-building",
            date: "2024-11-15",
            popularity: 150,
            content: "Building a standout resume is crucial in today's competitive job market. This article provides tips and templates to help you create a resume that stands out.",
            image: "../Images/icon.jpeg"
        },
        {
            title: "Top Job Hunting Tips for Beginners",
            category: "job-hunting",
            date: "2024-11-10",
            popularity: 200,
            content: "Job hunting can be daunting, especially for beginners. This article offers practical tips to help you find your dream job.",
            image: "../Images/icon1.jpeg"
        },
        {
            title: "Career Growth Strategies for Professionals",
            category: "career-growth",
            date: "2024-11-05",
            popularity: 180,
            content: "Career growth is essential for long-term success. This article explores strategies to advance your career and achieve your professional goals.",
            image: "../Images/icon.jpeg"
        }
    ];

    const blogFeed = document.getElementById('blogFeed');

    function displayArticles(filteredArticles) {
        blogFeed.innerHTML = '';
        filteredArticles.forEach(article => {
            const articleElement = document.createElement('div');
            articleElement.className = 'article';
            articleElement.innerHTML = `
                <img src="${article.image}" alt="${article.title}">
                <h2>${article.title}</h2>
                <p>${article.content}</p>
                <div class="meta">
                    <span>Category: ${article.category}</span>
                    <span>Date: ${article.date}</span>
                    <span>Popularity: ${article.popularity}</span>
                </div>
                <button onclick="readMore('${article.title}')">Read More</button>
            `;
            blogFeed.appendChild(articleElement);
        });
    }

    function filterArticles() {
        const searchValue = document.getElementById('search').value.toLowerCase();
        const categoryValue = document.getElementById('category').value;
        const sortValue = document.getElementById('sort').value;

        let filteredArticles = articles.filter(article => {
            return article.title.toLowerCase().includes(searchValue) &&
                   (categoryValue === '' || article.category === categoryValue);
        });

        if (sortValue === 'date') {
            filteredArticles.sort((a, b) => new Date(b.date) - new Date(a.date));
        } else if (sortValue === 'popularity') {
            filteredArticles.sort((a, b) => b.popularity - a.popularity);
        }

        displayArticles(filteredArticles);
    }

    function readMore(title) {
        const article = articles.find(article => article.title === title);
        alert(`Reading more about: ${article.title}\n\n${article.content}`);
    }

    displayArticles(articles);
});
