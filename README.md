# 🌐 Breakcore Personal Website

A cyberpunk-themed personal website with a dynamic blog system, featuring glitch aesthetics, neon colors, and Japanese typography. This project was developed with the assistance of Codeium AI to create a unique digital space that reflects the chaotic and experimental nature of breakcore music.

## 🎨 Design Philosophy

The website's design is inspired by:
- Breakcore music's chaotic aesthetics
- Cyberpunk visual elements
- Glitch art and digital corruption
- Neon color schemes
- Japanese typography and culture
- Retro-futuristic interfaces

## 🔧 Features

### Dynamic Blog System ("Memory Fragments")
- Automated blog post management
- Dynamic navigation between posts
- Chronological archive view
- Tag-based categorization
- Automatic metadata generation
- Latest posts display on the homepage

### Technical Implementation
- Pure JavaScript for dynamic content loading
- Python script for metadata generation
- No external frameworks - just pure HTML, CSS, and JavaScript
- Responsive design for all devices

## 🚀 Getting Started

### Prerequisites
- Python 3.x (for blog metadata generation)
- A modern web browser
- Basic understanding of HTML/CSS/JavaScript

### Installation
1. Clone this repository:
```bash
git clone https://github.com/yourusername/personal-website.git
cd personal-website
```

2. Install Python dependencies:
```bash
pip install beautifulsoup4
```

### Running the Website
1. Start a local server (using Python):
```bash
python -m http.server 8000
```

2. Open your browser and navigate to:
```
http://localhost:8000
```

### Managing Blog Posts
1. Create new blog posts in the `posts/` directory using HTML
2. Include required metadata in each post:
   - Title (in h1 tag with class "post-title")
   - Date (in div with class "post-date")
   - Tags (in spans with class "tag")
   - Content (in div with class "post-content-full")
3. Run the metadata generator:
```bash
python generate_posts_metadata.py
```

## 📁 Project Structure
```
personal-website/
├── index.html              # Homepage
├── blog.html              # Blog archive page
├── styles.css             # Global styles
├── js/
│   └── blog-navigation.js # Blog navigation logic
├── posts/                 # Blog post directory
│   ├── first-memory-fragment.html
│   ├── late-night-coding.html
│   └── ...
├── generate_posts_metadata.py  # Metadata generator
└── posts-metadata.json   # Generated blog metadata
```

## 🤖 AI Contribution
This project was developed with the assistance of Codeium AI through the Windsurf IDE. The AI helped with:
- Implementing the dynamic blog system
- Creating the glitch aesthetics
- Generating the metadata management system
- Structuring the project architecture
- Writing and organizing documentation

## 🎨 Customization
- Edit `styles.css` to modify the color scheme and aesthetics
- Adjust the blog post template in `posts/` directory
- Modify the JavaScript files to change content loading behavior
- Update the Python script for different metadata handling

## 🔮 Future Enhancements
- Search functionality for blog posts
- Tag-based filtering system
- More interactive glitch effects
- Audio player for breakcore music
- Enhanced mobile responsiveness

## 📝 License
This project is open source and available under the MIT License.

## 🙏 Acknowledgments
- Codeium AI for development assistance
- The breakcore music community for inspiration
- Cyberpunk aesthetic pioneers
- Open source community

---
*Created with 💜 and AI assistance*
