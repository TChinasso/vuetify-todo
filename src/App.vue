<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app color="grey lighten-5">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            Application
          </v-list-item-title>
          <v-list-item-subtitle>
            subtext
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense nav>
        <v-list-item v-for="item in items" :key="item.title" link :to="item.path">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <!--  -->
    </v-navigation-drawer>

    <v-app-bar app absolute color="blue-grey darken-3" dark>
      <template v-slot:img="{ props }">
        <v-img v-bind="props"></v-img>
      </template>

      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-app-bar-title>Todo list</v-app-bar-title>

      <v-spacer></v-spacer>

      <v-btn icon href="https://www.linkedin.com/in/thiago-chinasso-84a458181/" target="_blank">
        <v-icon class="blue--text text--darken-2 text-h3">mdi-linkedin</v-icon>
      </v-btn>

      <v-btn icon href="https://github.com/TChinasso/vuetify-todo" target="_blank">
        <v-icon class="grey--text text--darken-1 text-h3">mdi-github</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main class="grey lighten-2">
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
  export default {
    data: () => ({ 
      drawer: null,
      path: null,
      items: [
          { title: 'Todo', icon: 'mdi-format-list-checks', path: '/' },
          { title: 'About', icon: 'mdi-information-outline', path: 'about' },
        ],
      right: null,
    }),
  }
</script>