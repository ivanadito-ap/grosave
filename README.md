# GroSave 🛒

**GroSave** helps shared households keep track of their groceries and cut food waste. Create a group for your household, add the items you buy along with their expiry dates, and GroSave flags what's about to go off so it gets used before it's wasted.

Built by the GroSave team for the RPL Project 2025.

---

## ✨ Features

- **Google sign-in:** Log in with your Google account through Firebase Authentication.
- **Household groups:** Create a group with a name, a monthly budget (Rp) and a list of member emails.
- **Grocery tracking:** Add items to a group with a name, a category (Dairy, Poultry, Fruit, Vegetable, Meat, Grains, Other) and an expiry date. The list updates in real time for everyone viewing it.
- **Expiry status:** Each item is tagged and colour-coded as *Expired*, *Today*, *≤ 3 days left*, *≤ 7 days left* or *Good*.
- **Profile:** Edit your display name and photo URL, and set a location (the location is saved in the browser only).

## 🛠 Tech Stack

- **Frontend:** [React 19](https://react.dev/) + [Vite 7](https://vite.dev/)
- **Routing:** [React Router 7](https://reactrouter.com/)
- **Styling:** [Tailwind CSS 3](https://v3.tailwindcss.com/) + [daisyUI 4](https://daisyui.com/) (custom dark `grosave` theme)
- **Icons:** [lucide-react](https://lucide.dev/)
- **Backend:** [Firebase](https://firebase.google.com/): Authentication (Google provider) and Cloud Firestore

There is no separate server; the app talks to Firebase directly from the browser.

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 20.19+ or 22.12+ (required by Vite 7) and npm
- A Firebase project of your own

### 1. Set up Firebase

1. Create a project in the [Firebase console](https://console.firebase.google.com/).
2. Add a **Web app** to the project and copy its config values.
3. Under **Authentication → Sign-in method**, enable **Google**.
4. Under **Firestore Database**, create a database.

### 2. Clone and install

```bash
git clone https://github.com/ivanadito-ap/grosave.git
cd grosave
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root (it is git-ignored) and fill in the values from your Firebase web app config:

```env
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_SENDER_ID=your-messaging-sender-id
VITE_FIREBASE_APP_ID=your-app-id
```

### 4. Run it

```bash
npm run dev
```

Then open the URL Vite prints (usually http://localhost:5173).

### Available scripts

| Command           | What it does                              |
| ----------------- | ----------------------------------------- |
| `npm run dev`     | Start the dev server with hot reload      |
| `npm run build`   | Build for production into `dist/`         |
| `npm run preview` | Serve the production build locally        |
| `npm run lint`    | Run ESLint                                |

---

## 📁 Project Structure

```
src/
├── main.jsx              # App entry point
├── App.jsx
├── firebase.js           # Firebase init (auth, Google provider, Firestore)
├── routes/AppRoutes.jsx  # Routes; logged-out users are sent to /login
├── layout/MainLayout.jsx # Navbar + page + footer
├── pages/                # Home, LearnMore, Login, Groups, Groceries, Profile, NotFound
├── components/           # Navbar, Footer, ModalCreateGroup, ...
└── hooks/                # useAuth, useGroceries, useRealtimeCollection, ...
```

## 🗄 Data Model (Firestore)

**`groups`**

| Field       | Type          | Notes                                     |
| ----------- | ------------- | ----------------------------------------- |
| `name`      | string        | Household name                            |
| `budget`    | number        | Monthly budget in Rp                      |
| `members`   | string[]      | Member emails, including the creator      |
| `memberIds` | string[]      | User IDs that can see the group           |
| `createdBy` | string        | Creator's user ID                         |
| `createdAt` | timestamp     |                                           |

**`groceries`**

| Field       | Type      | Notes                                         |
| ----------- | --------- | --------------------------------------------- |
| `groupId`   | string    | ID of the group the item belongs to           |
| `name`      | string    |                                               |
| `type`      | string    | Category, e.g. `Dairy`, `Fruit`               |
| `expiry`    | string    | `YYYY-MM-DD`                                  |
| `quantity`  | number    | Defaults to 1                                 |
| `createdAt` | timestamp |                                               |

---

## 🚧 Known Limitations

GroSave is a prototype. Things that don't work yet:

- **Group invites:** member emails are saved, but only the group's creator is added to `memberIds`, so invited members can't see the group yet.
- **Guest access:** "Continue as Guest" on the login page doesn't let you in; you need to sign in with Google.
- **Security rules:** Firestore security rules aren't included in this repository. Set up your own before using real data.
