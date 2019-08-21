import { FirestoreDocumentData } from '@/vue-common';

export interface ExperienceData {
  name: string;
  description: string;
  startAt: string;
  endAt: string;
  skill: string[];
}

export interface BasicData {
  name: string;
  engName: string;
  job: string;
  birth: string;
  email: string;
  phone: string;
}

export interface SkillData {
  name: string;
  color: string;
}

export interface EducationData {
  name: string;
  startAt: string;
}

export default class Profile extends FirestoreDocumentData {
  public basic: BasicData = {
    name: '',
    engName: '',
    job: '',
    birth: '',
    email: '',
    phone: '',
  };
  public educations: EducationData[] = [];
  public skills: SkillData[] = [];
  public experiences: ExperienceData[] = [];
  public url: string = '';
}
