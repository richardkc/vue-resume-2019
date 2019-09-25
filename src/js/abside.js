Vue.component('abside',{
    props:['haslogin','instanttitle'],
    template:`
    <aside id="aside">
    <div class="upper">
        <ul class="actions">
            <li><button class="button" @click="$emit('click-save')">保存</button></li>
            <li><button class="button" @click="$emit('on-share')">分享</button></li>
            <li><button class="button" @click="$emit('preview')">预览</button></li>
            <li><button class="button" @click="$emit('print')">打印</button></li>
            <li><button class="button" @click="$emit('skin-picker')">换肤</button></li>
            <li><button class="button" @click="$emit('instant-editing')" :title="instanttitle">即时</button></li>
        </ul>
    </div>
    <div class="down">
        <button class="button" @click.prevent="$emit('onlogin')" v-show="!haslogin">登录</button>
        <button class="button" @click.prevent="$emit('onlogout')" v-show="haslogin">退出登录</button>
    </div>
</aside>
    `
})