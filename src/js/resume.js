Vue.component('resume',{
    props:['mode','displayresume','esckey'],
    methods:{
        addskill(){
            app.resume.skills.push({name:'请填写技能名称',description:'请填写技能描述'})
        },
        removeskill(index){
            app.resume.skills.splice(index,1)
        },
        addproject(){
            app.resume.projects.push({name:'请填写项目名称',link:'请填写链接',keyword:'请填写关键词',description:'请填写详细描述'})
        },
        removeproject(index){
            app.resume.projects.splice(index,1)
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
    <div class="resume">
    <section class="profileAll">
        <h1>
            <editable-span :disabled="mode==='preview'" :value="displayresume.name" @edit="onEdit('name',$event)">
            </editable-span>
        </h1>
        <p>应聘岗位：<editable-span :disabled="mode==='preview'" :value="displayresume.jobTitle"
                @edit="onEdit('jobTitle',$event)"></editable-span>
        </p>
        <p>
            <editable-span :disabled="mode==='preview'" :value="displayresume.birthday"
                @edit="onEdit('birthday',$event)"></editable-span> |
            <editable-span :disabled="mode==='preview'" :value="displayresume.gender" @edit="onEdit('gender',$event)">
            </editable-span> |
            <editable-span :disabled="mode==='preview'" :value="displayresume.email" @edit="onEdit('email',$event)">
            </editable-span> |
            <editable-span :disabled="mode==='preview'" :value="displayresume.phoneNumber"
                @edit="onEdit('phoneNumber',$event)"></editable-span>
        </p>
    </section>
    <section class="skills">
        <h2>技能</h2>
        <ul>
            <li v-for="skill,index in displayresume.skills">
                <editable-span :disabled="mode==='preview'" class="name" :value="skill.name"
                    @edit="onEdit('skills['+index+'].name',$event)"></editable-span>
                <div class="description">
                    <editable-span :disabled="mode==='preview'" :value="skill.description"
                        @edit="onEdit('skills['+index+'].description',$event)">{{skill.description}}
                    </editable-span>
                </div>
                <span class="remove" v-if="index>=4 && mode==='edit'" @click="removeskill">x</span>
            </li>
            <li v-if="mode==='edit'" class="add">
                <span @click="addskill">添加</span>
            </li>
        </ul>
    </section>
    <section class="projects">
        <h2>项目经历</h2>
        <ol>
            <li v-for="project,index in displayresume.projects">
                <header>
                    <div class="start">
                        <h3 class="name">
                            <editable-span :disabled="mode==='preview'" :value="project.name"
                                @edit="onEdit('projects['+index+'].name',$event)"></editable-span>
                        </h3>
                        <span class="link">
                            <editable-span :disabled="mode==='preview'" :value="project.link"
                                @edit="onEdit('projects['+index+'].link',$event)"></editable-span>
                        </span>
                    </div>
                    <div class="end">
                        <span class="keywords">
                            <editable-span :disabled="mode==='preview'" :value="project.keyword"
                                @edit="onEdit('projects['+index+'].keyword',$event)"></editable-span>
                        </span>
                    </div>
                </header>
                <p class="description">
                    <editable-span :disabled="mode==='preview'" :value="project.description"
                        @edit="onEdit('projects['+index+'].description',$event)"></editable-span>
                </p>
                <span class="remove" v-if="index>=2 && mode==='edit'" @click="removeproject">x</span>
            </li>
            <li v-if="mode==='edit'" class="add">
                <span @click="addproject">添加</span>
            </li>
        </ol>
    </section>
        <div class="exitPreview && mode==='preview'" v-if="esckey"
            @click="$emit('exit')" v-cloak>
            <button>退出预览</button>
        </div>
    </div>
    `
})