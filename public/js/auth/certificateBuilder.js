import { handleCheckboxs } from "../helpers/handleCheckboxs.js";
import { setDataCertificate } from "../helpers/setDataCertificate.js";


handleCheckboxs();
setDataCertificate();


buttonGenerator.addEventListener('click', async function () {
    const doc    = new jsPDF('p', 'pt', 'A4');
    const margin = 0;
    const canvas = document.getElementById('certificateCanvas');

    html2canvas(canvas, { scale: 5, })
        .then(canvas => {
            const imgData = canvas.toDataURL('image/png');

            // Obtener dimensiones de la imagen y del PDF
            const imgProps = doc.getImageProperties(imgData);
            const pdfWidth = doc.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

            // Agregar la imagen al PDF
            doc.addImage(imgData, 'SVG', margin, margin, pdfWidth - 2 * margin, pdfHeight - 2 * margin);

            // Guardar el PDF
            //doc.save('diploma.pdf');

            // Generando URL del Blob
            const pdfBlobUrl = doc.output('bloburl');

            // Abrir el pdf en el navegador
            window.open(pdfBlobUrl, '_blank');
        })
        .catch(error => {
            console.error('Error al generar el PDF:', error);
            // Puedes mostrar un mensaje de error al usuario aquí
        });
});
