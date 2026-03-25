const filePicker = document.getElementById("file");
const output = document.getElementById("output");
const copy = document.getElementById("copy");
const typesMap = {
    "audio/mpeg": "mp3",
    "application/ogg": "ogg",
    "audio/wav": "wav"
};
filePicker.addEventListener("change",()=>{
    const file = filePicker.files[0];
    const reader = new FileReader();
    reader.onload = ()=>output.textContent = btoa(reader.result);
    reader.readAsText(file);
});
output.addEventListener("focus",()=>{
    output.select();
});
copy.addEventListener("click",()=>{
    const text = output.textContent;
    output.focus();
    navigator.clipboard.writeText(text);
});