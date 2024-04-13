# GitHub User Search

This Angular application allows users to search for GitHub users by username and view their basic information along with their repositories.

## Features

- Search GitHub users by username.
- View user's basic information such as avatar, username, followers, following count, public repositories, and profile URL.
- View user's repositories with their names, descriptions, languages, and links to GitHub.
- Pagination support for repositories listing.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Nitish0777/fyle-internship-challenge-23.git

2. Install Dependencies:

   ```bash
   npm install

3. Start Developement App:

   ```bash
   npm start

## Usage
- Enter a GitHub username in the search input field.
- Click the "Search" button.
- Wait for the user's information and repositories to load.
- View the user's information and repositories.
- Navigate through the repositories using the pagination buttons if applicable.

# Technologies Used

This project utilizes the following technologies:

- **Angular**: A JavaScript framework for building web applications.
- **TypeScript**: A superset of JavaScript that adds static typing and other features to the language.
- **HTML**: Hypertext Markup Language, the standard markup language for creating web pages.
- **SCSS**: A preprocessor scripting language that is interpreted or compiled into Cascading Style Sheets (CSS).
- **GitHub REST API**: Allows fetching data from GitHub such as user information and repositories.


## Test Cases

### AppComponent
- **should create the app**: Checks if the AppComponent is created successfully.
- **should render title in a h1 tag**: Ensures that the title of the app is rendered within a h1 tag.
  - **Status**: FAILED
  - **Reason for failure**: The expected text "fyle-frontend-challenge app is running!" was not found.

### ApiService
- **should be created**: Checks if the ApiService is created successfully.

## How to Run Tests
To run the unit tests for the Angular application, follow these steps:

1. Navigate to the root directory of the Angular project in your terminal.
2. Run the command `ng test` to execute all unit tests.
3. Review the test results in the terminal to identify any failures or errors.

## Fixing Failed Test Cases
If any test cases fail, follow these steps to fix them:

1. Identify the reason for the test failure by reviewing the error messages.
2. Make necessary changes to the component, service, or test case code to address the issues.
3. Rerun the unit tests using `ng test` to ensure that the failures have been resolved.
