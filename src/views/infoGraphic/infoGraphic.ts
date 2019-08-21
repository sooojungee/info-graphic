import { Vue, Component } from 'vue-property-decorator';
import { profile } from '@/lib/file/profile';
import _ from 'lodash';
import * as d3 from 'd3';
import { Numeric } from 'd3';
import { Collections, Profile } from '@/lib/model';
import {
  BasicData,
  ExperienceData,
  SkillData,
  EducationData,
} from '@/lib/model/profile';
import { FirestoreDocument } from '@/vue-common';

const line = d3
  .line()
  // @ts-ignore
  .x((d) => d.x)
  // @ts-ignore
  .y((d) => d.y)
  .curve(d3.curveCatmullRom);

const area = d3
  .area()
  // @ts-ignore
  .x((d) => d.x)
  // @ts-ignore
  .y0((d) => d.y0)
  // @ts-ignore
  .y1((d) => d.y1)
  .curve(d3.curveBasis);

interface LineData {
  name: string;
  data: ExperienceData[];
  lineData: Array<{
    x: number;
    y0: number;
    y1: number;
  }>;
  line: string;
  color: string;
  open: boolean;
}

@Component({})
export default class InfoGraphic extends Vue {
  private profile: FirestoreDocument<Profile> = Collections.profiles.create(
    Profile,
  );
  private colors: string[] = [
    '#EF9A9A',
    '#90CAF9',
    '#FFE082',
    '#C5E1A5',
    '##F48FB1',
    '#80CBC4',
    '#CE93D8',
    '#BDBDBD',
  ];

  private avg: any;
  private graphUI: {
    width: number;
    height: number;
    padding: number;
  } = {
    width: 720,
    height: 200,
    padding: 32,
  };
  private Xtext: Array<{
    x: number;
    y: Numeric;
    year: number;
  }> = [];

  private yearData: Array<{
    year: number;
    data: ExperienceData[];
  }> = [];
  private lineData: {
    [name: string]: LineData;
  } = {};
  private clickedData: [] = [];

  get getLines() {
    return _(this.lineData)
      .mapValues()
      .map((data) => data.line)
      .value();
  }

  private color(name: string) {
    return _(this.profile.data.skills)
      .filter((skill) => skill.name === name)
      .map((data) => data.color)
      .value()[0];
  }

  private sortData(data: any) {
    return _.sortBy(data, (d) => d.startAt);
  }

  private test(lined: LineData) {
    lined.open
      ? d3
          .select(`#type-${lined.name}`)
          .attr('style', `fill: ${lined.color}; opacity: 0.5`)
      : d3.select(`#type-${lined.name}`).attr('style', `fill: ${lined.color}`);
  }

  private test2(lined: LineData) {
    lined.open
      ? d3.select(`#type-${lined.name}`).attr('style', `fill: ${lined.color};`)
      : d3
          .select(`#type-${lined.name}`)
          .attr('style', `fill: ${lined.color}; opacity: 0.5`);
  }

  private test3(lined: LineData) {
    lined.open = !lined.open;
    this.test4();
  }

  private test4() {
    // @ts-ignore
    this.clickedData = _(this.lineData)
      .filter((data) => data.open)
      .map((data) => data.data)
      .flatten()
      .sortBy('startAt')
      .value();
  }

  private async mounted() {
    const value = await Collections.profiles
      .createQuery('url', '==', this.$route.params.pid)
      .exec(Profile);
    this.profile = value[0];
    _.forEach(this.profile.data.skills, (skill, i) => {
      skill.color = this.colors[i];
      this.lineData[skill.name] = {
        name: skill.name,
        data: [],
        lineData: [],
        line: '',
        color: this.colors[i],
        open: true,
      };
    });

    _.forEach(this.profile.data.experiences, (experience) => {
      // @ts-ignore
      this.lineData[experience.skill].data.push(experience);
    });
    const years = _(this.profile.data.experiences)
      .map((experience) => Number(_.split(experience.startAt, '.')[0]))
      .uniq()
      .sortBy()
      .value();
    const maxYear = Number(_.max(years));
    const minYear = Number(_.min(years)) - 1;
    const yCount = maxYear - minYear + 1;

    const yearData: {
      [name: string]: number;
    } = {};
    const tempYearData: {
      [name: string]: number;
    } = {};
    _.forEach(this.profile.data.experiences, (experience) => {
      const year = Number(_.split(experience.startAt, '.')[0]);
      if (_.isNil(yearData[year])) {
        yearData[year] = 1;
      } else {
        yearData[year] += 1;
      }
    });
    const maxValue = Number(_.max(_.values(yearData)));

    const text: Array<{
      x: number;
      year: number;
      y: number;
    }> = [];
    for (let i = 0; i < yCount; i++) {
      this.Xtext.push({
        x: (i * (this.graphUI.width - this.graphUI.padding * 2)) / (yCount - 1),
        y: this.graphUI.height - this.graphUI.padding,
        year: minYear + i,
      });
    }

    _.mapValues(this.lineData, (lineData) => {
      for (let i = 0; i < yCount; i++) {
        if (_.isNil(tempYearData[minYear + i])) {
          tempYearData[minYear + i] = 0;
        }
        const count = _.filter(
          lineData.data,
          (data) => Number(_.split(data.startAt, '.')[0]) === minYear + i,
        ).length;
        lineData.lineData.push({
          x:
            (i * (this.graphUI.width - this.graphUI.padding * 2)) /
            (yCount - 1),
          y0:
            this.graphUI.height -
            this.graphUI.padding * 2 -
            (tempYearData[minYear + i] *
              (this.graphUI.height - this.graphUI.padding * 2)) /
              maxValue,
          y1:
            this.graphUI.height -
            this.graphUI.padding * 2 -
            ((tempYearData[minYear + i] + count) *
              (this.graphUI.height - this.graphUI.padding * 2)) /
              maxValue,
        });
        tempYearData[minYear + i] += count;
      }
      // @ts-ignore
      lineData.line = area(lineData.lineData);
    });
    this.test4();
  }
}
