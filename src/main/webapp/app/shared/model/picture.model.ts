import { IAlbum } from 'app/shared/model/album.model';
import { IUser } from 'app/shared/model/user.model';
import { ITag } from 'app/shared/model/tag.model';

export interface IPicture {
  id?: number;
  name?: string | null;
  date?: string | null;
  link?: string | null;
  description?: string | null;
  album?: IAlbum | null;
  user?: IUser | null;
  tags?: ITag[] | null;
}

export const defaultValue: Readonly<IPicture> = {};
