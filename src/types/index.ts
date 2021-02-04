declare type Column = {
  id: number;
  title: string;
};

declare type UserComment = {
  id: number;
  value: string;
  card_id: number;
  author: string;
  date: Date;
};

declare type Card = {
  id: number;
  title: string;
  column_id: number;
  author: string;
  description: string;
};

declare type ApplicationState = {
  data: DataState;
  auth: AuthState;
};

declare type DataState = {
  columns: Array<Column>;
  comments: Array<UserComment>;
  cards: Array<Card>;
};

declare type AuthState = {
  name: string | null;
};
