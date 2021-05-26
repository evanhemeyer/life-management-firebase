import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

import { insertNewUser } from "./User";

admin.initializeApp();

export const RegisterHasuraUser = functions.auth
  .user()
  .onCreate(async (user) => {
    try {
      const newUser = await insertNewUser({
        email: user.email,
        google_uid: user.uid,
      });
      const customClaims = {
        "https://hasura.io/jwt/claims": {
          "x-hasura-default-role": "user",
          "x-hasura-allowed-roles": ["user"],
          "x-hasura-user-id": newUser.insertUser.id,
        },
      };
      return admin.auth().setCustomUserClaims(user.uid, customClaims);
    } catch (e) {
      console.log(e);
    }
  });
