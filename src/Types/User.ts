export type User = {
  userId: string 
  firstName: string | undefined | null;
  lastName: string;
  gender: string;
  username: string;
  emailVerified: boolean;
  phoneNumber: string;
  phoneNumberVerified: boolean;
  originCountry: string;
  image: string;
  authorities: Array<string>;
};
