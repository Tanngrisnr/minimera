## Minimera

_A UX implementation project for KYH Yrkeshögskola_

Minimera was a project to create a platform for sharing economy. Minimera is designed primarily for mobile devices and as such is best viewed through a screen around 425 pixels wide or lower. Minimera was created using react as a front-end and firebase as back end, as well as utilizing MUI and Emotion to provide styling for the site. This is still a build-version so some bugs might appear when running.

![three screenshots showing he minimera landing page, dashboard and create ad page.](https://raw.githubusercontent.com/Tanngrisnr/minimera/main/screenshots/minimera4.png)

## Dependencies:

- [React](https://reactjs.org/)
- [Emotion](https://emotion.sh/docs/introduction)
- [MUI](https://mui.com/)
- [Firebase](https://firebase.google.com/)
- [Node](https://nodejs.org/en/)

## Installation

after recieving or cloning this repository run `npm install`

If I didn't send this project to you directly, create a firebase project and `.env` file. initialize a web project and add the corresponding keys to the `.env` file in this fashion:

    REACT_APP_FIREBASE_API_KEY="Your key here"
    REACT_APP_FIREBASE_AUTH_DOMAIN="Your key here"
    REACT_APP_FIREBASE_DATABASE_URL="Your key here",
    REACT_APP_FIREBASE_PROJECT_ID="Your key here"
    REACT_APP_FIREBASE_STORAGE_BKT="Your key here"
    REACT_APP_FIREBASE_MESSAGE_SENDER_ID="Your key here"
    REACT_APP_FIREBASE_APP_ID="Your key here"
    REACT_APP_FIREBASE_MEASUREMENT_ID="Your key here"

you can now run the project using `npm start`

(any warnings associated with performing an `npm install` with this project are due to dependency problems with `create-react-app` not related to the way this project has been built.)
By [Fredrik Wintzell](https://wintzell.surge.sh/)
