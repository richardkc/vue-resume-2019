Vue.component('login',{
    data(){
        return {
            login:{
                email:'',
                password:''
            }
        }
    },
    methods:{
        onLogin(e) {
            AV.User.loginWithEmail(this.login.email, this.login.password).then((user) => {
                user = user.toJSON()
                this.$emit('login',user)
            }, (error) => {
                if(error.code === 211){
                    alert('用户不存在')
                }else if(error.code === 210){
                    alert('用户名和密码不匹配')
                }
            });
        }
    },
    template:`
        <div class="login" v-cloak>
                <button class="closeLogin" @click="$emit('close')">关闭</button>
                <form class="form" @submit.prevent="onLogin" >
                    <h4>登录</h4>
                    <div class="row">
                        <label>邮箱</label>
                        <input type="text" v-model="login.email">
                    </div>
                    <div class="row">
                        <label>密码</label>
                        <input type="text" v-model="login.password">
                    </div>
                    <div class="row">
                        <button type="submit" @click="$emit('close')">提交</button>
                        <a href="#" @click="$emit('goto-signup')">注册</a>
                    </div>
                </form >
        </div >
`
})