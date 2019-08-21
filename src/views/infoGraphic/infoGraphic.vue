<template>
  <v-container class="info-graphic-container">
    <v-layout class="py-2 title-zone">
      <v-spacer></v-spacer>
      <v-flex class="title-info">
        <div class="display-1 text-center"> {{profile.data.basic.engName}} </div>
        <div class="py-1 title font-weight-light text-center"> {{profile.data.basic.job}}</div>
      </v-flex>
      <v-spacer></v-spacer>
    </v-layout>
    <v-layout class="pt-4 pb-4">
      <v-flex xs12
              md6
              px-4>
        <v-layout style="height: 40px;">
          <div class="title pb-2"> Basic Info</div>
        </v-layout>
        <v-flex>
          <div class="py-1 body-2 font-weight-medium"> <span class="font-weight-medium mr-2">Name</span> {{profile.data.basic.name}} </div>
          <div class="py-1"><span class="font-weight-medium mr-1">Phone </span> {{profile.data.basic.phone}}</div>
          <div class="py-1"><span class="font-weight-medium"
                  style="margin-right: 13px;">Birth </span> {{profile.data.basic.birth}}</div>
          <div class="py-1"><span class="font-weight-medium mr-2">Email </span> {{profile.data.basic.email}}</div>
        </v-flex>
      </v-flex>
      <v-flex xs12
              md6
              px-4>
        <v-layout style="height: 40px;">
          <div class="title pb-2"> Education </div>
        </v-layout>
        <v-flex>
          <div class="py-1"
               v-for="education in profile.data.educations"
               :key="education.name"> <b>{{education.startAt}}</b> {{education.name}}</div>
        </v-flex>
      </v-flex>
    </v-layout>
    <v-layout column
              class="pt-4 pb-2"
              style="border-top: 1px solid #ddd">
      <v-flex xs12
              md4
              px-4>
        <v-layout column>

          <div class="title pb-2"> skill & Work Experience</div>
          <div class="skill-zone">
            <div class="skill-box"
                 v-for="(skill, i) in profile.data.skills"
                 :key="`${skill.name}+'${i}'`">
              <div class="donut-box"
                   :style="{background: skill.color}"></div>
              <div class="subheading pl-1 pr-2 font-weight-medium"
                   style="line-height: 20px;"> {{skill.name}} </div>
            </div>
          </div>
          <svg id="experienceZone"
               :style="{width: graphUI.width + 'px', height: graphUI.height + 'px'}">
            <path :class="`data-graph`"
                  :id="`type-${line.name}`"
                  v-for="line in lineData"
                  :key="`${line.name}`"
                  @mouseenter="test(line)"
                  @mouseleave="test2(line)"
                  @click="test3(line)"
                  :style="{fill: line.color, opacity: line.open? 1 : 0.5}"
                  :d="line.line"></path>
            <text v-for="text in Xtext"
                  :key="`${text.x} + ${text.y}`"
                  :y="text.y"
                  :x="text.x"> {{text.year}}</text>
          </svg>
          <v-layout style="width: 90%;">
            <v-flex>
              <div class="work-zone"
                   v-for="data in clickedData"
                   :key="`${data.name} + data`">
                <div class="name-zone">
                  <div class="tile"
                       :style="{background: color(data.skill)}"></div>
                  <div class="name"> <span class="pr-2 font-weight-medium date">{{data.startAt}} - {{data.endAt}}</span> {{data.name}}</div>
                </div>
                <div class="desc-zone"> {{data.description}}</div>
              </div>
            </v-flex>
          </v-layout>

        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script src="./infoGraphic.ts"/>

<style lang="scss" scoped>
.d-flex {
  display: flex;
}

.info-graphic-container {
  width: 860px;
  min-height: 100vh;
  padding: 32px 64px;
  background: #f8f8f8;
  // overflow-y: auto;
  .title-zone {
    width: 100%;
    height: 120px;
    // background: red;
    border-bottom: 1px solid #ddd;
    .title-info {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
  }
}

.experience-zone {
  width: 400px;
  height: 200px;
}

.skill-zone {
  display: flex;
  .skill-box {
    display: flex;
    height: 30px;
    cursor: pointer;
    margin: 12px 32px 8px 0;
    .donut-box {
      width: 18px;
      height: 18px;
      position: relative;
      border-radius: 50%;
      overflow: hidden;
      .chart-center {
        position: absolute;
        border-radius: 50%;
        top: 36px;
        left: 36px;
        width: 16px;
        height: 16px;
        background: white;
      }
    }
  }
}

.text-center {
  text-align: center;
}

.data-graph {
  stroke-width: 3px;
  fill: none;
  stroke: #f8f8f8;
  // stroke: rgb(99, 139, 220);
}

.work-zone {
  .name-zone {
    display: flex;
    width: 100%;
    height: 10px;
    .tile {
      width: 10px;
      height: 10px;
      border-radius: 50%;
    }
    .name {
      margin-top: -4px;
      padding-left: 16px;
    }
  }
  .desc-zone {
    width: 100%;
    margin-left: 4px;
    border-left: 2px solid #ccc;
    padding: 16px 0 16px 18px;
    white-space: pre-wrap;
    word-break: break-all;
  }
}

.work-data {
  padding-bottom: 30px;
  .name-zone {
    height: 24px;
    // padding: 3px 0;
    .date {
      max-width: 60px;
    }
    .color-tile {
      border-radius: 50%;
      margin: 4px 4px 4px 0;
      max-width: 10px;
      max-height: 10px;
      background: black;
    }
  }
}
</style>