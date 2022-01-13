import { IPicture } from 'app/shared/model/picture.model';

export interface ITag {
  id?: number;
  name?: string | null;
  pictures?: IPicture[] | null;
}

export const defaultValue: Readonly<ITag> = {};
