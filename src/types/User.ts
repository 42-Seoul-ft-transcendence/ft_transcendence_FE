export type User = {
  id: number;
  name: string;
  image: string;
  wins: number;
  losses: number;
};

export type UserListResponse = {
  users: User[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};
