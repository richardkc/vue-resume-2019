Vue.component('skin-picker',{
    methods:{
        setTheme(name){
            document.querySelector('main').className = name
        }
    },
    template:`
    <div class="skinPicker" v-cloak>
        <button class="button" @click="setTheme('default')">默认</button>
        <button class="button" @click="setTheme('lightGrey')">浅灰</button>
        <button class="closeSkinPicker" @click="$emit('close')">x</button>
    </div>
    `
})