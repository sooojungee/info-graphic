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
          <a-form :form="form"
                  @submit="handleSubmit">
            <a-form-item label="이름 (한글)"
                         :label-col="formUI.formItemCol.label"
                         :wrapper-col="formUI.formItemCol.wrapper">
              <a-input v-decorator="[
              'name',
                {
                  rules: [{
                    type: 'string', message: '이름 (한글)을 입력해주세요.'
                  }, {
                    required: true, message: '이름 (한글)을 입력해주세요.',
                  }]
                }
              ]" />
            </a-form-item>
            <a-form-item label="이름 (영문)"
                         :label-col="formUI.formItemCol.label"
                         :wrapper-col="formUI.formItemCol.wrapper">
              <a-input v-decorator="[
                'engName',
                {
                  rules: [{
                     pattern: '^[a-zA-Z]*$', message: '영문을 입력하세요',
                  }, {
                    required: true, message: '이름 (영문)을 입력하세요',
                  }]
                }
              ]" />
            </a-form-item>
            <a-form-item label="전화 번호"
                         :label-col="formUI.formItemCol.label"
                         :wrapper-col="formUI.formItemCol.wrapper">
              <a-input v-decorator="[
                'phone',
                {
                  rules: [{
                    type: 'string', required: true, message: '전화번호를 입력해주세요'
                  }]
                }
              ]" />
            </a-form-item>
            <a-form-item label="이메일"
                         :label-col="formUI.formItemCol.label"
                         :wrapper-col="formUI.formItemCol.wrapper">
              <a-input v-decorator="[
                'email',
                {
                  rules: [{
                    type: 'email', message: '이메일을 입력해주세요',
                  }, {
                    required: true, message: 'Please input your E-mail!',
                  }]
                }
              ]" />
            </a-form-item>
            <a-form-item label="직업"
                         :label-col="formUI.formItemCol.label"
                         :wrapper-col="formUI.formItemCol.wrapper">
              <a-input v-decorator="[
                'job',
                {
                  rules: [{
                     type: 'string', message: '직업을 입력하세요',
                  }, {
                    required: true, message: 'Please input your job!',
                  }]
                }
              ]" />
            </a-form-item>
            <a-form-item label="생년 월일"
                         :label-col="formUI.formItemCol.label"
                         :wrapper-col="formUI.formItemCol.wrapper">
              <a-date-picker @change="onChange"
                             :format="ui.dateFormat"
                             v-decorator="[
                            'birth',
                            {
                              rules: [{
                                type: 'object', required: true, message: '날짜를 선택하세요',
                              }]
                            }]" />
            </a-form-item>
            <a-form-item>
              <a-button type="primary"
                        html-type="submit">
                Next
              </a-button>
            </a-form-item>
          </a-form>
        </div>
        <div v-if="current === 1">
          <a-form :form="form"
                  @submit="handleSubmit">
            <div>Education</div>
            <a-form-item v-for="(k) in form.getFieldValue('education')"
                         :key="`${k}+education`"
                         :required="false">
              <a-form-item label="해당 년월"
                           :label-col="formUI.formItemCol.label">
                <a-month-picker :format="ui.monthFormat"
                                v-decorator="[
                            `eduMonth[${k}]`,
                            {
                              rules: [{
                                type: 'object', required: true, message: '날짜를 선택하세요',
                              }]
                            }]" />
              </a-form-item>
              <a-form-item label="교육"
                           :label-col="formUI.formItemCol.label">
                <a-input v-decorator="[
                `eduNames[${k}]`,
                {
                  validateTrigger: ['change', 'blur'],
                  rules: [{
                    required: true,
                    whitespace: true,
                    message: 'Please input passenger\'s name or delete this field.',
                  }],
                }]"
                         placeholder="ex) 아주대학교 미디어학과 입학"
                         style="width: 60%;" />
                <a-icon class="dynamic-delete-button"
                        type="minus-circle-o"
                        @click="remove(k, 'education')" />
              </a-form-item>
            </a-form-item>
            <!-- <a-form-item v-for="(k) in form.getFieldValue('education')"
                         :key="`${k}+education+ddd`"
                         :required="false">
              <a-input v-decorator="[
                `eduNames[${k}]`,
                {
                  validateTrigger: ['change', 'blur'],
                  rules: [{
                    required: true,
                    whitespace: true,
                    message: 'Please input passenger\'s name or delete this field.',
                  }],
                }]"
                       placeholder="passenger name"
                       style="width: 60%;" />
            </a-form-item> -->
            <!-- <a-input-group compact
                           v-for="(k) in form.getFieldValue('education')"
                           :key="`${k}+education`"
                           :required="false">
              <a-form-item :name="`${k}+edu+month`">
                <a-month-picker :format="ui.monthFormat"
                                v-decorator="[
                            `eduMonth[${k}]`,
                            {
                              rules: [{
                                type: 'object', required: true, message: '날짜를 선택하세요',
                              }]
                            }]" />
              </a-form-item>
              <a-from-item :name="`${k}+edu+name`">
                <a-input v-decorator="[
                `eduNames[${k}]`,
                {
                  validateTrigger: ['change', 'blur'],
                  rules: [{
                    required: true,
                    whitespace: true,
                    message: 'Please input passenger\'s name or delete this field.',
                  }],
                }]"
                         placeholder="passenger name"
                         style="width: 60%;" />
              </a-from-item>
              <a-form-item :name="`${k}+edu+delete`">
                <a-button @click="remove(k, 'education')"
                          icon="delete" />
              </a-form-item>
            </a-input-group> -->

            <!-- <a-form-item v-for="(k) in form.getFieldValue('education')"
                         :key="`${k}+education`"
                         :required="false">
              <a-input-group compact>
                <a-month-picker :format="ui.monthFormat"
                                v-decorator="[
                            `eduMonth[${k}]`,
                            {
                              rules: [{
                                type: 'object', required: true, message: '날짜를 선택하세요',
                              }]
                            }]" />
                <a-input v-decorator="[
                `eduNames[${k}]`,
                {
                  validateTrigger: ['change', 'blur'],
                  rules: [{
                    required: true,
                    whitespace: true,
                    message: 'Please input passenger\'s name or delete this field.',
                  }],
                }]"
                         placeholder="passenger name"
                         style="width: 60%;" />
                <a-button @click="remove(k, 'education')"
                          icon="delete" />
              </a-input-group>
            </a-from-item> -->
            <a-form-item :label-col="formUI.formItemCol.label"
                         :wrapper-col="formUI.formItemCol.wrapper">
              <a-button type="dashed"
                        style="width: 60%"
                        @click="add('education')">
                <a-icon type="plus" /> Add Education
              </a-button>
            </a-form-item>
            <v-divider></v-divider>
            <div>skill</div>
            <!-- <div style="display: inline"> -->
            <a-form-item v-for="(k) in form.getFieldValue('skill')"
                         :key="`${k}+skill`"
                         label="Skill"
                         :label-col="formUI.formItemCol.label">
              <!-- <a-input-group compact> -->
              <a-input v-decorator="[
                `softNames[${k}]`,
                {
                  validateTrigger: ['change', 'blur'],
                  rules: [{
                    required: true,
                    whitespace: true,
                    message: 'Please input passenger\'s name or delete this field.',
                  }],
                }
              ]"
                       placeholder="passenger name"
                       style="width: 40%;" />
              <a-icon class="dynamic-delete-button"
                      type="minus-circle-o"
                      @click="() => remove(k, 'skill')"
                      icon="delete" />
              <!-- </a-input-group> -->
            </a-form-item>
            <!-- </div> -->
            <a-form-item :label-col="formUI.formItemCol.label"
                         :wrapper-col="formUI.formItemCol.wrapper">
              <a-button type="dashed"
                        style="width: 60%"
                        @click="add('skill')">
                <a-icon type="plus" /> Add skill
              </a-button>
            </a-form-item>
            <a-form-item>
              <a-button class="mr-3"
                        @click="current -= 1">
                Previous
              </a-button>
              <a-button type="primary"
                        html-type="submit">
                Next
              </a-button>
            </a-form-item>
          </a-form>
        </div>
        <div v-if="current === 2">
          <a-form :form="form"
                  @submit="handleSubmit">
            <a-form-item v-for="(k) in form.getFieldValue('experience')"
                         :key="`${k}+experience`"
                         :required="true">
              <a-form-item label="주제"
                           :label-col="formUI.formItemCol.label"
                           :wrapper-col="formUI.formItemCol.wrapper">
                <a-input v-decorator="[
              `expName[${k}]`,
                {
                  rules: [{
                    required: true, message: '주제를 입력해주세요',
                  }]
                }
              ]" />
              </a-form-item>
              <a-form-item label="설명"
                           :label-col="formUI.formItemCol.label"
                           :wrapper-col="formUI.formItemCol.wrapper">
                <a-input v-decorator="[
              `expDesc[${k}]`,
                {
                  rules: [{
                    required: false, message: '설명을 입력해주세요',
                  }]
                }
              ]" />
              </a-form-item>
              <a-form-item label="시작 년월"
                           :label-col="formUI.formItemCol.label"
                           :wrapper-col="formUI.formItemCol.wrapper">
                <a-month-picker :format="ui.monthFormat"
                                v-decorator="[
                            `expStart[${k}]`,
                            {
                              rules: [{
                                type: 'object', required: true, message: '날짜를 선택하세요',
                              }]
                            }]" />
              </a-form-item>
              <a-form-item label="종료 년월"
                           :label-col="formUI.formItemCol.label"
                           :wrapper-col="formUI.formItemCol.wrapper">
                <a-month-picker :format="ui.monthFormat"
                                v-decorator="[
                            `expEnd[${k}]`,
                            {
                              rules: [{
                                type: 'object', required: true, message: '날짜를 선택하세요',
                              }]
                            }]" />
              </a-form-item>
              <a-form-item label="스킬"
                           :label-col="formUI.formItemCol.label"
                           :wrapper-col="formUI.formItemCol.wrapper">
                <a-select style="width: 95px;"
                          v-decorator="[
                  `expSelect[${k}]`,
                  {
                    rules: [{
                      required: true, message:'선택되지 않았습니다.'
                    }]
                  }]">
                  <a-select-option v-for="(skill, i) in career.skill.list"
                                   :key="`${i} + experience-skill +${k}`"
                                   :value="skill">{{skill}}</a-select-option>
                </a-select>
                <a-icon class="dynamic-delete-button"
                        type="minus-circle-o"
                        @click="remove(k, 'experience')" />
              </a-form-item>
            </a-form-item>
            <a-button type="dashed"
                      style="width: 60%"
                      @click="add('experience')">
              <a-icon type="plus" /> Add Experience
            </a-button>
            <a-form-item class="py-3">
              <a-button class="mr-3"
                        @click="current -=1">
                Previous
              </a-button>
              <a-button type="primary"
                        html-type="submit">
                Next
              </a-button>
            </a-form-item>
          </a-form>
        </div>
        <div v-if="current === 3">
          <a-form :form="form"
                  @submit="handleSubmit">
            <a-form-item class="my-4 py-4"
                         :label-col="formUI.formItemCol.label"
                         :wrapper-col="formUI.formItemCol.wrapper"
                         label="url"
                         has-feedback
                         :validate-status="urlStatus"
                         :help="urlStatus === 'error'? '다른 url을 사용해주세요': ''">
              <a-input @keyup="test"
                       @keydown="keydowncheck"
                       v-decorator="['url',
                {
                  rules: [{
                    type: 'string', required: true, message: 'url (주소)을 입력해주세요.',
                  }]
                }
              ]" />

            </a-form-item>
            <a-form-item>
              <a-button class="mr-3"
                        @click="current -=1">
                Previous
              </a-button>
              <a-button type="primary"
                        html-type="submit">
                Submit
              </a-button>
            </a-form-item>
          </a-form>
        </div>
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

.dynamic-delete-button {
  cursor: pointer;
  position: relative;
  top: 4px;
  font-size: 24px;
  color: #999;
  padding-left: 40px;
  transition: all 0.3s;
}
.dynamic-delete-button:hover {
  color: #777;
}
</style>