<template>
  <div class="home d-flex flex-column  fullvh pl-lg-5 pr-lg-5 pt-lg-1">

    <v-text-field class="pa-2 white" v-model="newTaskTitle" @click:append="addTask()" @keyup.enter="addTask()" outlined
      hide-details clearable label="Add new task" append-icon="mdi-plus"></v-text-field>
    <div class="d-flex flex-column justify-space-between fullvh mt-auto" app>
      <v-list class="pt-0 pb-0" flat>
        <div v-for="task in tasks" :key="task.id">
          <v-list-item @click="doneTask(task.id)" :class="{ 'blue lighten-4' : task.done }">
            <template v-slot:default>
              <v-list-item-action>
                <v-checkbox :input-value="task.done" color="primary"></v-checkbox>
              </v-list-item-action>

              <v-list-item-content>
                <v-list-item-title :class="{ 'text-decoration-line-through' : task.done }">{{task.title}}
                </v-list-item-title>
              </v-list-item-content>
              
              <v-list-item-action class="d-flex flex-row">
                <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs"
          v-on="on"
           icon
            @click.stop="showMenu = true">
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
      </template>
      <v-list v-show="showMenu">
        <v-list-item @click.stop="deleteTask(task.id), showMenu = false">
            <v-icon left color="grey lighten-1">mdi-delete-forever</v-icon>
          <v-list-item-title>Delete</v-list-item-title>
        </v-list-item>
        <v-list-item @click.stop="getTaskId(task.id), showMenu = false">
            <v-icon left color="grey lighten-1">mdi-pencil</v-icon>
          <v-list-item-title>Edit</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
              </v-list-item-action>
            </template>
          </v-list-item>
          <v-divider></v-divider>
        </div>

      </v-list>
      <v-overlay
          :absolute="absolute"
          :opacity="opacity"
          :value="overlay"
          light
        >
        <v-card 
          light 
          width="300" 
          @keydown.enter="changeTaskTitle(), overlay = false"
          @keydown.esc="overlay = false"
        >
        <v-card-title>Edit task</v-card-title>
        <v-card-subtitle>Edit the title of this task</v-card-subtitle>
        <v-divider></v-divider>

          <v-text-field autofocus class="ma-2" v-model="taskOnEdit.title">

          </v-text-field>

        <v-divider></v-divider>
        <v-card-actions>
          <v-btn
            color="red darken-1"
            text
            @click="overlay = false"
          >
            Close
          </v-btn>
          <v-btn
            color="green darken-1"
            text
            @click="changeTaskTitle(), overlay = false "
            
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
        </v-overlay>

      <v-alert class=" success ma-1" success :value="alert" color="pink" dark icon="mdi-check"
        transition="scale-transition">
        Task added
      </v-alert>
      <v-alert class=" ma-1" type="error" success :value="deleteAlert" color="pink" dark icon="mdi-check"
        transition="scale-transition">
        Task deleted
      </v-alert>
      <v-alert class=" ma-1" type="error" success :value="titleAlert" color="pink" dark icon="mdi-message-alert"
        transition="scale-transition">
        Please fill the title of the new task
      </v-alert>
    </div>
  </div>
</template>

<script>


export default {
  name: 'Home',
  data () {
    return {
      showMenu: null,
      taskId: '',
      taskOnEdit: '',
      absolute: true,
      opacity: 0.5,
      overlay: false,
      titleAlert: false,
      deleteAlert: false,
      alert: false,
      newTaskTitle: '',
      tasks: [
        {
          id: 1,
          title: 'Wake up',
          done: false
        },
        {
          id: 2,
          title: 'Brush your teeth',
          done: false
        },
        {
          id: 3,
          title: 'Take a coffe',
          done: false
        },
        {
          id: 4,
          title: 'Code',
          done: false
        },
      ]
    }
  },
  components: {

  },
  methods: {
    doneTask(id){
      let task = this.tasks.filter(filteredTask => filteredTask.id === id)
      task[0].done = !task[0].done     
    },
    deleteTask(id){
      let task = this.tasks.filter(filteredTask => filteredTask.id !== id)
      this.tasks = task
      this.taskDeleteAlert()
    },
    addTask(){
      let newTask = {
        id: Date.now(),
        title: this.newTaskTitle,
        done: false
      }
      if(this.newTaskTitle != ''){
        this.tasks.push(newTask)
        this.newTaskTitle = ''
        this.taskAddAlert()
      } else {
        this.blankTitleAlert()
      }
    },
    disableAlert(){
      this.alert = false
    },
    taskAddAlert(){
    this.alert = !this.alert
    setTimeout(() => this.disableAlert(), 2500)
    },
    taskDeleteAlert(){
    this.deleteAlert = !this.deleteAlert
    setTimeout(() => this.deleteAlert = false, 2500)
    },
    blankTitleAlert(){
      this.titleAlert = !this.titleAlert
      setTimeout(() => this.titleAlert = false, 2500)
    },
    getTaskId(id){
      this.overlay = true
      this.taskId = this.tasks.indexOf(this.tasks.filter(filteredTask => filteredTask.id === id)[0])
      this.taskOnEdit = Object.assign({}, this.tasks[this.taskId])
    },
    changeTaskTitle(){
      this.tasks[this.taskId].title = this.taskOnEdit.title
    }
  },
  
}
</script>
<style scoped>
.fullvh{
  height: 100%;
}
</style>