window.App={
    props:['mode','login','onclicksave','onshare','islogout','rootresume','exitkey','printing'],
    template:`
    <div>
        <abside v-show="$emit('abside-visible')" @click-save="onclicksave" @on-share="onshare" @print="print" 
        @preview="$emit('preview1')" @skin-picker="$emit('skin-pick')" @onlogin="$emit('on-login')" 
        @onlogout="islogout" :haslogin="login"></abside>
        <main class="default">
            <resume :displayresume="rootresume" :mode="mode" :esckey="exitkey"
                @exit="$emit('is-exit')"></resume>
        </main>
    </div>
    `
}
Vue.component('app',window.App)