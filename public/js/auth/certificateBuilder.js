import { handleCheckboxs } from "../helpers/handleCheckboxs.js";
import { setDataCertificate } from "../helpers/setDataCertificate.js";

handleCheckboxs();
setDataCertificate();

const buttonGenerator = document.getElementById('buttonGenerator');

buttonGenerator.addEventListener('click', function () {
    console.log('Generando PDF');
});