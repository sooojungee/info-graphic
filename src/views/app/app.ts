import { Vue, Component } from 'vue-property-decorator';
declare module 'vue/types/vue' {
  interface Vue {
    $app: App;
  }
}
@Component({})
export default class App extends Vue {

}
