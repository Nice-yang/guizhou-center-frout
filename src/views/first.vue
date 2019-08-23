<template>
    <div>
        <h1>项目1</h1>
        <p @click="clickVersion">{{version}}</p>
    </div>
</template>
<script>
    let counmts = 123;
    import {mapState,mapGetters,mapMutations,mapActions} from 'vuex'
    export default{
        data(){
            return {
                version1:123,
            }
        },
        computed:{
            // let ss = 1234;
            
            ...mapState({ version: state => 1234,}),
            ...mapMutations({
                'User_Name': 'User_Name'
            })
        },
        methods:{
            clickVersion(){
                // this.$store.commit('User_Name',1234  )

            }
        },
        mounted() {
            // this.version(1);
            console.log(this.version ); // 打印出 0
        }
    }
</script>
