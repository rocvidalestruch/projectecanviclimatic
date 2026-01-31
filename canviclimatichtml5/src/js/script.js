const fileInput = document.getElementById('fileInput');
const fileInfo = document.getElementById('fileInfo');
const uploadBtn = document.getElementById('uploadBtn');
const progressBar = document.querySelector('.progress-bar');
const progress = document.getElementById('progress');
const statusText = document.getElementById('status');

function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

function calcularEnergia(bytes) {
    const gigabytes = bytes / (1024 * 1024 * 1024);
    const minKWh = gigabytes * 0.015;
    const maxKWh = gigabytes * 0.03;
    
    return {
        min: minKWh.toFixed(6),
        max: maxKWh.toFixed(6)
    };
}

fileInput.addEventListener('change', () => {
    if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        const midaLlegible = formatBytes(file.size);
        
        const gigabytes = file.size / (1024 * 1024 * 1024);
        const minKWh = gigabytes * 0.015;
        const maxKWh = gigabytes * 0.03;
        
        const poblacioBCN = 1731649;
        const bcnMin = (minKWh * poblacioBCN).toFixed(2);
        const bcnMax = (maxKWh * poblacioBCN).toFixed(2);
        
        fileInfo.innerHTML = `
                <strong>Nom:</strong> ${file.name}<br>
                <strong>Mida:</strong> ${midaLlegible}<br>
                <p style="margin: 5px 0;"><strong>El teu impacte:</strong> ${minKWh.toFixed(6)} - ${maxKWh.toFixed(6)} kWh</p>
                
                    <strong> Efecte Barcelona:</strong><br>
                    Si tota la població de Barcelona pugés aquest fitxer alhora, es gastarien entre 
                    <strong>${bcnMin}</strong> i <strong>${bcnMax} kWh</strong>.
                </div>
            </div>
        `;
        
        statusText.textContent = "";
        progress.style.width = '0%';
        progressBar.style.display = 'none';
    }
});

uploadBtn.addEventListener('click', () => {
    const file = fileInput.files[0];
    if (!file) return alert("Selecciona un fitxer.");

    progressBar.style.display = 'block';
    uploadBtn.disabled = true;

    const formData = new FormData();
    formData.append('file', file);

    const xhr = new XMLHttpRequest();
    xhr.upload.addEventListener('progress', (e) => {
        if (e.lengthComputable) {
            const percent = (e.loaded / e.total) * 100;
            progress.style.width = percent + '%';
        }
    });

    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            statusText.textContent = "Fitxer enviat. Gràcies per ser conscient del teu consum!";
            statusText.style.color = "#28a745";
            uploadBtn.disabled = false;
        }
    };

    xhr.open('POST', 'https://httpbin.org/post', true); 
    xhr.send(formData);
});