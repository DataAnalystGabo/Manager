const spanName                 = document.getElementById('spanName');
const spanSignatureExaminator  = document.getElementById('spanNameExaminator');
const spanSignatureInstructor  = document.getElementById('spanNameInstructor');
const inputName                = document.getElementById('inputName');
const inputSignatureExaminator = document.getElementById('inputExaminersSignature');
const inputSignatureInstructor = document.getElementById('inputInstructorSignature');




export const inputs = [
    inputName,
    inputSignatureExaminator,
    inputSignatureInstructor
]

export function setDataCertificate () { 
    inputs.forEach(input => {
    input.addEventListener('keyup', function() {
        spanName.textContent                = inputName.value;
        spanSignatureExaminator.textContent = inputSignatureExaminator.value;
        spanSignatureInstructor.textContent = inputSignatureInstructor.value
        });
    });
};