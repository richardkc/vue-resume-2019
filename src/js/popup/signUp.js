Vue.component('sign-up',{
    data(){
        return{
            signUp:{
                name:'',
                email:'',
                password:''
            }
        }
    },
    methods:{
        onSignUp(e) {
            const user = new AV.User();
            user.setUsername(this.signUp.name);
            user.setPassword(this.signUp.password);
            user.setEmail(this.signUp.email);
            user.signUp().then(function (user) {
                AV.User.logOut()
                alert('注册成功，请登录')
            }, function (error) {
                alert(error.rawMessage)
            });
        }
    },
    template:`
    <div class="signUp" v-cloak>
        <button class="closeSignUp" @click="$emit('close')">关闭</button>
        <form class="form" @submit.prevent="onSignUp">
            <h4>注册</h4>
            <div class="row">
                <label>昵称</label>
                <input type="text" v-model="signUp.name">
            </div>
            <div class="row">
                <label>邮箱</label>
                <input type="text" v-model="signUp.email">
            </div>
            <div class="row">
                <label>密码</label>
                <input type="text" v-model="signUp.password">
            </div>
            <div class="row">
                <button type="submit" @click="$emit('close')">提交</button>
                <button><a href="#" @click="$emit('gotologin')">登陆</a></button>
            </div>
        </form>
    </div>
    `
})