export default function validateEmail(email){
    // Simple email validation
    const re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)+[a-zA-Z]{2,7})$/;
    return re.test(email);
};