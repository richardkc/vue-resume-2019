let app = new Vue({
    el: '#app',
    data:{
        loginVisible: false,
        signUpVisible: false,
        shareVisible: false,
        escKey: false,
        previewUser:{
            objectId: undefined
        },
        currentUser:{
            objectId:undefined,
            email:''
        },
        previewResume:{
            name:'姓名',
            gender:'男',
            birthday:'1997年08月',
            jobTitle:'前端工程师',
            email:'XXXXXX@xxx.com',
            phoneNumber:'xxxxxxxxxxx',
            skills:[
                {name: '请填写技能名称',description:'请填写技能描述'},
                {name: '请填写技能名称',description:'请填写技能描述'},
                {name: '请填写技能名称',description:'请填写技能描述'},
                {name: '请填写技能名称',description:'请填写技能描述'}
            ],
            projects:[
                {name:'请填写项目名称',link:'请填写链接',keyword:'请填写关键词',description:'请填写详细描述'},
                {name:'请填写项目名称',link:'请填写链接',keyword:'请填写关键词',description:'请填写详细描述'}

            ]
        },
        resume:{
            name:'姓名',
            gender:'男',
            birthday:'1997年08月',
            jobTitle:'前端工程师',
            email:'XXXXXX@xxx.com',
            phoneNumber:'xxxxxxxxxxx',
            skills:[
                {name: '请填写技能名称',description:'请填写技能描述'},
                {name: '请填写技能名称',description:'请填写技能描述'},
                {name: '请填写技能名称',description:'请填写技能描述'},
                {name: '请填写技能名称',description:'请填写技能描述'}
            ],
            projects:[
                {name:'请填写项目名称',link:'请填写链接',keyword:'请填写关键词',description:'请填写详细描述'},
                {name:'请填写项目名称',link:'请填写链接',keyword:'请填写关键词',description:'请填写详细描述'}

            ]
        },
        login:{
            email:'',
            password:''
        },
        signUp:{
            name:'',
            email:'',
            password:''
        },
        shareLink:'',
        mode: 'edit' //'preview'
    },
    created() {  //全局监听键盘事件
        var _this = this;
        document.onkeydown = function (e) {
            let key = window.event.keyCode;
            if (key === 81) {
                _this.escControl();
            }
        }
    },
    computed:{
        displayResume(){
            return this.mode === 'preview' ? this.previewResume : this.resume
        }
    },
    watch:{
        'currentUser.objectId': function(newValue,oldValue){
            if(newValue){
                this.getResume(this.currentUser)
            }
        }
    },
    methods:{
        onEdit(key,value){
            let regex = /\[(\d+)\]/g
            key = key.replace(regex,(match,number) => `.${number}`)
            keys = key.split('.')
            let result = this.resume
            for(let i=0; i<keys.length; i++){
                if(i===keys.length-1){
                    result[keys[i]] = value
                }else{
                    result = result[keys[i]]
                }
                //result = this.resume
                //keys = ['kills','0','name']
                //i=0 result = result['skills'] = this.resume.skills
                //i=1 result = result['0'] = this.resume.skills.0
                //i=2 result = result['0'] = this.resume.skills.0.name
                //result = this.resume['skill']['0']['name']
            }
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
        getResume(user) {
            var query = new AV.Query('User');
            return query.get(user.objectId).then((user) => {
                let resume = user.toJSON().resume
                return resume
            },(error) => {
                console.log(error)
            })
        },
        onLogout(e){
            AV.User.logOut()
            window.location.reload()
            alert('注销成功')
        },
        addskill(){
            this.resume.skills.push({name:'请填写技能名称',description:'请填写技能描述'})
        },
        removeskill(index){
            this.resume.skills.splice(index,1)
        },
        addproject(){
            this.resume.projects.push({name:'请填写项目名称',link:'请填写链接',keyword:'请填写关键词',description:'请填写详细描述'})
        },
        removeproject(index){
            this.resume.projects.splice(index,1)
        },
        escControl(e){
            this.escKey = !this.escKey
        },
        print(){
            window.print()
        }
    }
})

//获取当前用户
let currentUser = AV.User.current()
if (currentUser) {
    app.currentUser = currentUser.toJSON()
    app.shareLink = location.origin + location.pathname + '?user_id=' + app.currentUser.objectId
    app.getResume(app.currentUser).then((resume) => {
        app.resume = resume
    })
}        

let search = location.search
let regex = /user_id=([^&]+)/
let matches = search.match(regex)
if (matches) {
    let userId = matches[1]
    app.mode = 'preview'
    app.getResume({objectId: userId}).then((resume) => {
        app.previewResume = resume
    })
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