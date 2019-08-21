import { FirestoreCollection } from '@/vue-common';
import Profile from './profile';

export default class Collections {
  public static readonly profiles = new FirestoreCollection<Profile>(
    'profiles',
  );
}
