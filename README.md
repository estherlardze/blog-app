# Blog Application

## Overview

This Blog Application is a web application that allows users to perform CRUD operations (Create, Read, Update, Delete) on blog posts. Additionally, the  application supports advanced features like adding blogs to favorites, commenting on blogs, and listening to blog posts as audio.

## Table of Contents

1. [Features](#features)
2. [Installation](#installation)
3. [Usage](#usage)
4. [Technologies Used](#technologies-used)
5. [Future Enhancements](#future-enhancements)

## Features

- **CRUD Operations**: Create, read, update, and delete blog posts.

## Features To Come
- **Favorite Blogs**: Add blog posts to your list of favorites.
- **Comments**: Comment on blog posts to share your thoughts.
- **Audio Blogs**: Listen to blog posts as audio.

## Installation

To get started with the Blog Application, follow these steps:

1. **Clone the repository**:
    ```bash
    git clone https://github.com/estherlardze/blog-app.git
    cd blog-app
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Set up environment variables**:
    Create a `.env` file in the root directory and add the following environment variables:
    ```plaintext
    NEXT_PUBLIC_EMAIL_SERVICE_ID=your_service_id
    NEXT_PUBLIC_EMAIL_TEMPLATE_ID=your_template_id
    NEXT_PUBLIC_EMAIL_PUBLIC_KEY=your_public_key
    ```

4. **Run the application**:
    ```bash
    npm run dev
    ```



## Usage

Once the application is up and running, you can perform the following actions:

- **Create a Blog Post**: Navigate to the "Create Post" section, fill out the form, and submit.
- **Read Blog Posts**: Browse the list of blog posts on the homepage.
- **Update a Blog Post created by you**: Click on a post, then click "Edit" to modify the content.
- **Delete a Blog Post created by you**: Click on a post, then click "Delete" to remove it.


## Technologies Used

- **Frontend**: React
- **Backend**: Firebase, Express.js
- **Styling**: Tailwind CSS

## Future Enhancements

- **Favorite a Blog Post**: Click the "Favorite" button on a blog post to add it to your favorites.
- **Comment on a Blog Post**: Navigate to a blog post and add a comment in the comment section.
- **Listen to a Blog Post**: Click the "Listen" button to hear the blog post as an audio recording.

