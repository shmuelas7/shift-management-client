<template>
    <div id="app">
      <h1>Shift Management System</h1>
      <div v-for="(shift, day) in shifts" :key="day">
        <h2>{{ day }}</h2>
        <ul>
          <li v-for="time in shift.shifts" :key="time.start">
            {{ time.start }} - {{ time.end }}
          </li>
        </ul>
        <button @click="editShifts(day)">Edit Shifts</button>
      </div>
    </div>
  </template>
  
  <script>
import axios from 'axios';

export default {
  data() {
    return {
      data: [],
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
        try{
            this.data= await axios.get('https://api.example.com/data') 
        }
        catch(err){
            console.log(err);
        }
  },
};
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  
  </style>