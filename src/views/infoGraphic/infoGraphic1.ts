import { Vue, Component } from 'vue-property-decorator';
import { profile, ExperienceData } from '@/lib/file/profile';
import _ from 'lodash';
import * as d3 from 'd3';
import { Numeric } from 'd3';

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

  .y0(200 - 64)
  // @ts-ignore
  .y1((d) => d.y)
  .curve(d3.curveCatmullRom);

@Component({})
export default class InfoGraphic extends Vue {
  private profile = profile;
  private colors: string[] = [
    '#EF5350',
    '#42A5F5',
    '#FFCA28',
    '#9CCC65',
    '#EC407A',
    '#26A69A',
    '#AB47BC',
    '#BDBDBD',
  ];

  private avg: any;
  private graphUI: {
    width: number;
    height: number;
    padding: number;
  } = {
    width: 1000,
    height: 200,
    padding: 32,
  };
  private Xtext: Array<{
    x: number;
    y: Numeric;
    year: number;
  }> = [];

  private years: string[] = [];
  private line: string = '';
  private lineData: {
    [name: string]: {
      name: string;
      data: ExperienceData[];
      lineData: Array<{
        x: number;
        y: number;
      }>;
      line: string;
      color: string;
      open: boolean;
    };
  } = {};
  get getExperience() {
    return _.filter(this.profile.experience, (p) => p.major);
  }

  get getLines() {
    return _(this.lineData)
      .mapValues()
      .map((data) => data.line)
      .value();
  }

  private openSoftware(name: string) {
    const a = d3.selectAll('.data-graph');
    a.remove();
    _.mapValues(this.lineData, (lineData) => {
      if (lineData.name === name) {
        d3.select(`#experienceZone`)
          .append('path')
          .attr('key', `#type-${name}`)
          .attr(
            'style',
            `fill: ${lineData.color}; opacity: 1;
          };`,
          )
          .attr('id', `#type-${name}`)
          .attr('class', 'data-graph')
          .attr('d', lineData.line);
      } else {
        d3.select(`#experienceZone`)
          .append('path')
          .attr('key', `#type-${name}`)
          .attr(
            'style',
            `fill: ${lineData.color}; opacity: 0.3;
          };`,
          )
          .attr('id', `#type-${name}`)
          .attr('class', 'data-graph')
          .attr('d', lineData.line)
          .raise();
      }
    });
  }

  private mounted() {
    _.forEach(this.profile.software, (software, i) => {
      this.lineData[software.name] = {
        name: software.name,
        data: [],
        lineData: [],
        line: '',
        color: this.colors[i],
        open: false,
      };
    });

    // this.lineData.other = {
    //   name: 'other',
    //   data: [],
    //   lineData: [],
    //   line: '',
    //   color: 'rgba(0,0,0,0)',
    //   open: false,
    // };

    _.forEach(this.profile.experience, (experience) => {
      // if (experience.software.length === 0) {
      //   this.lineData.other.data.push(experience);
      // } else {
      _.forEach(experience.software, (software) => {
        this.lineData[software].data.push(experience);
      });
      // }
    });

    const counts = _(this.lineData)
      .mapValues((data) => Number(data.data.length))
      .values()
      .value();
    const maxCount = Number(_.max(counts));
    const minCount = _.min(counts);

    const years = _(this.profile.experience)
      .map((experience) => Number(_.split(experience.startAt, '.')[0]))
      .uniq()
      .sortBy()
      .value();
    const maxYear = Number(_.max(years));
    const minYear = Number(_.min(years));
    const yCount = maxYear - minYear + 1;

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

    _.forEach(this.lineData, (lineData) => {
      const name = lineData.name;
      for (let i = 0; i < yCount; i++) {
        const count = _.filter(
          lineData.data,
          (data) => Number(_.split(data.startAt, '.')[0]) === minYear + i,
        ).length;
        this.lineData[name].lineData.push({
          x:
            (i * (this.graphUI.width - this.graphUI.padding * 2)) /
            (yCount - 1),
          y:
            this.graphUI.height -
            2 * this.graphUI.padding -
            (this.graphUI.height * count) / maxCount,
        });
      }
      // @ts-ignore
      this.lineData[lineData.name].line = area(this.lineData[name].lineData);
    });

    // this.svg = d3.select('#experience-zone')

    // const yearData: {
    //   [name: string]: number;
    // } = {};
    // _.forEach(this.profile.experience, (experience) => {
    //   const year = Number(_.split(experience.startAt, '.')[0]);
    //   if (_.isNil(yearData[year])) {
    //     yearData[year] = 1;
    //   } else {
    //     yearData[year] += 1;
    //   }
    // });
    // const maxValue = _.max(_.values(yearData));

    // _.forEach(this.profile.experience, (experience) => {
    //   //
    // });

    // const data: any = [];
    // for (let i = 0; i < count; i++) {
    //   if (!_.isNil(lineData[Number(min) + i])) {
    //     data.push({
    //       x:
    //         this.graphUI.padding +
    //         ((this.graphUI.width - this.graphUI.padding) * i) / count,
    //       y:
    //         this.graphUI.height -
    //         this.graphUI.padding -
    //         (lineData[Number(min) + i] * this.graphUI.height -
    //           this.graphUI.padding) /
    //           (_.max(_.values(lineData)) + 1),
    //     });
    //   }
    // }

    // @ts-ignore
    // this.line = line(data);
  }
}
