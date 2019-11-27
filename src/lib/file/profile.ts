interface ExperienceData {
  name: string;
  description: string;
  startAt: string;
  endAt: string;
  skill: string[];
}

interface BasicData {
  name: string;
  engName: string;
  job: string;
  birth: string;
  email: string;
  phone: string;
}

// @ts-ignore
interface SkillData {
  name: string;
  color: string;
}

interface EducationData {
  name: string;
  startAt: string;
}

const profile = {
  data: {
    basic: {
      name: '이수정',
      engName: 'Soojung Lee',
      job: 'Developer',
      birth: '1997.08.28',
      email: 'sooojungee@gmail.com',
      phone: '010-9739-9749',
    },
    skills: [
      {
        name: 'Java',
        color: '#fff',
      },
      {
        name: 'JavaScript',
        color: '#fff',
      },
      {
        name: 'TypeScript',
        color: '#fff',
      },
      {
        name: 'C',
        color: '#fff',
      },
    ],
    educations: [
      {
        name: '아주대학교 미디어학과 입학',
        startAt: '2016.03',
      },
      {
        name: '아주대학교 미디어학과 졸업',
        startAt: '2021.02',
      },
    ],
    experiences: [
      {
        name: 'SmileGate-Assetbank',
        description:
          'SmileGate의 게임 애셋들을 관리하고 볼 수 있는 사이트 개발',
        startAt: '2018.12',
        endAt: '2019.08',
        skill: 'JavaScript',
      },
      {
        name: 'samsung-summarizeNote-web',
        description: '회의 데이터를 시각화 및 대시보드를 사용한 회의 관리',
        startAt: '2019.03',
        endAt: '2019.06',
        skill: 'TypeScript',
      },
      {
        name: 'paper-summarizer',
        description: '사용자가 업로드한 논문을 분석한 후 시각화하여 보여줌',
        startAt: '2019.03',
        endAt: '2019.06',
        skill: 'TypeScript',
      },
      {
        name: 'BrawlGame',
        description: '자바 소켓을 활용하여 다른 사람들과 함께 할 수 있는 게임',
        startAt: '2018.03',
        endAt: '2018.04',
        skill: 'Java',
      },
      {
        name: 'IEEE Visualization',
        description:
          '음악차트 데이터를 시각화하여 사용자가 원하는 차트를 볼 수 있도록 함',
        startAt: '2018.04',
        endAt: '2018.04',
        skill: 'JavaScript',
      },
      {
        name: 'IEEE Visualization1',
        description:
          '1음악차트 데이터를 시각화하여 사용자가 원하는 차트를 볼 수 있도록 함',
        startAt: '2016.04',
        endAt: '2016.04',
        skill: 'C',
      },
    ],
  },
};
export { profile, ExperienceData, BasicData, SkillData, EducationData };
