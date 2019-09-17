let app = new Vue({
    el: '#app',
    data:{
        loginVisible: false,
        signUpVisible: false,
        resume:{
            name:'姓名',
            gender:'男',
            birthday:'1997年08月',
            jobTitle:'前端工程师',
            email:'XXXXXX@xxx.com',
            phoneNumber:'xxxxxxxxxxx'
        },
        login:{
            email:'',
            password:''
        },
        signUp:{
            name:'',
            email:'',
            password:''
        }
    },
    methods:{
        onEdit(key,value){
            this.resume[key] = value
        },
        onLogin(e) {
            AV.User.loginWithEmail(this.login.email, this.login.password).then(function (user) {
                console.log(user)
            }, function (error) {
                if(error.code === 211){
                    alert('用户不存在')
                }else if(error.code === 210){
                    alert('用户名和密码不匹配')
                }
            });
        },
        onSignUp(e) {
            const user = new AV.User();
            user.setUsername(this.signUp.name);
            user.setPassword(this.signUp.password);
            user.setEmail(this.signUp.email);
            user.signUp().then(function (user) {
                AV.User.logOut()
            }, function (error) {
            });
        },
        onClickSave() {
            let currentUser = AV.User.current();
            if(!currentUser){
                this.loginVisible = true
            }else{
                this.saveResume()
            }
        },
        saveResume(){
            let {id} = AV.User.current()
            var user = AV.Object.createWithoutData('User',id);
            user.set('resume', this.resume);
            user.save();
        }
    }
})

/*
var User = AV.Object.extend('User');
var user = new User();
user.set('title', '马拉松报名');
user.set('priority', 2);
user.save().then(function (todo) {
    console.log('保存成功。objectId：' + todo.id);
}, function (error) {
});*/