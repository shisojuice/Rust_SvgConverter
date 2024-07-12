import init, { image_to_path } from './rust_svgconverter.js';

const main = document.getElementById('main');

async function run() {
    await init();

    document.getElementById("file_input").addEventListener("change", async (event) => {
        const files = document.getElementById("file_input").files;
        if (files.length === 0) {
            return;
        }
        const file_blob = new Blob([files[0]], { type: files[0].type });
        await blobToUint8Array(file_blob)
            .then(uint8Array => {
                main.innerHTML = image_to_path(uint8Array, 128);
            })
            .catch(error => {
                console.error('Error converting blob:', error);
            });
    });
}
run();

async function blobToUint8Array(blob) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            resolve(new Uint8Array(reader.result));
        };
        reader.onerror = reject;
        reader.readAsArrayBuffer(blob);
    });
}