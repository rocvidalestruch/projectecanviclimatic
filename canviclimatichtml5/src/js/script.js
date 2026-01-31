const fileInput = document.getElementById('fileInput');
const fileInfo = document.getElementById('fileInfo');
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
        
        const midaMaxima = 5 * 1024 * 1024;
        if (file.size > midaMaxima) {
            alert("El fitxer és massa gran (màxim 5MB).");
            fileInput.value = "";
            return;
        }

        const midaLlegible = formatBytes(file.size);
        const gb = file.size / (1024 * 1024 * 1024);
        const minKWh = gb * 0.015;
        const maxKWh = gb * 0.03;
        const poblacioBCN = 1731649; 

        const reader = new FileReader();
        reader.onload = (e) => {
            fileInfo.innerHTML = `
                <div class="file-info-card" style="text-align: left; padding: 15px; border-radius: 10px; >
                    <strong>Nom:</strong> ${file.name}<br>
                    <strong>Mida:</strong> ${midaLlegible}<br>
                    <p style="margin: 5px 0;"><strong>El teu impacte:</strong> ${minKWh.toFixed(6)} - ${maxKWh.toFixed(6)} kWh</p>
                    <div>
                        <strong>Efecte Barcelona:</strong><br>
                        Si tota la població de Barcelona pugés aquest fitxer, es gastarien 
                        <strong>${(minKWh * poblacioBCN).toFixed(2)} - ${(maxKWh * poblacioBCN).toFixed(2)} kWh</strong>.
                    </div>
                </div>
            `;
            
            if (file.type.startsWith('image/')) {
                const img = document.createElement('img');
                img.src = e.target.result;
                img.style.cssText = "width: 100px; height: auto; margin-top: 10px; border-radius: 8px; display: block;";
                fileInfo.querySelector('.file-info-card').appendChild(img);
            }
        };
        
        reader.readAsDataURL(file);
        
        statusText.textContent = "";
    }
});

