<template>
    <h2 for="Login" class="pb-2">Login Form</h2>
    <form class="p-4 border rounded shadow-sm" @submit.prevent="submitForm">
        <div class="mb-3">
            <label for="email" class="form-label">Email address</label>
            <Input type="email" v-model="form.email" @input="inputValidator('email','form', ['required', 'email'])"  id="email" autocomplete="email" class="form-control" placeholder="Enter email" />
            <div class="text-danger" v-if="errors.email && errors.email.length">
                <template v-for="(error, index) in errors.email" :key="index">
                        <span :class="{'d-block': errors.email[index--]}">{{ error }}</span>
                </template>
            </div>
        </div>
        <div class="mb-3">
            <label for="new-password" class="form-label">Password</label>
            <Input type="password" v-model="form.password"  @input="inputValidator('password','form', ['required', 'minLength', 'maxLength'])" class="form-control" id="new-password" minlength="8" maxlength="20"  placeholder="Enter password" autocomplete="new-password" />
            <div class="text-danger" v-if="errors.password && errors.password.length">
                <template v-for="(error, index) in errors.password" :key="index">
                        <span :class="{'d-block': errors.password[index--]}">{{ error }}</span>
                </template>
            </div>
        </div>
        <button type="submit" class="btn btn-primary form-control mt-2">Login</button>
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
                },
                errors:{
                    email:{},
                    password:{},
                },
                formValidations:{
                    email:['required', 'email'],
                    password:['required', 'minLength', 'maxLength'],
                }
            }
        },
        validations () {
            return {
                form: {
                    email: { required, email },
                    password: { required, minLength: minLength(8), maxLength: maxLength(20)},
                }
            }
        },
        components:{
            Input
        },
        

        methods:{
            inputValidator: callOptimization.debounce(function(dataProperty, parentProperty = null, validations = []) {
                // Clear errors immediately
                this.errors[dataProperty] = [];

                // Perform validation after debounce delay
                this.errors[dataProperty] = checkInputValidity(this.v$, dataProperty, parentProperty, validations);
            }, 500),


            async submitForm () {
                // const isFormValid = await this.v$.$validate()
                 // Update errors for all fields
                // if(!isFormValid) {
                //     Object.keys(this.formValidations).forEach(field => {
                //         this.errors[field] = checkInputValidity(this.v$, field, 'form', this.formValidations[field])
                //     });
                //     return;
                // }
                
                try {
                    const response = await apiClient.post('/login',{ ...this.form })
                    console.log(response.data.accessToken, "response.data.accessToken");
                    // this.v$.$reset()
                    if(response.status == 200) {
                        localStorage.setItem('token', response.data.accessToken)
                        this.$router.push('/');
                    }
                    
                } catch (error) {
                    console.log(error, "error");
                    // Set errors from the server response
                    this.errors = error.response.data.errors;
                    
                }

            }
        }
    }
</script>