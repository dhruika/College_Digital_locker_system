import path from "path";
import { fileURLToPath } from "url";
import admin from "firebase-admin";

// Re-create __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load service account
import serviceAccount from "./serviceAccountKey.json" assert { type: "json" };

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "locker-authentication.appspot.com" // <-- update bucket name if needed
});

const db = admin.firestore();
const bucket = admin.storage().bucket();

export { db, bucket };
