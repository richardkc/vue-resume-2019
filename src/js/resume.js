Vue.component('resume',{
    props:['mode','displayresume','esckey','instant'],
    methods:{
        addInfo(){
            app.resume.infos.push({name:'信息名',description:'信息'})
        },
        removeInfo(){
            app.resume.infos.pop()
        },
        addSkill(){
            app.resume.skills.push({name:'技能'})
        },
        removeSkill(){
            app.resume.skills.pop()
        },
        addFit(){
            app.resume.fits.push({name:'填写优势项'})
        },
        removeFit(){
            app.resume.fits.pop()
        },
        addEducationContent(){
            app.resume.educationContent.push({name:'添加说明'})
        },
        removeEducationContent(){
            app.resume.educationContent.pop()
        },
        addItem(){
            app.resume.items.push({name:'项目名称',link:'项目链接',content:'项目说明'})
        },
        removeItem(){
            app.resume.items.pop()
        },
        addExperience(){
            app.resume.experiences.push({name:'社团名称',job:'担任职位',content:'社团经历'})
        },
        removeExperience(index){
            app.resume.experiences.splice(index,1)
        },
        onEdit(key,value){
            let regex = /\[(\d+)\]/g
            key = key.replace(regex,(match,number) => `.${number}`)
            keys = key.split('.')
            let result = app.resume
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
        }
    },
    template:`
    <div>
    <div class="twig"></div>
    <div class="resume">
        <div class="keyMessage">
            <div class="picture">
                <img src="./resume.jpg" alt="#">
            </div>
            <div class="name">
            <editable-span :instanteditingvisible="instant" class="bigFont boldFont" :disabled="mode==='preview'" :value="displayresume.name" @edit="onEdit('name',$event)"></editable-span>
            <br>
                <span class="boldFont">意向岗位：</span>
                <editable-span :instanteditingvisible="instant" :disabled="mode==='preview'" :value="displayresume.jobTitle" @edit="onEdit('jobTitle',$event)"></editable-span>
            </div>
            <div class="info">
                <span class="bigFont boldFont">基本信息</span>
                <hr>
                <ul>
                    <li class="clearfix" v-for="info,index in displayresume.infos">
                        <editable-span :instanteditingvisible="instant" class="boldFont left" :disabled="mode==='preview'" :value="info.name" @edit="onEdit('infos['+index+'].name',$event)"></editable-span>
                        <editable-span :instanteditingvisible="instant" class="right" :disabled="mode==='preview'" :value="info.description" @edit="onEdit('infos['+index+'].description',$event)"></editable-span>
                    <li>
                </ul>
                <span class="remove" v-if="mode==='edit'" @click="removeInfo"><button>删除</button></span>
                <button v-if="mode==='edit'" class="add" @click="addInfo">添加</button>
            </div>
            <div class="skills">
                <span class="bigFont boldFont">技能</span>
                <hr>
                <ul class="clearfix">
                    <li class="left" v-for="skill,index in displayresume.skills">
                        <editable-span :instanteditingvisible="instant" class="boldFont" :disabled="mode==='preview'" :value="skill.name" @edit="onEdit('skills['+index+'].name',$event)"></editable-span>
                    </li>
                </ul>
                <button v-if="mode==='edit'" class="add" @click="addSkill">添加</button>
                <span class="remove" v-if="mode==='edit'" @click="removeSkill"><button>删除</button></span>
            </div>
            <div class="fits">
                <span class="bigFont boldFont">岗位匹配</span>
                <hr>
                <ul>
                    <li class="clearfix" v-for="fit,index in displayresume.fits">
                        <div class="boldFont left">·</div>
                        <editable-span :instanteditingvisible="instant"  class="right" :disabled="mode==='preview'" :value="fit.name" @edit="onEdit('fits['+index+'].name',$event)"></editable-span>
                    </li>
                </ul>
                <button v-if="mode==='edit'" class="add" @click="addFit">添加</button>
                <span class="remove" v-if="mode==='edit'" @click="removeFit"><button>删除</button></span>
            </div>
        </div>
        <div class="allExperience">
            <div class="education">
                <div class="case clearfix">
                    <div class="bigFont boldFont left">教育背景</div>
                    <div class="bigFont boldFont right">EDUCATION</div>
                </div>
                <hr>
                <div class="both case clearfix">
                    <div class="boldFont left">
                        <editable-span :instanteditingvisible="instant" :disabled="mode==='preview'" :value="displayresume.educationTime" @edit="onEdit('educationTime',$event)"></editable-span>
                    </div>
                    <div class="boldFont right">
                    <editable-span :instanteditingvisible="instant" :disabled="mode==='preview'" :value="displayresume.educationCollege" @edit="onEdit('educationCollege',$event)"></editable-span>
                    </div>
                </div>
                <div class="content" v-for="content,index in displayresume.educationContent">
                    <editable-span :instanteditingvisible="instant" :disabled="mode==='preview'" :value="content.name" @edit="onEdit('educationContent['+index+'].name',$event)"></editable-span>
                </div>
                <span class="remove" v-if="mode==='edit'" @click="removeEducationContent"><button>删除</button></span>
                <button v-if="mode==='edit'" class="add" @click="addEducationContent">添加</button>
            </div>
            <div class="items">
                <div class="case clearfix">
                    <div class="bigFont boldFont left">个人项目</div>
                    <div class="bigFont boldFont right">ITEMS</div>
                </div>
                <hr>
                <div class="clearfix" v-for="item,index in displayresume.items">
                    <div class="both case clearfix">
                        <div class="boldFont left">
                            <editable-span :instanteditingvisible="instant" :disabled="mode==='preview'" :value="item.name" @edit="onEdit('items['+index+'].name',$event)"></namee-span>
                        </div>
                        <div class="boldFont right">
                            <editable-span :instanteditingvisible="instant" :disabled="mode==='preview'" :value="item.link" @edit="onEdit('items['+index+'].link',$event)"></editable-span>
                        </div>
                    </div>
                    <div class="content">
                        <editable-span :instanteditingvisible="instant" :disabled="mode==='preview'" :value="item.content" @edit="onEdit('items['+index+'].content',$event)"></editable-span>
                    </div>
                </div>
                <span class="remove" v-if="mode==='edit'" @click="removeItem"><button>删除</button></span>
                <button v-if="mode==='edit'" class="add" @click="addItem">添加</button>
            </div>
            <div class="experience">
                <div class="case clearfix">
                    <div class="bigFont boldFont left">社团经历</div>
                    <div class="bigFont boldFont right">EDUCATION</div>
                </div>
                <hr>
                <div class="clearfix" v-for="experience,index in displayresume.experiences">
                    <div class="both case clearfix">
                        <div class="boldFont left">
                            <editable-span :instanteditingvisible="instant" :disabled="mode==='preview'" :value="experience.name" @edit="onEdit('experiences['+index+'].name',$event)"></namee-span>
                        </div>
                        <div class="boldFont right">
                            <editable-span :instanteditingvisible="instant" :disabled="mode==='preview'" :value="experience.job" @edit="onEdit('experiences['+index+'].job',$event)"></editable-span>
                        </div>
                    </div>
                    <div class="content">
                        <editable-span :instanteditingvisible="instant" :disabled="mode==='preview'" :value="experience.content" @edit="onEdit('experiences['+index+'].content',$event)"></editable-span>
                    </div>
                </div>
                <span class="remove" v-if="mode==='edit'" @click="removeExperience"><button>删除</button></span>
                <button v-if="mode==='edit'" class="add" @click="addExperience">添加</button>
            </div>
        </div>
        </div>
        </div>
    `
})