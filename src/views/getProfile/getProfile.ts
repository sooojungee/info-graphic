import { Vue, Component, Watch } from 'vue-property-decorator';
import moment from 'moment';
import { debounce } from 'typescript-debounce-decorator';
import _ from 'lodash';

import {
  Auth,
  FirestoreDocument,
  Time,
  FirestoreCollection,
} from '@/vue-common';
import { Profile, Collections } from '@/lib/model';
import {
  BasicData,
  ExperienceData,
  SkillData,
  EducationData,
} from '@/lib/model/profile';

type UrlStatus = 'success' | 'error' | 'validating' | '';

@Component({})
export default class Getbasic extends Vue {
  private formUI = {
    formItemCol: {
      label: { span: 5 },
      wrapper: { span: 12 },
    },
  };
  private form = this.$form.createForm(this);
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
      title: 'Experience',
      content: 'Third-content',
    },
    {
      title: 'checkURL',
      content: 'Last-content',
    },
  ];
  private ui = {
    dateFormat: 'YYYY.MM.DD',
    monthFormat: 'YYYY.MM',
    date: moment(new Date(), 'YYYY.MM.DD'),
  };

  private basic: BasicData = {
    name: '',
    engName: '',
    phone: '',
    email: '',
    // @ts-ignore
    birth: this.ui.date,
    job: '',
  };

  private career: {
    education: {
      list: EducationData[];
      id: number;
    };
    skill: {
      list: string[];
      id: number;
    };
    experience: {
      list: ExperienceData[];
      id: number;
    };
  } = {
    education: {
      list: [],
      id: 0,
    },
    skill: {
      list: [],
      id: 0,
    },
    experience: {
      list: [],
      id: 0,
    },
  };

  private birth: string = '';
  private url: string = '';
  private urlStatus: UrlStatus = '';
  private profile: FirestoreDocument<Profile> = Collections.profiles.create(
    Profile,
  );

  private keydowncheck() {
    if (this.urlStatus !== 'validating') {
      this.urlStatus = 'validating';
    }
  }

  @debounce(500, { leading: false })
  private async test() {
    const value = await Collections.profiles
      .createQuery('url', '==', this.form.getFieldValue('url'))
      .exec(Profile);
    if (this.form.getFieldValue('url').length !== 0) {
      value.length === 0
        ? (this.urlStatus = 'success')
        : (this.urlStatus = 'error');
    } else {
      this.urlStatus = 'error';
    }
  }

  @Watch('current')
  private onCurrentChange(val: number, oldVal: number) {
    if (val === 0) {
      this.createBasicForm();
    } else if (val === 1) {
      this.createCareerForm();
    } else if (val === 2) {
      this.createAdditionalForm();
    } else if (val === 3) {
      this.createUrlForm();
    }
  }

  private handleSubmit(e: any) {
    e.preventDefault();
    this.form.validateFieldsAndScroll((err: any, values: any) => {
      if (!err) {
        if (this.current === 0) {
          this.basic = values;
          this.basic.birth = this.birth;
          this.current += 1;
        } else if (this.current === 1) {
          for (let i = 0; i < values.education.length; i++) {
            this.career.education.list.push({
              name: values.eduNames[i],
              startAt: moment(values.eduMonth[i].d).format(this.ui.monthFormat),
            });
          }
          this.career.skill.list = values.softNames;
          this.current += 1;
        } else if (this.current === 2) {
          for (let i = 0; i < values.experience.length; i++) {
            this.career.experience.list.push({
              name: values.expName[i],
              startAt: moment(values.expStart[i].d).format(this.ui.monthFormat),
              endAt: moment(values.expEnd[i].d).format(this.ui.monthFormat),
              description: values.expDesc[i],
              skill: values.expSelect[i],
            });
          }
          this.current += 1;
        } else if (this.current === 3) {
          this.url = values.url;
          if (this.urlStatus === 'success') {
            this.profile.data.basic = this.basic;
            this.profile.data.educations = this.career.education.list;
            _.forEach(this.career.skill.list, (list) => {
              this.profile.data.skills.push({
                name: list,
                color: '#ffffff',
              });
            });
            this.profile.data.experiences = this.career.experience.list;
            this.profile.data.url = this.url;
            this.profile.saveSync();
            window.location.href = `${window.location.origin}/profile/${
              this.url
            }`;
          }
        }
      }
    });
  }

  private remove(k: any, type: string) {
    const keys = this.form.getFieldValue(type);
    const value: any = {};
    value[type] = keys.filter((key: any) => key !== k);
    this.form.setFieldsValue(value);
  }

  private add(type: string) {
    const keys = this.form.getFieldValue(type);
    // @ts-ignore
    const nextKeys = keys.concat(this.career[type].id);
    // @ts-ignore
    this.career[type].id += 1;
    const value: any = {};
    value[type] = nextKeys;
    this.form.setFieldsValue(value);
  }

  private createBasicForm() {
    this.form = this.$form.createForm(this, {
      mapPropsToFields: () => {
        return {
          name: this.$form.createFormField({
            value: this.basic.name,
          }),
          engName: this.$form.createFormField({
            value: this.basic.engName,
          }),
          email: this.$form.createFormField({
            value: this.basic.email,
          }),
          phone: this.$form.createFormField({
            value: this.basic.phone,
          }),
          job: this.$form.createFormField({
            value: this.basic.job,
          }),
          birth: this.$form.createFormField({
            value: this.basic.birth,
          }),
        };
      },
    });
  }

  private onChange(timemoment: {}, date: string) {
    this.birth = date;
  }

  private createCareerForm() {
    this.form = this.$form.createForm(this);
    this.form.getFieldDecorator('education', {
      initialValue: this.career.education.list,
      preserve: true,
    });
    this.form.getFieldDecorator('skill', {
      initialValue: this.career.skill.list,
      preserve: true,
    });
  }

  private createAdditionalForm() {
    this.form = this.$form.createForm(this);
    this.form.getFieldDecorator('experience', {
      initialValue: this.career.experience.list,
      preserve: true,
    });
  }

  private createUrlForm() {
    this.form = this.$form.createForm(this, {
      mapPropsToFields: () => {
        return {
          url: this.$form.createFormField({
            value: this.url,
          }),
        };
      },
    });
  }

  private created() {
    this.createBasicForm();
    // this.createCareerForm();
    // this.createAdditionalForm();
    // this.createUrlForm();
  }
}
