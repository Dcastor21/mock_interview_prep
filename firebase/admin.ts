import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

const projectId = process.env.FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

const initFirebaseAdmin = () => {
  const apps = getApps();

  if (!apps.length) {
    if (!projectId || !clientEmail || !privateKey) {
      throw new Error(
        "Missing Firebase Admin environment variables: FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY"
      );
    }

    const serviceAccount = {
      project_id: projectId,
      client_email: clientEmail,
      private_key: privateKey,
    } as any;

    initializeApp({
      credential: cert(serviceAccount),
    });

    const firestoreInstance = getFirestore();
    firestoreInstance.settings({ ignoreUndefinedProperties: true });
  }

  const db = getFirestore();

  return {
    auth: getAuth(),
    db,
  };
};

export const { auth, db } = initFirebaseAdmin();
