import os
import json
import re
from bs4 import BeautifulSoup

def extract_post_info(html_content):
    soup = BeautifulSoup(html_content, 'html.parser')
    
    # Extract date
    date_div = soup.find('div', class_='post-date')
    date = date_div.text if date_div else ''
    
    # Extract title
    title_h1 = soup.find('h1', class_='post-title')
    title = title_h1.text if title_h1 else ''
    
    # Extract excerpt (first paragraph of content)
    content_div = soup.find('div', class_='post-content-full')
    excerpt = ''
    if content_div and content_div.find('p'):
        excerpt = content_div.find('p').text
    
    # Extract tags
    tags = []
    tags_div = soup.find('div', class_='post-tags')
    if tags_div:
        tags = [tag.text for tag in tags_div.find_all('span', class_='tag')]
    
    return {
        'date': date,
        'title': title,
        'excerpt': excerpt,
        'tags': tags
    }

def generate_posts_metadata():
    # Use absolute path
    script_dir = os.path.dirname(os.path.abspath(__file__))
    posts_dir = os.path.join(script_dir, 'posts')
    posts_data = []
    
    print(f"Looking for posts in: {posts_dir}")
    
    # Ensure posts directory exists
    if not os.path.exists(posts_dir):
        print(f"Creating posts directory: {posts_dir}")
        os.makedirs(posts_dir)
        return []
    
    # Process each HTML file in the posts directory
    for filename in os.listdir(posts_dir):
        if filename.endswith('.html'):
            file_path = os.path.join(posts_dir, filename)
            print(f"Processing file: {filename}")
            
            try:
                with open(file_path, 'r', encoding='utf-8') as file:
                    content = file.read()
                    
                post_info = extract_post_info(content)
                post_data = {
                    'filename': filename,
                    'date': post_info['date'],
                    'title': post_info['title'],
                    'excerpt': post_info['excerpt'],
                    'tags': post_info['tags']
                }
                posts_data.append(post_data)
                print(f"Successfully processed: {filename}")
                print(f"Title: {post_info['title']}")
                print(f"Date: {post_info['date']}")
                print("---")
            except Exception as e:
                print(f"Error processing {filename}: {str(e)}")
    
    # Sort posts by date (newest first)
    posts_data.sort(key=lambda x: x['date'], reverse=True)
    
    # Write to JSON file
    output_path = os.path.join(script_dir, 'posts-metadata.json')
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(posts_data, f, ensure_ascii=False, indent=2)
    
    print(f"\nGenerated metadata for {len(posts_data)} posts")
    print(f"Metadata saved to: {output_path}")
    return posts_data

if __name__ == '__main__':
    generate_posts_metadata()
