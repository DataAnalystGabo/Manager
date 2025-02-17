export function calculateAge(input){
    const birthdate  = new Date(input);
    const today      = new Date();
    let age          = today.getFullYear() - birthdate.getFullYear();
    const monthDiff  = today.getMonth() - birthdate.getMonth();

    if(monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthdate.getDate())){
        age--;
    }
    return age;
};