import gql from "graphql-tag";
import { graphqlClient } from "./API";

// type UsersData = {
//   users: User[];
// };

export type User = {
  google_uid: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  id: number;
};

export type AddUser = Pick<User, "email" | "google_uid">;

export type InsertUserData = {
  insertUser: {
    id: number;
  };
};

export const INSERT_USER = gql`
  mutation InsertUser($email: String = "", $googleUid: String = "") {
    insertUser(object: { email: $email, google_uid: $googleUid }) {
      id
    }
  }
`;

export const insertNewUser = (data: AddUser) =>
  graphqlClient.request<InsertUserData>(INSERT_USER, {
    email: data.email,
    googleUid: data.google_uid,
  });
