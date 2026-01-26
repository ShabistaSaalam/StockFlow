# Flutter Frontend (Minimal Demo)

This is a minimal Flutter frontend for the **Inventory Allocation System** demo.

## Features

- Simple form to place an order:
  - Product ID
  - Quantity
- Uses the same backend API: `POST /order`
- Displays success or failure messages based on API response.
- **No business logic** in frontend (all stock validation is handled by backend).

## Folder Structure

```
flutter/           # Flutter frontend
├─ lib/
│  └─ main.dart    # main Flutter app entry
├─ pubspec.yaml    # Flutter dependencies
└─ README.md       # folder-specific README
```
## Running the Flutter App

1. Navigate to the `flutter/` folder.
2. Run `flutter pub get` to install dependencies.
3. Run `flutter run -d chrome` (or another supported device) to start the app.


## Notes

- This app is for **demo purposes only**.
- It demonstrates interaction with the backend without adding additional business logic.
- Make sure the backend is running on `http://localhost:3000` before testing.

