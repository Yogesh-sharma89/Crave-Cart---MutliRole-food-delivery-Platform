import {cert,getApps,initializeApp} from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import firebaseAdmin from "../../firebase-admin.json" with { type: "json" };



const app = getApps().length===0 ? initializeApp({
    credential:cert(firebaseAdmin)
})
:
getApps()[0];


export const auth = getAuth(app);