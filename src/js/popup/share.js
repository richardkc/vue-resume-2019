Vue.component('share',{
    props:['link'],
    template:`
    <div v-cloak>
    <div class="share">
            <button @click="$emit('close')">x</button>
            <h3>
                请复制地址链接分享
            </h3>
            <div>
                <textarea>{{link}}</textarea>
            </div>
        </div>
    </div>
    `
})