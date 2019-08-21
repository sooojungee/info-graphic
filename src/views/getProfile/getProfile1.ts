import { Vue, Component } from 'vue-property-decorator';
import moment from 'moment';

import {
  BasicData,
  SoftwareData,
  EducationData,
  ExperienceData,
} from '@/lib/file/profile';

@Component({})
export default class GetProfile extends Vue {
  private current: number = 0;
  private steps: Array<{
    title: string;
    content: string;
  }> = [
    {
      title: 'Basic Info',
      content: 'First-content',
    },
    {
      title: 'Career',
      content: 'Second-content',
    },
    {
      title: 'Last',
      content: 'Last-content',
    },
  ];
  private ui = {
    dateFormat: 'YYYY.MM.DD',
    date: moment(new Date(), 'YYYY.MM.DD'),
  };

  private profile = {
    name: '',
    engName: '',
    phone: () =>
      `${this.tempPhone[0]} + ${this.tempPhone[1]} + ${this.tempPhone[2]}`,
    email: '',
    birth: '',
    job: '',
  };

  private tempPhone: string[] = [];

  private onChange(moment1: number, date: string) {
    this.profile.birth = date;
    moment1 += 1;
  }
}
