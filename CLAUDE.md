# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Rebuskate is a React-based web application for posting and browsing service requests. It's a Create React App project that uses Material-UI components, styled-components, and React Router for navigation. The app includes authentication using react-auth-kit with JWT tokens stored in cookies.

## Development Commands

### Start Development Server
```bash
npm start
```
Runs on port 80 (configured in package.json). Access at http://localhost:80

### Run Tests
```bash
npm test
```
Launches Jest test runner in interactive watch mode.

### Build for Production
```bash
npm run build
```
Creates optimized production build in `build/` folder.

## Architecture

### Authentication System

The app uses **react-auth-kit** for authentication management with two authentication patterns coexisting:

1. **react-auth-kit** (primary): Cookie-based auth configured in `src/index.js`
   - Auth store configured with `createStore()`
   - Uses `RequireAuth` wrapper for protected routes in `src/App.js`
   - Hooks: `useAuthUser()`, `useAuthHeader()`, `useSignIn()`, `useSignOut()`

2. **Custom AuthContext** (legacy): Context-based auth in `src/contexts/`
   - `AuthProvider.js` - Legacy context provider (still imported but not primary)
   - Custom hooks in `src/hooks/` for auth operations

### API Communication

- **Base Axios Instance**: `src/api/axios.js`
  - Default instance uses hardcoded URL: `http://192.168.1.10:81`
  - `axiosPrivate` instance uses `process.env.REACT_APP_BACKEND_SERVER` for backend URL

- **Request Interceptors**: `src/hooks/useAxiosPrivate.js`
  - Automatically adds Authorization header from react-auth-kit
  - Handles 403 errors by refreshing token via `/refresh` endpoint
  - Clean-up pattern to eject interceptors on unmount

### Environment Variables

Required in `.env` file (not committed to git):
- `REACT_APP_BACKEND_SERVER` - Backend API base URL

### Routing Structure

Main routes in `src/App.js`:
- `/` - Home page (public feed of posts)
- `/custom` - Protected custom home view (requires auth)
- `/create` - Protected post creation (requires auth)
- `/login` - Login page
- `/register`, `/register2`, `/register3` - Multi-step user registration
- `/registerexpert` - Expert registration
- `/post/:id` - Single post view
- `/logout` - Logout handler

### Component Organization

- **Page Components**: Top-level in `src/` (Home.js, Login.js, CreatePost.js, etc.)
- **Reusable Components**: `src/components/`
  - Form components: `Form/`, `LargeForm/`, `InputField/`, `InputPassword/`, `InputFieldSpaced/`
  - UI components: `Button/`, `ErrorLabel/`, `SuccessLabel/`, `Modal/`, `NewModal/`, `OnlyPreviewModal/`
  - Feature components: `Post.js`, `CustomPost.js`, `PostModificar.js`, `Menu.js`, `SignedOutMenu.js`
  - Utility: `AlertDialog.js`, `GoLoginDialog.js`, `ImageViewerModal/`, `UploadWidget.js`

Each component directory with `index.js` + `styled.js` follows pattern:
- `index.js` - Component logic
- `styled.js` - Styled-components definitions

### Custom Hooks

Located in `src/hooks/`:
- `useAuth.js` - Access legacy auth context
- `useAuthContext.js` - Legacy auth context hook
- `useAxiosPrivate.js` - Axios instance with auth interceptors
- `useLogin.js` - Login logic
- `useLogout.js` - Logout logic
- `useSignup.js` - Signup logic
- `useRefreshToken.js` - Token refresh logic (calls `/refresh` endpoint)

### Styling Approach

- Global styles: `src/styled.js` contains shared styled-components
- Component styles: Individual `styled.js` files in component folders
- Material-UI: Used for icons and some components (@mui/material, @mui/icons-material)
- CSS: Traditional CSS in App.css and index.css

## Key Patterns

### Protected Routes
Routes requiring authentication use `RequireAuth` wrapper with fallback redirect:
```javascript
<Route path={'/custom'} element={
  <RequireAuth fallbackPath={'/login?redirect=/custom'}>
    <CustomHome />
  </RequireAuth>
} />
```

### API Calls with Auth
Use `useAxiosPrivate` hook for authenticated requests:
```javascript
const axiosPrivate = useAxiosPrivate();
const response = await axiosPrivate.get(process.env.REACT_APP_BACKEND_SERVER + '/posts');
```

### Data Fetching Pattern
Common pattern with cleanup and abort controller:
```javascript
useEffect(() => {
  let isMounted = true;
  const controller = new AbortController();

  const fetchData = async () => {
    try {
      const response = await axiosPrivate.get('/endpoint', {
        signal: controller.signal
      });
      if (isMounted) {
        // Update state
      }
    } catch (err) {
      // Handle error
    }
  };

  fetchData();

  return () => {
    isMounted = false;
    controller.abort();
  };
}, [dependencies]);
```

## Important Notes

- The app has backup files (*.bu, *.bu20240803) in `src/` - these are old versions kept for reference
- Backend URL configuration exists in two places: hardcoded in axios.js and env var in axiosPrivate
- Two authentication systems coexist - react-auth-kit is primary, AuthContext is legacy but still present
- Development server runs on port 80 (requires sudo on Linux or run as root)
