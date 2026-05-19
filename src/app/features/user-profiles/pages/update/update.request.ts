export interface UpdateRequest {
  nickname: string;
  slug: string;
  firstName?: string;
  lastName?: string;
  country?: string;
  bio?: string;
  avatarUrl?: string;
}
