# LemonadeStand (Expo + TypeScript)

A sample digital lemonade stand app built with **Expo SDK 51 (React Native 0.74)** and TypeScript.  
Demonstrates modern React Native patterns, state management, theming, validation, persistence, and testing.

---

## Features

- **Cross-platform:** iOS, Android, Web (via Expo Web)
- **Redux Toolkit** for global state (cart + orders)
- **Orders persistence** across app restarts (AsyncStorage + redux-persist)
- **Theme modes:** System / Light / Dark with AsyncStorage persistence
- **React Navigation (native-stack)** for multi-screen flow
- **Zod validation** for checkout form (Name required + Email/Phone at least one)
- **Axios + error handling** with request timeouts
- **Mock Express backend** (`/beverages`, `/orders`)
- **Jest + React Testing Library** unit/integration tests

---

## Run the app

```bash
npm install
npm run server            # starts mock backend at http://localhost:3001
npm run start             # launch Expo, then press i / a / w
```

### Android emulator tip

```bash
EXPO_PUBLIC_API_URL=http://10.0.2.2:3001 npx expo start
```

This points the Expo client (running inside the Android emulator) to your local backend.

### Web

```bash
npx expo start --web -c
```

---

## Usage

- **Browse beverages** on the Home screen (fetched dynamically from backend).
- **Add to cart** and proceed to **Checkout**.
- **Checkout form** requires:
  - `Name` (always required)
  - At least one contact method (`Email` or `Phone`)
- **Orders** are confirmed with a backend `orderId`.
- **“My Orders”** screen shows order history and persists across app restarts.
- **Settings** lets you toggle theme (System/Light/Dark). Preference is saved.

---

## API Endpoints

- `GET /beverages` → Returns available beverage types + sizes/prices.
- `POST /orders` → Accepts order payload, responds with `{ orderId }`.

---

## Tests

Run the Jest test suite:

```bash
npm test
```

Includes:

- Checkout form validation
- Home beverage fetch rendering
- Order flow (add → checkout → place order)

---

## Design Decisions & Trade-offs

This project is designed as a **take-home assignment** for a senior mobile developer role.  
Some decisions were made deliberately for clarity and demonstration:

### State Management

- **Redux Toolkit** was chosen over lighter options (Zustand, Context API) to demonstrate enterprise-level scalability, devtooling, and persistence (orders, theme).
- Trade-off: Slightly more boilerplate, but highlights skills with a production-ready pattern.

### Theming

- **System-follow** + **manual toggle** + **AsyncStorage persistence** were implemented.
- Trade-off: More complexity than hardcoding one theme, but demonstrates understanding of cross-platform UX consistency.

### Validation

- **Zod** was used to enforce schema-driven validation at the form level.
- Trade-off: External dependency instead of custom validation, but guarantees clear, typed error messages and matches real-world practices.

### API & Dynamic Data

- A **mock Express server** simulates dynamic beverages and orders.
- Trade-off: Backend is minimal, but the app is written so that swapping in a real API would require no rebuild (dynamic updates).

### Persistence

- Orders are persisted locally with **redux-persist + AsyncStorage**, so the order history survives restarts.
- Trade-off: No remote persistence (multi-device sync), but enough to demonstrate persistence strategies.

### Error Handling

- Axios requests include **timeouts** to prevent UI freeze.
- Trade-off: Simplified retry/backoff handling, but avoids “frozen button” pitfalls and shows awareness of UX risks.

### Testing

- **Jest + React Testing Library** used for unit/integration tests (fetch, validation, order flow).
- Trade-off: Full E2E (Detox) was skipped to avoid setup overhead; still demonstrates automated UI verification.

### Expo vs. Pure React Native

- **Expo** was kept to accelerate development and demonstrate multi-platform support (iOS, Android, Web) with minimal config.
- Trade-off: Expo adds some abstraction, but this shows pragmatic decision-making and awareness of developer velocity vs. bare-metal control.

---

## Notes

- Built for demonstration and take-home purposes (not production-hardened).
- Mock backend must be running for full E2E flow.
- Works across **iOS, Android, Web** consistently.
