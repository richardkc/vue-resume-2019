let app = new Vue({
    el: '#app',
    data:{
        loginVisible: false,
        signUpVisible: false,
        currentUser:{
            objectId:undefined,
            email:''
        },
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
        hasLogin(){
            return this.currentUser.objectId
        },
        onLogin(e) {
            AV.User.loginWithEmail(this.login.email, this.login.password).then((user) => {
                user = user.toJSON()
                this.currentUser.objectId = user.objectId
                this.currentUser.email = user.email
            }, (error) => {
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
                alert('注册成功，请登录')
            }, function (error) {
                alert(error.rawMessage)
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
            let {objectId} = AV.User.current().toJSON()
            var user = AV.Object.createWithoutData('User',objectId);
            user.set('resume', this.resume);
            user.save().then(() => {
                alert('保存成功')
            },() => {
                alert('保存失败')
            })
        },
        getResume() {
            var query = new AV.Query('User');
            query.get(this.currentUser.objectId).then(function (user) {
                let resume = user.toJSON().resume
                this.resume = resume
            })
        },
        onLogout(e){
            AV.User.logOut()
            window.location.reload()
            alert('注销成功')
        }
    }
})

let currentUser = AV.User.current()
if(currentUser){
    app.currentUser = currentUser.toJSON()
    app.getResume()
}

/*
var User = AV.Object.extend('User');
var user = new User();
user.set('title', '马拉松报名');
user.set('priority', 2);
user.save().then(function (todo) {
    console.log('保存成功。objectId：' + todo.id);
}, function (error) {
});*/