import { handleCheckboxs } from "../helpers/handleCheckboxs.js";
import { setDataCertificate } from "../helpers/setDataCertificate.js";
import { buttonSubmit } from "../components/buttonSubmit.js";
handleCheckboxs();
setDataCertificate();
const buttonGenerator = document.getElementById('button-submit');

buttonGenerator.addEventListener('click', async function () {
    const doc    = new jsPDF('p', 'pt', 'A4');
    const margin = 0;
    const canvas = document.getElementById('certificateCanvas');
    buttonSubmit('Generando PDF', '', 'loading');
    html2canvas(canvas, { scale: 3, })
        .then(canvas => {
            const imgData = canvas.toDataURL('image/png');

            // Obtener dimensiones de la imagen y del PDF
            const imgProps = doc.getImageProperties(imgData);
            const pdfWidth = doc.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

            // Agregar la imagen al PDF
            doc.addImage(imgData, 'png', margin, margin, pdfWidth - 2 * margin, pdfHeight - 2 * margin);

            // Guardar el PDF
            //doc.save('diploma.pdf');

            // Generando URL del Blob
            const pdfBlobUrl = doc.output('bloburl');

            buttonSubmit('', 'Generar PDF', 'success');

            // Abrir el pdf en el navegador
            window.open(pdfBlobUrl, '_blank');
        })
        .catch(error => {
            buttonSubmit('', 'Generar PDF', 'error');
            console.error('Error al generar el PDF:', error);
            // Puedes mostrar un mensaje de error al usuario aquí
        });
});
