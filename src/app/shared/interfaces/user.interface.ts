export interface IUserData {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}

export interface ISendPush {
  user_id: string;
  date_start: string;
  push_message: string;
}
