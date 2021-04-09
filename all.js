Vue.component('draggable', vuedraggable)

let app = new Vue({
  el:'#app',
  data:{
    inputTitle:'',
    todoList: JSON.parse(localStorage.getItem('todo')) || [],
    status:'',
    message:[],
  },
  computed:{
    todoListFilter() {
      let filterList = [];
      switch (this.status) {
        case '':
          filterList = this.todoList;
          break;
        case 'undone':
          filterList = this.todoList.filter(item=>!item.completed)
          break;
        case 'done':
          filterList = this.todoList.filter(item=>item.completed)
          break;
      }
      return filterList;
    }
  },
  methods: {
    addList() {
      if(!this.inputTitle) {
        return this.alterMessage('不可空白', 'danger')
      }
      const newList = {
        title:this.inputTitle.trim(),
        completed:false,
        id:Math.floor(Date.now())
      };
      this.todoList.push(newList);
      this.updateLocalStorage();
      this.inputTitle = '';
      this.alterMessage('訊息加入成功', 'success')
    },
    deleteList(id) {
      const vm = this;
      vm.todoList.forEach((item,i)=>{
        if(item.id == id) {
          vm.todoList.splice(i,1);
          vm.alterMessage('訊息刪除成功', 'success')
          vm.updateLocalStorage();
        }
      })
    },
    updateLocalStorage() {
      localStorage.setItem('todo',JSON.stringify(this.todoList));
    },
    alterMessage(title, color) {
      const msg = {
        title,
        timestamp: Math.floor(new Date() / 1000),
        color,
      };
      this.message.push(msg);
      this.messageDelete(msg.timestamp);
    },
    messageDelete(timestamp) {
      const vm = this;
      setTimeout(()=>{
        vm.message.forEach((item,i)=>{
          if(item.timestamp === timestamp) {
            vm.message.splice(i,1)
          }
        })
      }, 1500)
    }
  },
});
