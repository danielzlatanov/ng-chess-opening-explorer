# Chess Opening Explorer

An Angular application for exploring, learning, and adding new chess opening positions.

## Installation and Setup

1. Access the Chess Opening Explorer folder: `cd chess-opening-explorer/`
2. Install dependencies: `npm install --save --legacy-peer-deps`

## How to run the Project (Development server)

To run the application locally in development mode, use the following command:

-   `ng serve`
-   Then, access the application in your web browser at [http://localhost:4200/](http://localhost:4200/).
-   The application will automatically reload if you change any of the source files.

## Access the Deployed Application

The Chess Opening Explorer is deployed with Vercel and is accessible at [Chess Opening Explorer](https://chess-opening-explorer.vercel.app/).

## Features

### Non-Logged-In Users (Guests):

-   Access the login and register forms to sign in or create an account with their email and password.
-   View featured openings on the home page and access their details.
-   Browse the catalog and see the details of each opening.
-   Opening Details page:
    -   Opening info: owner's name, difficulty level, FEN position, and description.
    -   Interactive chessboard that displays the current opening position and allows users to explore further by dragging & dropping or clicking to move the pieces and see how the game might unfold.
    -   Users can also reset the board, undo their own moves, and flip it for a different perspective.

### Logged-In Users (Authenticated Users):

-   Enjoy all features available to guests.
-   View full information in the home and catalog.
-   Edit or delete openings they own.
-   Favourite/unfavourite openings that are not owned by them.
-   Access private sections: create or edit an opening and profile page.

### Create an Opening:

-   Users need to provide an opening name, a strategy behind the opening's moves (description), valid Forsyth-Edwards notation (FEN), and difficulty level (easy, medium, hard).
-   Once the FEN position is valid, a button to display the position on the chessboard will appear.

### Profile Page:

-   Personal information section:
    -   User's email address
    -   Account creation date
-   Openings explored section:
    -   All openings the user has explored _(viewed the details of a given opening)_
-   Favourited openings:
    -   All openings the user has added to favourites _(fav/unfav options available in the details of an opening)_
-   Openings created by the user:
    -   Displays all of their own openings with title, description, and edit/delete buttons

## Technologies Used

-   Angular: Frontend development.
-   Angular Animations: Used by ngx-chess-board library.
-   Angular Material: Styling of some elements and using ready components.
-   Firebase: Realtime Database for backend and data storage.
-   Firebase Authentication: Used for user authentication and account creation.
-   Ngx-chess-board: Used for handling the chessboard functionality.
-   RxJS: Used for reactive programming in some parts of the application.
-   Font Awesome: Used for adding icons to the user interface.
-   Vercel: Deployment platform.

### Main Dependencies list:

-   `@angular/fire`: Angular library for Firebase integration.
-   `@fortawesome/angular-fontawesome`: Angular integration for Font Awesome icons.
-   `firebase`: Firebase SDK for JavaScript.
-   `ngx-chess-board`: Angular library for the dynamic chessboard.
-   `rxjs`: Reactive Extensions for JavaScript.
-   `tslib`: Runtime library for TypeScript.

## Brief Application Structure

-   `app.module` and `app-routing`: Main module and routing to /auth and /opening (lazy-loaded modules).
-   `auth module`:
    -   Components: Login, Logout, Profile, and Register.
    -   Auth routing module for managing child routes.
    -   Auth service for authentication-related actions.
-   `opening module`:
    -   Components: Catalog, Create, Edit, Delete and Details.
    -   Opening routing module for managing child routes.
    -   Opening service opening-related actions.
-   `core module`:
    -   Core components: Footer, Header, Home, Opening-not-found (database error) and Page-not-found (invalid url).
    -   Guards: Auth guard.
-   `shared module`:
    -   Shared components: Chessboard, Delete confirmation dialog, Error dialog, Form editor base (create/edit), Loader (data fetching), No-openings msg (empty database).
    -   Directives: Compare pass directive for register form validation.
    -   Helpers: Generate random chess piece img for openings, and Trim form fields on submit.
    -   Services: Notification service (on guard redirect/on success messages)
    -   Interfaces: IOpening.

## Firebase Documentation

-   The application utilizes Firebase Realtime Database for storing data. This documentation provides detailed information on how to interact with the database and perform CRUD (Create, Read, Update, Delete) operations using the Firebase SDK in the web environment.

-   The API documentation for Firebase Realtime Database can be accessed at the following link: [Firebase Realtime Database Documentation](https://firebase.google.com/docs/database/web/start?hl=en&authuser=0) or view [Angular Fire Library](https://github.com/angular/angularfire) instead.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

To learn more regarding ngx-chess-board, access the documentation at [Ngx Chessboard](https://github.com/grzegorz103/ngx-chess-board).

## License

This project is licensed under the MIT License.

## [Application](https://chess-opening-explorer.vercel.app/) Screenshot

<img width="1665" alt="coe-catalog" src="https://github.com/danielzlatanov/ng-chess-opening-explorer/assets/110429874/abf9edc0-9ef1-40bf-b735-a5e242b71bd7">
