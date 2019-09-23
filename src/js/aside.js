Vue.component('app-aside',{
    props:['haslogin'],
    template:`
    <aside id="aside">
    <div class="upper">
            <ul class="actions">
                <li><button class="button" @click="$emit('click-save')">保存</button></li>
                <li><button class="button" @click="$emit('share')">分享</button></li>
                <li><button class="button" @click="$emit('preview')">预览</button></li>
                <li><button class="button" @click="$emit('print')">打印</button></li>
                <li><button class="button" @click="$emit('skin-picker')>换肤</button></li>
            </ul>
        </div>
        <div class="down">
            <button class="button" @click.prevent="$emit('login')" v-show="!haslogin">登录</button>
            <button class="button" @click.prevent="$emit('on-logout')" v-show="haslogin">退出登录</button>
        </div>
    </aside>
    `
})

/*        <app-aside  v-show="mode !== 'preview'" @click-save="onClickSave" @share="onShare" @preview="mode='preview'" 
        @print="print" @skin-picker="skinPickerVisible=!skinPickerVisible" @login="loginVisible = true" @on-logout="onLogout" :haslogin="hasLogin">
        </app-aside>*/