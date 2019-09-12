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
        }
    },
    methods:{
        onEdit(key,value){
            this.resume[key] = value
        },
        onClickSave() {
            var currentUser = AV.User.current();
            if(!currentUser){
                this.loginVisible = true
            }else{
                this.saveResume()
            }
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