export function registerValidation(data){
    let error = {};

    if(!data.first_name || data.first_name.length < 2){
        error.first_name = "Invalid First Name"
    } 

    if(!data.last_name || data.last_name.length < 2){
        error.last_name = "Invalid Last Name"
    } 

    if(!data.username || data.username.length < 4){
        error.username = "Username at least 4 characters"
    } 

    var emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if(!emailRegex.test(data.email)){
        error.email = "Invalid Email"
    }

    var passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    if(!passwordRegex.test(data.password)){
        error.password = "Password must UpperCase,LetterCase and .. "
    }

    if(!passwordRegex.test(data.repassword)){
        error.repassword = "Password must UpperCase,LetterCase and .. "
    }
    
    if(data.repassword !== data.password){
        error.repassword = "A password is not the same as repeating it"
    } 

    if(!data.phone || data.phone.length < 2){
        error.phone = "Invalid Phone"
    } 

    if(!data.licence_plate || data.licence_plate<11 || data.licence_plate>11){
        error.licence_plate = "Invalid Licence Plate"
    }

    if(!data.color || data.color.length < 2){
        error.color = "Invalid Color"
    } 
    
    return error;
}