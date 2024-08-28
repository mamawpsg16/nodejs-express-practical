<template>
    <h2 for="Login" class="pb-2">Registration Form</h2>
    <form class="p-4 border rounded shadow-sm" @submit.prevent="submitForm">
        <div class="mb-3">
            <label for="username" class="form-label">Username</label>
            <Input type="text" v-model="form.username" @input="inputValidator('username','form', ['required', 'minLength', 'maxLength'])" id="username" minlength="5" maxlength="15" autocomplete="username" class="form-control" placeholder="Enter username" required/>
            <div class="text-danger" v-if="errors.username && errors.username.length">
                <template v-for="(error, index) in errors.username" :key="index">
                        <span :class="{'d-block': errors.username[index--]}">{{ error }}</span>
                </template>
            </div>
        </div>
        <div class="mb-3">
            <label for="email" class="form-label">Email address</label>
            <Input type="email" v-model="form.email" @input="inputValidator('email','form', ['required', 'email', 'maxLength'])"  id="email" autocomplete="email" class="form-control" placeholder="Enter email" required/>
            <div class="text-danger" v-if="errors.email && errors.email.length">
                <template v-for="(error, index) in errors.email" :key="index">
                        <span :class="{'d-block': errors.email[index--]}">{{ error }}</span>
                </template>
            </div>
        </div>
        <div class="mb-3">
            <label for="new-password" class="form-label">Password</label>
            <Input type="password" v-model="form.password"  @input="inputValidator('password','form', ['required', 'minLength', 'maxLength'])" class="form-control" id="new-password" minlength="8" maxlength="20"  placeholder="Enter password" autocomplete="new-password" required/>
            <div class="text-danger" v-if="errors.password && errors.password.length">
                <template v-for="(error, index) in errors.password" :key="index">
                        <span :class="{'d-block': errors.password[index--]}">{{ error }}</span>
                </template>
            </div>
        </div>
        <div class="mb-3">
            <label for="confirm-password" class="form-label">Confirm Password</label>
            <Input type="password" v-model="form.confirm_password" @input="inputValidator('confirm_password','form', ['required', 'sameAsPassword'])" class="form-control" id="confirm-password"  placeholder="Enter confirm password" autocomplete="new-password" required/>
            <div class="text-danger" v-if="errors.confirm_password && errors.confirm_password.length">
                <template v-for="(error, index) in errors.confirm_password" :key="index">
                        <span :class="{'d-block': errors.confirm_password[index--]}">{{ error }}</span>
                </template>
            </div>
        </div>
        
        <button type="submit" class="btn btn-primary form-control mt-2">Register</button>
    </form>
</template>

<script>
import { useVuelidate } from '@vuelidate/core'
import { required, email, sameAs, minLength, maxLength  } from '@vuelidate/validators'
import Input from '@/components/Form/Input.vue'
import callOptimization from '@/utils/request-optimizer/callOptimization';
import { checkInputValidity } from '@/utils/validation/vuelidate.js';
import apiClient from '@/utils/http/axios.js';
    export default {
        setup () {
            return { v$: useVuelidate({ $autoDirty: true }) }
        },
        data(){
            return{
                form:{
                    email:null,
                    password:null,
                    username:null,
                    confirm_password:null,
                },
                errors:{
                    email:{},
                    password:{},
                    username:{},
                    confirm_password:{},
                },
                formValidations:{
                    username:['required', 'minLength', 'maxLength'],
                    email:['required', 'email'],
                    password:['required', 'minLength', 'maxLength'],
                    confirm_password:['required', 'sameAsPassword'],
                }
            }
        },
        validations () {
            return {
                form: {
                    username: { required  , minLength: minLength(5), maxLength: maxLength(15)},
                    email: { required, email },
                    password: { required, minLength: minLength(8), maxLength: maxLength(20)},
                    confirm_password: { required, sameAsPassword: sameAs(this.form.password)},
                }
            }
        },
        components:{
            Input
        },
        

        methods:{
            inputValidator: callOptimization.debounce(function(dataProperty, parentProperty = null, validations = []){
                this.errors[dataProperty] = [];
                this.errors[dataProperty] = checkInputValidity(this.v$, dataProperty, parentProperty, validations);
            }, 500),


            async submitForm () {
                const isFormValid = await this.v$.$validate()
                 // Update errors for all fields
                if(!isFormValid) {
                    Object.keys(this.formValidations).forEach(field => {
                        this.errors[field] = checkInputValidity(this.v$, field, 'form', this.formValidations[field])
                    });
                    return;
                }

                try {
                    const response = await apiClient.post('/register',{ ...this.form })
                    this.v$.$reset()
                    if(response.status == 200) {
                        this.$router.push('/login');
                    }
                } catch (error) {
                    console.log(error, "error");
                    this.errors = error.response.data.errors;
                }

            }
        }
    }
</script>