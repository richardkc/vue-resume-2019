Vue.component('bubble',{
    props:['username'],
    template:`
    <div class="bubble">
        <div class="welcome">
            欢迎你 {{username}}
            <div class="triangle"></div>
        </div>
    </div>
    `
})