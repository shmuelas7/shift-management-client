<template>
    <form @submit.prevent="submitForm">
        <div class="form-control" :class="{invalid:!firstName.isValid}">
            <label for = "firstname" >First name</label>
            <input type="text" id="firstname" v-model.trim="firstName.val" @blur="clearValidity('firstName')"/>
            <p v-if="!firstName.isValid">First name must not be empty.</p>
        </div>
        <div class="form-control" :class="{invalid:!lastName.isValid}">
            <label for = "lastname">Last name</label>
            <input type="text" id="lastname" v-model.trim="lastName.val" @blur="clearValidity('lastName')"/>
            <p v-if="!lastName.isValid">Last name must not be empty.</p>
        </div>
        <div class="form-control" :class="{invalid:!phoneNumber.isValid}">
            <label for = "phone"> Phone number</label>
            <input type="text" id="phone" v-model.trim="phoneNumber.val" @blur="clearValidity('phoneNumber')"/>
            <p v-if="!phoneNumber.isValid">Phone number not valid.</p>
        </div>
        <button>login</button>
    </form>
</template>

<script>
import axios from "axios";
export default{
    data(){
        return {
            firstName:{
                val:'',
                isValid:true
            },
            lastName:{
                val:'',
                isValid:true
            },
            phoneNumber:{
                val:'',
                isValid:true
            },
            formIsValid:true,
        };
    },
    methods:{
        clearValidity(input){
            this[input].isValid= true;
            console.log(this[input].isValid);
        },


        validateForm(){
            this.formIsValid=true;
            if(this.firstName.val===''){
                this.firstName.isValid=false;
                this.formIsValid=false;
            }
            if(this.lastName.val===''){
                this.lastName.isValid=false;
                this.formIsValid=false;
            }
            if(this.phoneNumber.val==='' || this.phoneNumber.val.length!== 10){
                console.log(this.phoneNumber.val.length)
                this.phoneNumber.isValid=false;
                this.formIsValid=false;
            }


        },
        async submitForm(){
            this.validateForm();
            if(this.formIsValid){
                try {
                    const res= await axios.post("http://localhost:3001/users/login", {
                    firstName:this.firstName.val,
                    lastName:this.lastName.val,
                    phone: this.phoneNumber.val,             
                    });
            console.log(res);
            this.$store.state.userId = res.data._id;
            this.$router.push('/main');
            
    }catch(err){
        console.log(err.message);
    }

    }},
}
};
</script>


<style scoped>


form {
  margin: 0.5rem auto;
  max-width: 30rem;
  min-height: 20rem;
  
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 1rem;
  background-color: #ffffff;
}

.form-control {
  margin: 2.2rem 0;
 
}

.form-control.invalid input {
  border-color: red;
}

.form-control.invalid label {
  color: red;
}

label {
  font-weight: bold;
  
}






button {
  border: 1px solid #0076bb;
  background-color: #0076bb;
  color: white;
  cursor: pointer;
  width: 100%;
font-size: 30px;
  border-radius: 30px;
}

button:hover,
button:active {
  border-color: #002350;
  background-color: #002350;
}
</style>