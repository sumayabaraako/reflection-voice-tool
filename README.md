# Reflection Voice Tool

## Overview

Reflection Voice Tool is a mobile-friendly web application that allows users to record spoken reflections and organize them into themes.

The idea behind this project came from the need to quickly capture thoughts, experiences, and insights while away from a desk. Instead of writing notes, users can record a voice memo, assign it to a theme, and revisit it later.

The application is designed to support personal growth, learning, work reflections, and other forms of self-reflection.

---

## Problem Statement

People often have valuable ideas, thoughts, or reflections when they are not in a position to write them down.

Examples include:

- During a walk
- While travelling
- Between meetings
- During study sessions
- After completing a project or task

Reflection Voice Tool provides a simple way to capture these moments using voice recordings and organize them into meaningful themes.

---

## Features

### Theme Management

Users can:

- Select an existing theme
- Create custom themes
- Save themes locally using the browser's Local Storage

### Voice Recording

Users can:

- Record reflections using their device microphone
- Preview recordings before saving
- Save recordings locally

### Reflection Constellation

Reflections are visualized inside a constellation view.

Each planet:

- Represents a theme
- Displays the number of saved memos
- Has its own color
- Appears when reflections have been recorded for that theme

### Memo Playback

Users can:

- Click on a planet
- View all memos linked to that theme
- Replay previously recorded reflections

---

## Technologies

This project was built using:

- HTML5
- CSS3
- JavaScript (Vanilla JavaScript)
- Local Storage API
- MediaRecorder API
- Git
- GitHub

---

## Development Process

This project was developed using an iterative approach and Git version control.

The application was built step by step using separate feature branches. Each feature was developed, tested, and merged into the main branch after completion.

The development process included the following milestones:

- Theme selection
- Local Storage integration
- Audio recording functionality
- Reflection constellation visualization
- Dynamic planet colors
- Memo playback functionality

During development, user feedback was collected and used to improve the application. One important piece of feedback was the ability to replay previously recorded reflections. Based on this feedback, a memo playback feature was added, allowing users to select a theme and listen to earlier recordings.

Git and GitHub were used throughout the project to manage versions, organize features, and maintain a structured workflow.

---

## Data Storage

This application uses the browser's Local Storage.

Important information:

- Themes are stored locally in the browser.
- Reflection data is stored locally in the browser.
- Audio recordings are not uploaded to a server.
- Audio recordings are not stored inside the GitHub repository.
- Other users cannot access recordings by cloning this repository.
- Clearing browser storage will remove saved reflections.

This approach was chosen to keep the project lightweight and privacy-friendly.

---

## Demo

A short demonstration of the application can be viewed here:

[▶ Watch Demo Video](https://vimeo.com/1203154550)

The demo showcases:

1. Creating a theme
2. Recording a reflection
3. Saving the reflection
4. Viewing the constellation
5. Replaying a saved memo

---


## Installation

Clone the repository:

```bash
git clone https://github.com/sumayabaraako/reflection-voice-tool.git
```

Navigate to the project folder:

```bash
cd reflection-voice-tool
```

Open:

```text
index.html
```

in your browser.

---

## Educational Use

This project was created as a learning project and may be used for educational purposes.

Feel free to:

- Study the source code
- Learn from the implementation
- Experiment with the functionality
- Extend the project with additional features

Possible extensions include:

- Reflection deletion
- Theme editing
- Search functionality
- User accounts
- Cloud storage
- Reflection statistics
- AI-assisted reflection summaries

The goal of this project is to demonstrate the use of JavaScript, Local Storage, Audio Recording APIs, Git workflows, and user-centered design principles.

---

## Learning Outcomes

During this project I learned:

- Working with the MediaRecorder API
- Storing data using Local Storage
- Managing project versions with Git and GitHub
- Creating interactive user interfaces with JavaScript
- Applying user feedback to improve a product
- Structuring a project using feature branches
- Building a complete MVP from idea to implementation

---

## Future Improvements

Potential future features include:

- Reflection deletion
- Theme editing
- Reflection filtering
- User authentication
- Synchronization across devices
- Advanced analytics and insights

---

## Author

Developed by Sumaya Baraako.

GitHub Profile: https://github.com/sumayabaraako

Created as a personal learning project focused on JavaScript, Audio Recording, Local Storage, Git workflows, and User-Centered Design.