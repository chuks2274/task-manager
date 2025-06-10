# Task Management project.

## AuthProvider.tsx
This file defines a React component that integrates Auth0 authentication into your app.
### What it Does:

Wrap your app with the Auth0Provider from the @auth0/auth0-react package.
Handle user login, logout, and session management.
Automatically redirect users to a specific page after login.
Use browser local storage to keep the login session.
Support silent token renewal with refresh tokens.

## ProtectedRoute.tsx
This file defines a React component that protects certain pages so only logged-in users can access them.
### What it Does:

Check if the user is logged in using Auth0.
Show a loading message while authentication status is being verified.
Display an error message if authentication fails.
Redirect users to the login page if they are not logged in.
Allow logged-in users to view the protected content.

## TaskContext.ts
This file creates a React context to manage tasks in the app.
### What it Does:

Define a shared context to hold task-related data and functions.
Make it easier to access and update tasks from any component in the app.

## TaskProvider.tsx
This file shares task data and actions with other parts of the app using React Context.
### What it Does:

Manage tasks globally using context and React state.
Save and load tasks to/from local storage using the logged-in user's email.
Handle and display errors using Bootstrap toast messages.

## useTaskContext.ts
This file defines a custom React hook to access the task context.
### What it Does:

Simplify the process of using task-related data and functions inside components.
Ensure the hook is used within the proper context provider.

## CreateTask.tsx
This file defines a React component that lets users create a new task using a form.
### What it Does:

Provide a form UI for creating tasks.
Validate form inputs (title and description).
Prevent duplicate task entries.
Save the new task using context and navigate back to the dashboard.

## Dashboard.tsx
This file defines the dashboard page of the Task Manager app.
### What it Does:

Shows a list of all tasks from the context.
Allows users to log in or log out using Auth0.
Supports filtering tasks by status (pending, in progress, completed).
Users can view, update, or delete tasks.
Includes pagination to browse tasks page by page.
Uses React Bootstrap for layout and styling.

## EditTask.tsx
This file defines the component in a React TypeScript app. It allows users to edit an existing task by updating its title and description.
### What it Does:

Uses useParams to get the task ID from the URL.
Fetches the task from context using useTaskContext custom hook.
Displays the task's current values in a form for editing.
Validates that both title and description are filled.
Updates the task and navigates back to the dashboard after submission.
Shows a loading spinner during update and error messages if the task is not found or the update fails.
Uses Bootstrap components for styling and layout.

## LoginPage.tsx
This file provides a user interface for logging in using Auth0.
### What it Does:

Uses the useAuth0 hook to access Auth0's login function, loading state, and error messages.
Displays a centered full-screen login form styled with React Bootstrap.
Shows a loading spinner while the authentication process is ongoing.
Displays an error alert if login fails.
Redirects users to Auth0's login page when they click the "Log In" button.

## NotFoundPage.tsx
This file displays a custom 404 error message when a user visits a page that doesn't exist.
### What it Does:

Uses React Bootstrap to create a clean and responsive UI.
Displays a styled 404 error message and a button to guide users back to the dashboard.
Uses React Router’s useNavigate hook to programmatically redirect users.
Uses Auth0 to check whether the user is authenticated:
If authenticated, navigates to the dashboard.
If not authenticated, triggers the login process and redirects after login.

## TaskDetailsPage.tsx
This file displays the details of a specific task based on the task ID from the URL.
### What it Does:

Uses useParams to extract the task ID from the URL and useNavigate to programmatically redirect users.
Fetches task data using useTaskContext, a custom context hook.
Displays a user-friendly error message if the task is not found, or shows detailed task information if it exists.
Provides buttons to edit the task or return to the dashboard.
Uses React Bootstrap components like Container, Card, Row, Col, and Alert for clean and responsive UI.

## Task.ts
This file defines the Task interface, which outlines the structure and required properties for a task object in a TypeScript project.
### What it Does:
 
A unique identifier for the task.
The title or name of the task. 
A short explanation or details about the task. 
The current status of the task. It can only be one of three allowed string values.
The date and time the task was created, stored as an ISO format string.

## storage.ts
This file provides functions to save and load tasks safely from the browser's localStorage.
### What it Does:

Loads tasks stored under the given key from localStorage.
Saves an array of tasks to localStorage under the given key.
Returns an empty array if no tasks are found or if data is invalid.
Checks if the environment supports localStorage before accessing it.
Validates the loaded data to ensure it matches the expected Task structure.
Logs errors if saving fails.

## App.tsx
This file defines the main app component and handles routing between different pages.
### What it Does:

Uses React Router to define URL paths and their corresponding page components.
Uses Auth0 to handle user authentication and protect certain routes.
Displays a loading spinner while checking the user's login status.
Wraps the app with Auth0Provider and TaskProvider for authentication and global task state.
Uses React Bootstrap for layout and styling.

## index.CSS
This CSS file defines global styles and reusable classes for the React task management application.
### What it Does:

Removes default margin and padding, and uses border-box sizing for consistent layout.
Applies the 'Poppins' font for all elements for a modern look.
The .no-resize class prevents users from resizing input areas.
Styled thin scrollbars for WebKit (Chrome, Safari, Edge) and Firefox.
Uses transparent tracks and rounded, semi-transparent thumbs.
Adds subtle shadows, rounded corners, and hover animations to improve UI feel.
Applies full height to html, body, and #root so the layout stretches to the full viewport.

## main.tsx
This file is the starting point of the React task management application.
### What it Does:

It sets up and renders the entire React app into the HTML DOM.
It wraps the app with important providers for routing and authentication.
Enables routing with URLs for navigation between pages.
Handles user authentication using Auth0.
Global UI styles are imported for layout and design.

## Purpose
The purpose of this project is to build a Task Management Application using React, TypeScript, React Bootstrap, and Auth0 for authentication. It helps users create, edit, view, and manage their tasks in an organized way.

## How This Project Solves Real Problems
This Task Management App helps people stay organized and productive by allowing them to:

Track their tasks – Users can create, view, and update tasks so they never forget important things to do.
Manage their time – Each task has a status (pending, in-progress, or completed), helping users focus on what needs to be done.
Keep tasks secure – With Auth0 login, each user’s task data is protected and only accessible when logged in.
Reduce stress – By writing tasks down in one place, users avoid the mental load of remembering everything.
Access anywhere – The app is built to work in a web browser, so users can manage tasks from any device with internet access.

This project is a great solution for students, remote workers, or anyone who wants a simple and secure way to manage daily tasks.

## How to Use This Project
This Task Management App is easy to use. Follow the steps below:

Login to your account
Click the login button and sign in using your Auth0 credentials.

View your dashboard
After login, you’ll see your task list on the dashboard.

Create a new task
Click the “Create Task” button and fill in the task title, and description.

View task details
Click on any task to see its full details.

Edit a task
From the task details page, click the “Edit Task” button to update information.

Go back to the dashboard
Use the “Back to Dashboard” button to return to your task list.

Tasks are saved
Your tasks are saved in your browser using localStorage, so they stay even if you refresh the page.

Secure Access
Only logged-in users can create, view, or edit tasks to keep your data safe.

## Contributing
I welcome any feedback or contributions to this project.













