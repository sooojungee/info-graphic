<template>
  <v-container class="get-profile-container">
    <div>
      <a-steps :current="current">
        <a-step v-for="item in steps"
                :key="item.title"
                :title="item.title" />
      </a-steps>
      <div class="steps-content py-3">
        <div v-if="current === 0">
          <a-form-item label="이름"
                       :label-col="{ span: 5 }"
                       :wrapper-col="{ span: 12 }">
            <a-input v-model="profile.name" />
          </a-form-item>
          <a-form-item label="이름(영문)"
                       :label-col="{ span: 5 }"
                       :wrapper-col="{ span: 12 }">
            <a-input v-model="profile.engnName" />
          </a-form-item>
          <a-form-item label="전화 번호"
                       :label-col="{ span: 5 }"
                       :wrapper-col="{ span: 12 }">
            <v-layout>
              <a-input v-model="tempPhone[0]" />
              <div class="px-3"
                   style="line-height: 30px;"> - </div>
              <a-input v-model="tempPhone[1]" />
              <div class="px-3"
                   style="line-height: 30px;"> - </div>
              <a-input v-model="tempPhone[2]" />
            </v-layout>
          </a-form-item>
          <a-form-item label="이메일"
                       :label-col="{ span: 5 }"
                       :wrapper-col="{ span: 12 }">
            <a-input v-model="profile.email" />
          </a-form-item>
          <a-form-item label="직업"
                       :label-col="{ span: 5 }"
                       :wrapper-col="{ span: 12 }">
            <a-input v-model="profile.job" />
          </a-form-item>
          <a-form-item label="생년 월일"
                       :label-col="{ span: 5 }"
                       :wrapper-col="{ span: 12 }">
            <a-date-picker @change="onChange"
                           :format="ui.dateFormat"
                           :defaultValue="ui.date" />
          </a-form-item>
        </div>
        <div v-if="current === 1">
          <div class="education-zone">
            <div> Education </div>
            <div v-for="i in 2"
                 :key="i">
              <a-input-group compact>
                <a-month-picker />
                <a-input style="width: 50%"
                         defaultValue="input content" />
              </a-input-group>
            </div>
            <a-button type="dashed"
                      block>Dashed</a-button>
          </div>
          <div class="skill-zone">
            <div> skills</div>
          </div>
        </div>
      </div>
      <div class="steps-action">
        <v-spacer></v-spacer>
        <a-button v-if="current>0"
                  @click="current -= 1">
          Previous
        </a-button>
        <a-button v-if="current < steps.length - 1"
                  type="primary"
                  style="margin-left: 8px"
                  @click="current += 1">
          Next
        </a-button>
        <a-button v-if="current == steps.length - 1"
                  type="primary"
                  style="margin-left: 8px"
                  @click="$message.success('Processing complete!')">
          Done
        </a-button>
      </div>
    </div>
  </v-container>
</template>

<script src="./getProfile.ts"/>
<style lang="scss" scoped>
.get-profile-container {
  width: 1000px;
  height: 100vh;
  padding: 32px 64px;
  background: #f8f8f8;
}

.steps-content {
  width: 100%;
  min-height: 360px;
  max-height: calc(100vh - 160px);
  // background: #fff;
}

.steps-action {
  display: flex;
  justify-content: flex-end;
}
</style>