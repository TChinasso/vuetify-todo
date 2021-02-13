<template>
  <div class="home d-flex flex-column  fullvh">

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
              <v-list-item-action>
                <v-btn icon @click.stop="deleteTask(task.id)">
                  <v-icon color="primary lighten-1">mdi-delete-forever</v-icon>
                </v-btn>
              </v-list-item-action>
            </template>
          </v-list-item>
          <v-divider></v-divider>
        </div>

      </v-list>

      <v-alert class=" success ma-1" success :value="alert" color="pink" dark icon="mdi-check"
        transition="scale-transition">
        Task added
      </v-alert>
      <v-alert class=" ma-1" type="error" success :value="deleteAlert" color="pink" dark icon="mdi-check"
        transition="scale-transition">
        Task deleted
      </v-alert>
    </div>
  </div>
</template>

<script>


export default {
  name: 'Home',
  data () {
    return {
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
        id: this.tasks.length + 1,
        title: this.newTaskTitle,
        done: false
      }
      this.tasks.push(newTask)
      this.newTaskTitle = ''
      this.taskAddAlert()
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
    }
  },
  
}
</script>
<style scoped>
.fullvh{
  height: 100%;
}
</style>