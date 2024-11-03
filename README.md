# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level parserOptions property like this:

js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json", "./tsconfig.node.json"],
    tsconfigRootDir: __dirname,
  },
};


- Replace plugin:@typescript-eslint/recommended to plugin:@typescript-eslint/recommended-type-checked or plugin:@typescript-eslint/strict-type-checked
- Optionally add plugin:@typescript-eslint/stylistic-type-checked
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add plugin:react/recommended & `plugin:react/
jsx-runtime` to the extends list

-----------------------------------------------------------------------------------------------------------------------------------------
Card Project

Overview
This project is a card application that allows users to create accounts, manage cards, and access an admin section for user management. Users can search for cards, view details, and edit their profiles, while admins have special permissions to manage user authorizations.

Features
User Registration and Authentication: Users can create an account to access the application.
Card Management:
Create new cards.
Like and unlike cards.
View card details by clicking on the card image.
Profile Management: Users can edit their profile details.
Admin Section (CRM):
Accessible only by admins.
Edit user authorization levels (Business or Personal).
Delete users.
Search for users in the CRM.

Usage
Account Creation: Sign up for an account to start creating and managing cards.
Creating Cards: Use the provided interface to create new cards. You can like or unlike cards as needed.
Viewing Details: Click on a card image to view detailed information about that card.
Profile Editing: Navigate to your profile to update your details.
Admin Access: Admin users can log in to access the CRM section for user management.

Installation
To set up this project locally, follow these steps:

Clone the repository:

bash
Copy code
git clone <https://github.com/Dor212/React-Project>
cd react-project
Install dependencies:
npm install
Start the development server: npm run dev

Technologies Used
React
TypeScript
Flowbite
Axios (for API requests)
Redux (for state management)
SweetAlert2 (for notifications