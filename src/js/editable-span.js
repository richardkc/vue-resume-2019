Vue.component('editable-span',{
    props:['value','disabled','instanteditingvisible'],
    template:`
    <span class="editableSpan" :key="instanteditingvisible">
        <span contenteditable="!instanteditingvisible" v-show="!editing">{{value}}</span>
        <input v-show="editing" type="text" :value="value" @input="triggerEdit">
        <button v-if="!disabled && !instanteditingvisible" @click="editing = !editing">edit</button>
    </span>
    `,
    data(){
        return{
            editing: false
        }
    },
    methods:{
        triggerEdit(e){
            this.$emit('edit',e.target.value)
        }
    }
})