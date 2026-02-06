const fileInput = document.getElementById('fileInput');
const fileInfo = document.getElementById('fileInfo');
const statusText = document.getElementById('status');

// API 5: Web Workers
// Objectiu: fer el càlcul del consum energètic en segon pla per no congelar la pàgina.
let impacteWorker = null;
if (window.Worker) {
    try {
        impacteWorker = new Worker("../../src/js/impacte_worker.js");
    } catch (e) {
        impacteWorker = null;
    }
}

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
        const poblacioBCN = 1731649;

        // Mostrem un estat mentre calculem (amb worker si es pot)
        fileInfo.innerHTML = `<p class="text-muted">Calculant impacte... (Web Worker)</p>`;

        const reader = new FileReader();
        reader.onload = (e) => {
            // 1) Primer calculem l'impacte (worker o fallback)
            const pintarResultat = (res) => {
                fileInfo.innerHTML = `
                    <div class="file-info-card" style="text-align: left; padding: 15px; border-radius: 10px;">
                        <strong>Nom:</strong> ${file.name}<br>
                        <strong>Mida:</strong> ${midaLlegible}<br>
                        <p style="margin: 5px 0;"><strong>El teu impacte:</strong> ${res.min} - ${res.max} kWh</p>
                        <div>
                            <strong>Efecte Barcelona:</strong><br>
                            Si tota la població de Barcelona pugés aquest fitxer, es gastarien 
                            <strong>${res.bcnMin} - ${res.bcnMax} kWh</strong>.
                        </div>
                    </div>
                `;

                // 2) Si és imatge, fem una previsualització
                if (file.type.startsWith('image/')) {
                    const img = document.createElement('img');
                    img.src = e.target.result;
                    img.style.cssText = "width: 100px; height: auto; margin-top: 10px; border-radius: 8px; display: block;";
                    fileInfo.querySelector('.file-info-card').appendChild(img);
                }
            };

            if (impacteWorker) {
                impacteWorker.onmessage = (ev) => pintarResultat(ev.data);
                impacteWorker.onerror = () => {
                    // Fallback si el worker falla
                    const energia = calcularEnergia(file.size);
                    const min = parseFloat(energia.min);
                    const max = parseFloat(energia.max);
                    pintarResultat({
                        min: energia.min,
                        max: energia.max,
                        bcnMin: (min * poblacioBCN).toFixed(2),
                        bcnMax: (max * poblacioBCN).toFixed(2)
                    });
                };
                impacteWorker.postMessage({ bytes: file.size, poblacio: poblacioBCN });
            } else {
                const energia = calcularEnergia(file.size);
                const min = parseFloat(energia.min);
                const max = parseFloat(energia.max);
                pintarResultat({
                    min: energia.min,
                    max: energia.max,
                    bcnMin: (min * poblacioBCN).toFixed(2),
                    bcnMax: (max * poblacioBCN).toFixed(2)
                });
            }
        };

        reader.readAsDataURL(file);
        
        statusText.textContent = "";
    }
});

