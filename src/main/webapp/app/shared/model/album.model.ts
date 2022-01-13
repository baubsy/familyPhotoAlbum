import { IUser } from 'app/shared/model/user.model';

export interface IAlbum {
  id?: number;
  name?: string | null;
  description?: string | null;
  user?: IUser | null;
}

export const defaultValue: Readonly<IAlbum> = {};
