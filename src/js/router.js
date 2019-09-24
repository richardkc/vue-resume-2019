
const routes = [
  { path: '/', component: window.App },
  { path: '/login',component: window.Login},
  { path: '/signUp',component: window.SignUp}
]


const router = new VueRouter({
  routes: routes
})


const root = new Vue({
  router,
  data(){
    return{
        loginVisible: false,
        signUpVisible: false,
        shareVisible: false,
        escKey: false,
        skinPickerVisible: false,
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

        shareLink:'',
        mode: 'edit', //'preview'
    }
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
            this.getResume(this.currentUser).then((resume) => {this.resume = resume})
        }
    }
},
methods:{
    shareVisibleClose(){
        shareVisible=false
    },
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
            //result = app.resume
            //keys = ['kills','0','name']
            //i=0 result = result['skills'] = app.resume.skills
            //i=1 result = result['0'] = app.resume.skills.0
            //i=2 result = result['0'] = app.resume.skills.0.name
            //result = app.resume['skill']['0']['name']
        }
    },
    onShare(){
        if(this.hasLogin()){
            this.shareVisible=true
        }else{
            alert('请先登录')
        }
    },
    hasLogin(){
        return this.currentUser.objectId
    },
    onlogin(user){
        this.currentUser.objectId = user.objectId
        this.currentUser.email = user.email
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
        location.href = location.origin + location.pathname
        window.location.reload()
        alert('注销成功')
    },
    escControl(e){
        this.escKey = !this.escKey
    },
    print(){
        window.print()
    },
    checkDisplayResume(){
        if(previewResume){
            return previewResume
        }else{
            return resume
        }
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
    }
}
}).$mount('#root')
