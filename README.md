# Rental App (Frontend)

This is the frontend for the car rental system, built using **Angular 19**. It connects to the backend API developed in .NET 8 and provides a clean and simple UI for users to browse available cars and manage reservations.

## Requirements

- [Node.js](https://nodejs.org/) version **22**
- [Angular CLI](https://angular.io/cli) version **19**

If you don’t have the Angular CLI installed, run:

```bash
npm install -g @angular/cli
```

## Getting Started

1. Clone the repository.
2. Install dependencies:

```bash
npm install
```

3. Make sure the backend API is running locally at `https://localhost:44329` or update the URL in the `environment.ts` file if needed.
4. Start the Angular app:

```bash
ng serve
```

5. Open your browser and go to:

```
http://localhost:4200
```

## Notes

- This project uses **Angular Material** for UI components and styling.
- The frontend requires the API to be up and running to function properly. Be sure to start the backend before testing any features.
