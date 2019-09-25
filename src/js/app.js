let app = new Vue({
    el: '#app',
    data(){
        return{
        instantEditingVisible: false,
        editing: false,
        loginVisible: false,
        signUpVisible: false,
        shareVisible: false,
        escKey: false,
        skinPickerVisible: false,
        instantTitle:'再次点击按钮可退出即时模式',
        imgUrl:'',
        imageUrl:'',
        previewUser:{
            objectId: undefined
        },
        currentUser:{
            objectId:undefined,
            email:'',
        },
        previewResume:{
            url: '',
            name: '姓名',
            jobTitle: '前端工程师',
            infos: [
                {name:'信息名',description:'信息'},
                {name:'信息名',description:'信息'},
                {name:'信息名',description:'信息'}
            ],
            skills: [
                {name:'技能'},
                {name:'技能'},
                {name:'技能'}
            ],
            fits: [
                {name:'填写优势项'},
                {name:'填写优势项'},
                {name:'填写优势项'}
            ],
            educationTime: '年限',
            educationCollege: '院校 专业',
            educationContent: [
                {name: '添加说明'}
            ],
            items: [
                {name:'项目名称',link:'项目链接',content:'项目说明'}
            ],
            experiences: [
                {name:'社团名称',job:'担任职位',content:'社团经历'}
            ]
        },
        resume:{
            url: '',
            name: '姓名',
            jobTitle: '前端工程师',
            infos: [
                {name:'信息名',description:'信息'},
                {name:'信息名',description:'信息'},
                {name:'信息名',description:'信息'}
            ],
            skills: [
                {name:'技能'},
                {name:'技能'},
                {name:'技能'}
            ],
            fits: [
                {name:'填写优势项'},
                {name:'填写优势项'},
                {name:'填写优势项'}
            ],
            educationTime: '年限',
            educationCollege: '院校 专业',
            educationContent: [
                {name: '添加说明'}
            ],
            items: [
                {name:'项目名称',link:'项目链接',content:'项目说明'}
            ],
            experiences: [
                {name:'社团名称',job:'担任职位',content:'社团经历'}
            ]
        },
        shareLink:'',
        mode: 'edit', //'preview'
    }
    },
    created() {  //全局监听键盘事
        var _this = this;
        document.onkeydown = function (e) {
            let key = window.event.keyCode;
            if (key === 81) {
                _this.escControl();
            }
        }
    },
    mounted(){

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
        imgClick(){
            let file = document.querySelector('div.resume .keyMessage .inputImg')
            file.click()
        },
        chooseFile(){
            let filedom = document.querySelector('div.resume .keyMessage .inputImg')
            let image = document.querySelector('div.resume .keyMessage .image')
            let file = filedom.files[0]
            let fileExt = filedom.files[0].name.replace(/.+\./, "").toLowerCase()
            if(file.size>1024*1024*5){
                alert('图片大小不能超过5M')
            }else{
                let imgurl = window.URL.createObjectURL(file)
                image.setAttribute('src',imgurl)
                this.imUrl = imgurl
            }

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
            console.log(user)
            this.currentUser.objectId = user.objectId
            this.currentUser.email = user.email

            var query = new AV.Query('_User');
            query.equalTo('title', '图片');
            query.exists('image');
            query.include('image');
            query.find().then((imgs) => {
                imgs.forEach((img) => {
                    var image = img.get('image');
                    image.forEach((image) => {
                        this.resume.url = this.imageUrl = image.get('url')
                    });
                });
            }).then(()=> {
                let imgdom = document.querySelector('.resume .keyMessage .picture img')
                if (this.imageUrl) {
                    this.resume.url = imgdom.src = this.imageUrl
                    let {objectId} = AV.User.current().toJSON()
                    var user = AV.Object.createWithoutData('User',objectId);
                    user.set('resume', this.resume);
                    user.save()
                    window.location.reload()
                } else {
                    imgdom.src = './img/resume.gif'
                }
            })


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
            user.set('title', '图片');
            user.add('image', file);
            user.save().then(() => {
                alert('保存成功')
            },() => {
                alert('保存失败')
            })

            let filedom = document.querySelector('div.resume .keyMessage .inputImg')
            if (filedom.files.length) {
                var localFile = filedom.files[0];
                var file = new AV.File('resume.jpg', localFile);
            }
            file.save().then(function (file) {
                console.log('文件保存完成');
            }, function (error) {
                console.log('图片保存失败')
            })
            // let _User = AV.Object.extend('Todo');
            // let User = new _User();
            // User.set('image', '图片');
            // attachments 是一个 Array 属性
            // User.add('attachments', file);
            // User.save();
        },
        getResume(user) {
            var query = new AV.Query('User');
            return query.get(user.objectId).then((user) => {
                let resume = user.toJSON().resume
                if(resume){
                    return resume
                }else{
                    return this.resume
                }
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
        instantEditing(){
            if(this.instantEditingVisible === false){
                alert('使用即时模式数据将不会被永久保存！')
            }
            this.instantEditingVisible = !this.instantEditingVisible
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

setTimeout(() => {
    let imgdom = document.querySelector('.resume .keyMessage .picture img')
    if (app.resume.url) {
        imgdom.src = app.resume.url
    } else {
        imgdom.src = './img/resume.gif'
    }
},100)






// document.querySelector('.resume').addEventListener('click',() => {
//     app.editing = flase
//     console.log(app.editing)
// })


