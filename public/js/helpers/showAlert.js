const alertDiv   = document.getElementById('alertDiv');
const alertSpan  = document.getElementById('alertSpan');

export function showAlert(message, type) {
    alertDiv.style.display = 'flex';
    if (type === 'success') {
        alertDiv.style.border = '1px solid #c3e6cb';
        alertDiv.style.backgroundColor = '#d4edda';
        alertSpan.style.color = '#155724';
    } else {
        alertDiv.style.border = '1px solid #f5c6cb';
        alertDiv.style.backgroundColor = '#f8d7da';
        alertSpan.style.color = '#721c24';
    }
    alertSpan.innerText = message;
};