# LocalBoost — Local Business Digital Platform

> **Project Name:** `Local_Business_Digital_Platform2`
> **Repository Location:** `c:\Users\parik\OneDrive\Desktop\LSOYS\newww`
> **Stack:** React (Vite) + Node.js (Express) + MongoDB Atlas

---

## 📌 Project Overview

**LocalBoost** is a full-stack web platform built to help local/small businesses digitally transform their operations. It bridges the gap between offline storefronts and the online marketplace. The platform allows business owners to sign up, select a digital service plan, submit their business for admin verification, and then access their services through a dashboard.

The platform has two distinct user roles:
- **Regular Users** — Local business owners who register, browse services, and subscribe.
- **Admins** — Platform operators who manage service listings, verify/approve business registrations, and have access to an advanced Command Centre.

---

## 🏗️ Architecture Overview

```
newww/
├── .env                    # Root-level env (JWT secret, MongoDB URI, Email credentials, PORT)
├── backend/                # Node.js + Express REST API
│   ├── .env                # Backend-specific env (mirrors root .env)
│   ├── server.js           # Express app entry point
│   ├── config/
│   │   └── mongodb.js      # Mongoose connection
│   ├── models/
│   │   ├── User.js         # User schema
│   │   ├── Business.js     # Business schema (links User + Service)
│   │   └── Service.js      # Service/plan schema
│   ├── controllers/
│   │   ├── authController.js       # Signup, Login, Email Verification
│   │   ├── businessController.js   # CRUD for business registrations
│   │   └── ServiceController.js    # CRUD for services/plans
│   ├── middleware/
│   │   ├── authMiddleware.js    # JWT verification (Bearer token)
│   │   └── adminMiddleware.js   # Role check (admin only)
│   ├── routes/
│   │   ├── authRoutes.js        # /auth/...
│   │   ├── businessRoutes.js    # /business/...
│   │   └── serviceRoutes.js     # /services/...
│   └── utils/
│       └── sendEmail.js         # Nodemailer via Gmail SMTP
│
└── frontend/               # React 19 + Vite + TailwindCSS
    ├── index.html
    ├── vite.config.js
    ├── tailwind.config.js
    ├── .env.production       # VITE_API_URL for production
    └── src/
        ├── main.jsx          # React root
        ├── App.jsx           # Router (BrowserRouter + Routes)
        ├── index.css         # Global styles / Tailwind base
        ├── api/
        │   └── serviceApi.js     # Fetch wrappers for /services API
        ├── data/
        │   └── testimonials.js   # Static testimonials data (for homepage carousel)
        ├── components/
        │   └── layout/
        │       ├── CommandCentreLayout.jsx  # Nested layout for Command Centre
        │       ├── Navbar.jsx               # Top navigation component
        │       └── Sidebar.jsx              # Sidebar navigation component
        └── pages/
            ├── LocalBoostHomepage.jsx   # Public landing page (/)
            ├── LocalBoostFlow.jsx       # Marketing/flow page (/flow)
            ├── SignInSignUp.jsx         # Auth page (/sign-in)
            ├── VerifyEmail.jsx          # Email verification handler (/verify-email/:token)
            ├── BusinessSetupForm.jsx    # Business onboarding form (/business-setup) — static UI
            ├── BusinessStatusPending.jsx # Post-submission status page (/business-status)
            ├── UserDashboard.jsx        # Logged-in user dashboard (/user-dashboard)
            ├── ServiceDetail.jsx        # Single service detail page (/service/:id)
            ├── ServiceForm.jsx          # Admin: create/edit service form (/admin/service/new, edit/:id)
            ├── AdminDashboard.jsx       # Admin main dashboard (/admin, /admin/:tab)
            └── commandcentre/
                ├── Businesses.jsx       # Command Centre: manage businesses
                ├── Testimonials.jsx     # Command Centre: manage testimonials
                ├── Emailing.jsx         # Command Centre: email campaigns
                ├── CreateTemplate.jsx   # Command Centre: create email template
                └── Settings.jsx        # Command Centre: platform settings
```

---

## 🔑 Authentication System

### Flow
1. **Signup** → User fills name, email, password, phone.
2. A random `emailToken` (crypto hex) is generated and stored on the `User` document.
3. A verification email is sent via Nodemailer/Gmail with a link: `http://localhost:5173/verify-email/<token>`
4. **Email Verification** → User clicks the link, the `VerifyEmail` page hits `GET /auth/verify-email/:token`, which marks `isEmailVerified = true` and clears the token.
5. **Login** → Returns a signed **JWT** containing `{ id, role }`. Token is stored in `localStorage`. User object is also stored in `localStorage`.
6. **Role-based Redirect** → After login, `admin` role goes to `/admin`, all others go to `/user-dashboard`.

### JWT
- Signed with `JWT_SECRET` from `.env`
- Expires in `JWT_EXPIRES_IN` (currently `1h`)
- Sent as `Authorization: Bearer <token>` on protected requests

### Middleware
| Middleware | File | Purpose |
|---|---|---|
| `protect` | `authMiddleware.js` | Verifies JWT, attaches `req.user = { id, role }` |
| `adminOnly` | `adminMiddleware.js` | Blocks non-admin users (403) |

---

## 🗄️ Database — MongoDB Atlas

**Cluster:** `Cluster0` on MongoDB Atlas
**Database name:** `Local_Business_Portal2`
**Connection string:** stored in `.env` as `MONGO_URI`

### Schemas

#### `User`
| Field | Type | Notes |
|---|---|---|
| `name` | String | Display name |
| `email` | String | Unique |
| `password` | String | bcrypt hashed (10 rounds) |
| `phone` | String | Unique |
| `isEmailVerified` | Boolean | Default: `false` |
| `emailToken` | String | Set on signup, cleared after verification |
| `role` | String | `"user"` (default) or `"admin"` |
| `timestamps` | auto | `createdAt`, `updatedAt` |

#### `Service` (Admin-managed service plans)
| Field | Type | Notes |
|---|---|---|
| `title` | String | Required |
| `shortDescription` | String | Required |
| `longDescription` | String | Required |
| `price` | Number | Required |
| `duration` | String | Enum: `hourly`, `daily`, `weekly`, `monthly`, `one-time` |
| `features` | [String] | Array, min 1 item required |
| `category` | String | Default: `"general"` |
| `isActive` | Boolean | Default: `true` |
| `timestamps` | auto | `createdAt`, `updatedAt` |

#### `Business` (User-submitted business registration)
| Field | Type | Notes |
|---|---|---|
| `userId` | ObjectId | Ref: `User`, indexed |
| `serviceId` | ObjectId | Ref: `Service`, indexed |
| `businessName` | String | Required |
| `category` | String | Required |
| `description` | String | Required |
| `address` | String | Required |
| `city` | String | Required |
| `whatsappNumber` | String | Required |
| `verificationStatus` | String | Enum: `pending`, `approved`, `rejected`. Default: `pending`, indexed |
| `rejectionReason` | String | Default: `""` |
| `timestamps` | auto | `createdAt`, `updatedAt` |

---

## 🌐 API Routes

All routes are prefixed by the Express server running on `PORT=5000`.

### Auth Routes (`/auth`)
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/auth/signup` | Public | Register a new user |
| `POST` | `/auth/login` | Public | Login & get JWT |
| `GET` | `/auth/verify-email/:token` | Public | Verify email via token |

### Service Routes (`/services`)
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/services` | Public | Get all services |
| `GET` | `/services/:id` | Public | Get single service |
| `POST` | `/services` | Admin only | Create a new service |
| `PUT` | `/services/:id` | Admin only | Update a service |
| `DELETE` | `/services/:id` | Admin only | Delete a service |

### Business Routes (`/business`)
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/business` | User (JWT) | Submit a new business |
| `GET` | `/business/my` | User (JWT) | Get logged-in user's businesses |
| `GET` | `/business` | Admin only | Get all businesses |
| `PUT` | `/business/:id` | Admin only | Approve or reject a business |

---

## 🎨 Frontend — Pages & Routing

App uses `react-router-dom v7` with `BrowserRouter`.

| Route | Component | Access |
|---|---|---|
| `/` | `LocalBoostHomepage` | Public |
| `/flow` | `LocalBoostFlow` | Public |
| `/sign-in` | `SignInSignUp` | Public |
| `/verify-email/:token` | `VerifyEmail` | Public |
| `/business-setup` | `BusinessSetupForm` | Public (static UI) |
| `/business-status` | `BusinessStatusPending` | Public |
| `/user-dashboard` | `UserDashboard` | User (localStorage check) |
| `/service/:id` | `ServiceDetail` | Public |
| `/admin` | `AdminDashboard` | Admin |
| `/admin/:tab` | `AdminDashboard` | Admin |
| `/admin/service/new` | `ServiceForm` | Admin |
| `/admin/service/edit/:id` | `ServiceForm` | Admin |
| `/admin/commandcentre` | `CommandCentreLayout` (nested) | Admin |
| `/admin/commandcentre/businesses` | `Businesses` | Admin |
| `/admin/commandcentre/testimonials` | `Testimonials` | Admin |
| `/admin/commandcentre/emailing` | `Emailing` | Admin |
| `/admin/commandcentre/emailing/create-template` | `CreateTemplate` | Admin |
| `/admin/commandcentre/settings` | `Settings` | Admin |

> ⚠️ **Note:** There is NO route-level auth guard implemented on the frontend. Authentication is only enforced server-side via JWT middleware. Any user who knows the URL can navigate to admin pages (client-side access control is missing).

---

## 🖥️ Key Pages — Detailed Description

### `LocalBoostHomepage` (/)
The public marketing landing page. Contains:
- Fixed top navigation with Sign In / Get Started buttons
- Hero section with headline, stats (12k+ vendors, 94% growth, 24/7 support), and a fake dashboard mockup
- Stats strip (97% success, 78% faster setup, 3.5x ROI, $4.2T market)
- "Problem" section explaining 4 pain points for local businesses
- "Services" grid (6 service cards: Website Builder, Social Media, Print & Branding, GST, Inventory, Ad Performance)
- "How It Works" vertical 3-step timeline (Day 1, 2, 3)
- Testimonials auto-scrolling carousel (reads from `data/testimonials.js`, filters by `status === 'published'`)
- USP section with progress bars showing impact metrics
- CTA section linking to `/business-setup`
- Footer with legal links

### `LocalBoostFlow` (/flow)
A duplicate of the homepage with slightly different CTA behavior — the "Get Started" button links to `/business-setup` instead of `/flow`. Serves as a secondary entry point to the platform.

### `SignInSignUp` (/sign-in)
A split-panel auth page:
- Left panel: marketing copy about the platform
- Right panel: togglable Login/Signup form
- On login success: stores `token` and `user` in `localStorage`, redirects by role
- On signup success: shows alert, switches to login mode

### `VerifyEmail` (/verify-email/:token)
Reads `token` from URL params, calls `GET /auth/verify-email/:token`, displays success/error message.

### `BusinessSetupForm` (/business-setup)
**Currently a static UI demo** — the form does not submit data to the backend. It navigates to `/business-status` on submit button click via `window.location.href`. Fields shown: Business Name, Category (dropdown), Description, Address, City, WhatsApp Number.

> ⚠️ **Known Gap:** This form is not wired to the backend `POST /business` endpoint. Integration is needed.

### `BusinessStatusPending` (/business-status)
Shows the pending verification status after a business is submitted.

### `UserDashboard` (/user-dashboard)
Logged-in user's portal showing a sidebar with Services, My Business, Analytics, Settings navigation. Main content area shows a welcome hero and a grid of 6 hard-coded service cards (not fetched from API). Logout clears localStorage.

> ⚠️ **Known Gap:** The service grid uses dummy/static data, not the live API.

### `AdminDashboard` (/admin, /admin/:tab)
The main admin control panel. Has a dark sidebar (`#0F1A3D`) with tabs:
- **Overview** — Metrics row (Total Businesses, Pending Verification, Active Services, Emails Sent), Business Lifecycle Pipeline, Quick Actions, Activity Feed, Hot Services chart, System Alerts, Insights card. All data is currently **hardcoded/dummy**.
- **Verify Businesses** — Shows pending businesses from `DUMMY_USERS` array (dummy data, not live). Stats for pending count, docs, avg review time. Table with Approve/Reject buttons (wired only to navigate, not to backend).
- **Manage Services** — Fetches real data from `GET /services` via `serviceApi.js`. Lists services in a table with Edit/Delete. Delete calls `DELETE /services/:id`. Create navigates to `/admin/service/new`.
- **Users** — Master-detail panel showing `DUMMY_USERS` list on left, selected user's full profile on the right. Filter/search functionality. Module permission toggles, account access toggle. All dummy data.

Sidebar also has a **Command Centre** link (yellow, rocket icon) linking to `/admin/commandcentre`.

### `ServiceForm` (/admin/service/new, /admin/service/edit/:id)
Full form to create or edit a service. Fields: Title, Short Description, Long Description, Price, Duration, Features (comma-separated), Category, Active status. Fetches existing data on edit mode. Submits via `POST /services` or `PUT /services/:id`.

### Command Centre (`/admin/commandcentre/*`)
A nested layout (`CommandCentreLayout`) with its own `Sidebar` and `Navbar` components. Sub-pages:
- **Businesses** — Manage business listings
- **Testimonials** — Manage customer testimonials shown on homepage
- **Emailing** — Email campaign management UI
- **CreateTemplate** — Rich email template builder
- **Settings** — Platform-level settings

---

## 📦 Tech Stack

### Backend
| Package | Version | Purpose |
|---|---|---|
| `express` | ^5.2.1 | Web framework |
| `mongoose` | ^9.4.1 | MongoDB ODM |
| `bcrypt` | ^6.0.0 | Password hashing |
| `jsonwebtoken` | ^9.0.3 | JWT auth tokens |
| `nodemailer` | ^8.0.5 | Email sending |
| `dotenv` | ^17.4.1 | Environment variables |
| `cors` | ^2.8.6 | Cross-Origin Resource Sharing |
| `crypto` | ^1.0.1 | Token generation |
| `nodemon` | ^3.1.14 | Dev auto-restart |

### Frontend
| Package | Version | Purpose |
|---|---|---|
| `react` | ^19.2.4 | UI library |
| `react-dom` | ^19.2.4 | DOM rendering |
| `react-router-dom` | ^7.14.0 | Client-side routing |
| `axios` | ^1.15.0 | HTTP client (available but serviceApi.js uses native `fetch`) |
| `vite` | ^8.0.4 | Build tool / dev server |
| `tailwindcss` | ^3.4.19 | Utility CSS framework |
| `autoprefixer` | ^10.4.27 | CSS autoprefixer |
| `postcss` | ^8.5.9 | CSS processing |

---

## 🎨 Design System

The frontend uses a **Tailwind CSS** custom theme (defined in `tailwind.config.js`) with a Material Design 3-inspired token system.

### Color Palette
| Token | Hex | Usage |
|---|---|---|
| `primary` | `#1B2A5E` | Navy blue — headings, buttons, sidebar |
| `secondary` | `#1DB887` | Teal/green — accents, CTAs, active states |
| `surface` | `#F9FAFB` | Page backgrounds |
| `on-surface` | Dark text | Body text |

### Typography
- **Display/Heading:** `Bricolage Grotesque` (Google Fonts)
- **Body/UI:** `Inter` (Google Fonts)
- **Monospace/Code:** `JetBrains Mono` (Google Fonts)
- **Icons:** Google Material Symbols Outlined

---

## 🔧 Environment Variables

### Root `.env` (shared/backend)
```env
JWT_SECRET=edhyrtqevdvfhejuiooppqqqsgtrrghyus
MONGO_URI=mongodb+srv://riddhishintre_db_user:...@cluster0.ptxkk0c.mongodb.net/Local_Business_Portal2
PORT=5000
JWT_EXPIRES_IN=1h
EMAIL_PASS=<gmail app password>
EMAIL_USER=pratikshashintre@gmail.com
```

### Frontend `.env.production`
```env
VITE_API_URL=<production backend URL>
```

In development, the frontend falls back to `http://localhost:5000` for all API calls.

---

## 🔄 User Journey / Flows

### New Business Owner Flow
```
Homepage (/) → "Get Started" → /flow → /business-setup (static form)
                                     → /business-status (pending)
                                     → (email verification required to login)
→ Sign In (/sign-in) → /user-dashboard (role: user)
```

### Admin Flow
```
Sign In → /admin (dashboard with tabs)
       → /admin/verification (review businesses)
       → /admin/services (manage service listings)
       → /admin/users (view user profiles)
       → /admin/commandcentre (advanced tools)
          ├── /businesses
          ├── /testimonials
          ├── /emailing
          │   └── /emailing/create-template
          └── /settings
```

---

## ⚠️ Current Known Issues / Gaps

### Critical Gaps
1. **BusinessSetupForm is not connected to backend** — The form at `/business-setup` navigates to `/business-status` without calling `POST /business`. The actual backend endpoint exists and works, but the UI doesn't use it.

2. **No frontend authentication guards** — There are zero `PrivateRoute` or auth-check components. Any unauthenticated user can access `/admin` or `/user-dashboard` by typing the URL directly.

3. **Admin dashboard uses mostly dummy/hardcoded data** — The Verification tab, Users tab, and Overview metrics are all static. Only the Services tab fetches real data from the API.

4. **UserDashboard service grid is hardcoded** — The 6 service cards shown to logged-in users are static; they don't come from `GET /services`.

5. **Verification approve/reject not wired** — The "Approve" button in the verification tab navigates to `/admin/users` instead of calling `PUT /business/:id` on the backend.

### Minor Issues
6. **JWT expires in 1 hour** with no refresh token mechanism — users get logged out silently.
7. **Email verification link hardcoded to `localhost:5173`** — This needs to use an environment variable for production.
8. **`BusinessSetupForm` has no `serviceId` input** — The backend requires `serviceId` when creating a business, but the form doesn't have a way for users to select a service.
9. **`LocalBoostFlow.jsx` is a near-duplicate** of `LocalBoostHomepage.jsx` — could be refactored/removed.

---

## 🚀 Running the Project Locally

### Backend
```bash
cd backend
npm install
npm run dev     # nodemon server.js (port 5000)
```

### Frontend
```bash
cd frontend
npm install
npm run dev     # Vite dev server (port 5173)
```

### Access
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:5000`

---

## 📊 Data Flow Summary

```
[User Browser]
     │
     │  (fetch / Axios)
     ▼
[React Frontend : 5173]
     │
     │  HTTP REST (Bearer JWT)
     ▼
[Express Backend : 5000]
  ├── /auth/*  → authController  → User model
  ├── /services/* → ServiceController → Service model
  └── /business/* → businessController → Business model (+ User + Service refs)
                                              │
                                              ▼
                                    [MongoDB Atlas]
                                    Local_Business_Portal2
                                    ├── users
                                    ├── services
                                    └── businesses
```

---

## 📝 Notes for Developers

- **Authentication tokens** are stored in `localStorage` (not `httpOnly` cookies), which is a security consideration.
- The `axios` library is installed on the frontend but not used — all API calls use native `fetch`.
- `CORS` is configured with wildcard `app.use(cors())` — should be tightened in production.
- The backend uses **Express v5** (latest), which has some behavioral differences from v4 (async error handling improved).
- Testimonials on the homepage come from a **static data file** `src/data/testimonials.js`, not from the database. The Command Centre "Testimonials" page is for managing this content but the connection to the homepage data is not yet dynamic.
- The project name in the MongoDB URI is `Local_Business_Portal2` matching the corpus name `RIDDHISHINTRE/Local_Business_Digital_Platform2`.
