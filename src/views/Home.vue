<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
  </div>
</template>

<script>
import { Component, Vue } from "vue-property-decorator";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src

// @Component({
//   components: {
//     HelloWorld
//   }
// })
export default{
  components: {
    HelloWorld
  },
  data(){
    return {
      list:['first','second','thrid']
    }
  },
  methods:{
    changePage(item){
      this.$router.push(`/${item}`)
    }
  }
}
// export default class Home extends Vue {}
</script>
