# DJBeat

Full-stack music discovery app: browse tracks, open a detail page with playback and metadata, and discuss songs in comments. Authenticated users can upload songs and manage their own content.

## Navigation

- [Overview](#overview)
- [Features](#features)
- [Tech stack](#tech-stack)
- [Acknowledgments](#acknowledgments)

## Overview

DJBeat is a single-page application. The **React + TypeScript** client uses **Redux** for session and data fetching, **React Router** for views, and **Vite** for development and production builds. The **Express + TypeScript** API uses **Sequelize** with **PostgreSQL** in production and **SQLite** for local development, **cookie-based sessions**, **bcrypt** for passwords, and **CSRF** protection on mutating requests.

**Live:** [_add your deployed URL_](https://djbeat.onrender.com/)  


### Tech stack

[![Typing SVG](https://readme-typing-svg.demolab.com?font=Fira+Code&pause=500&color=007acc&width=435&lines=TypeScript;Express;Sequelize;React;Redux;Vite;PostgreSQL;SQLite;Docker;HTML5;CSS3)](https://git.io/typing-svg)

| Layer | Technologies |
|--------|----------------|
| Frontend | React, TypeScript, Redux, React Router, Vite |
| Backend | Node.js, Express, TypeScript |
| Data | PostgreSQL (production), SQLite (local), Sequelize ORM |
| Security | Session cookies, bcrypt password hashing, CSRF (csurf) |
| DevOps | Docker (multi-stage builds where configured) |

The backend includes **AWS SDK** helpers for **S3** (`awsS3.ts`) for optional file uploads; new songs in the current API accept **URLs** for preview image and audio file.

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Redux](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Mocha](https://img.shields.io/badge/mocha.js-323330?style=for-the-badge&logo=mocha&logoColor=Brown)
![Sequelize](https://img.shields.io/badge/sequelize-323330?style=for-the-badge&logo=sequelize&logoColor=blue)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-00000F?style=for-the-badge&logo=sqlite&logoColor=white)
![Amazon AWS](https://img.shields.io/badge/Amazon_AWS-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white)

## Features

What each part means in the product:

### Browse songs

- **Home (`/`)** loads all songs from the API and shows them as clickable cards.
- Clicking a card goes to that track’s detail page.

### Song detail and playback

- **`/songs/:songId`** fetches one song (title, description, cover image, audio URL, uploader).
- The UI is built for listening on the detail view using the stored audio URL (`filepath`).

### Authentication

- **Sign up** and **log in** create a server session; the app **restores the user** on load (`/api/restore-user`) so refreshes stay logged in.
- **Log out** clears the session from the client’s perspective via the profile menu.
- Passwords are hashed on the server; state-changing API calls use **CSRF** tokens (client fetches a token before the router mounts).

### Upload songs (logged-in users)

- **`/songs/new`** is the “Upload” flow: submit metadata plus **valid URLs** for preview image and song file (validated on the API).
- Creates a `Song` tied to the current user as owner.

### Edit and delete your songs

- On a song you own, **Edit** and **Delete** open modals (update fields or remove the track).
- The API enforces **owner-only** updates and deletes (`403` if you are not the owner).

### Comments

- Each song’s page loads **comments for that song** (newest first), with usernames.
- **Logged-in users** can post **one comment per song** (UI prevents a second post; API validates length 1–1000 characters).
- Authors can **edit** or **delete** only **their** comments; others get `403`.

### API behavior (why it feels consistent)

- **express-validator** checks bodies on create/update for songs and comments.
- **Shared auth middleware** (`requireAuth`, `restoreUser`) keeps route handlers focused on business logic.
