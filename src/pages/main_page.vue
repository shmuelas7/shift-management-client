<template>
    <div>
        <form @submit.prevent="submitForm">
            <h3>Enter a date</h3>
        <div class="form-control">
            <label for = "day" >day</label>
            <input type="number" id="day" min="1" max="7" step="1" v-model="day.val"/>
        </div>
        <div class="form-control" >
            <label for = "startHour">start hour</label>
            <input type="number" id="startHour" min="1" max="24" step="1" v-model="startHour.val" />
        </div>
        <div class="form-control">
            <label for = "endHour"> end hour</label>
            <input type="number" min="1" max="24" step="1" id="endHour" v-model="endHour.val"/>
        </div>
        <p v-if="!this.formIsValid">the end date must be bigger from thr start day</p>
        <button>send</button>
    </form>
    </div>
</template>






<script>
import axios from 'axios'



export default {
data(){
    return{
        list:[],
        day:{
                val:0,
                isValid:true
            },
            startHour:{
                val:0,
                isValid:true
            },
            endHour:{
                val:0,
                isValid:true
            },
            formIsValid:true,
            
    }
},
  mounted(){
    this.getData();
  },
  methods:{
   async getData(){
        try{
          const res=await axios.get("http://localhost:3001/gardList/list")
          console.log(res.data);
        }catch(err){console.log(err.message)}
    },
    validateForm(){
        if(this.startHour>=this.endHour)
        this.formIsValid=false;
    },
    async submitForm(){
        if(!this.formIsValid)
            return false;
         const res = await axios.post("http://localhost:3001/gardList/addGard",{
            id:this.$store.state.userId,
            day: this.day.val,
            startHour:this.startHour.val,
            endHour:this.endHour.val,
    })
         console.log(res);

  },
  }
}
</script>
<style scoped>

div{  flex-direction: row;}
form {
  
  margin: 0.5rem auto;
  max-width: 10rem;
  
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 2rem;
  background-color: #ffffff;
}

.form-control {
  margin: 0.2rem 0;
  
}



label {
  font-weight: bold;
}


input{
    width: 100%;
   
}



button {
  border: 1px solid #0076bb;
  background-color: #0076bb;
  color: white;
  cursor: pointer;
width: 100%;
  border-radius: 30px;
}

button:hover,
button:active {
  border-color: #002350;
  background-color: #002350;
}
</style>