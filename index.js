// In my code maybe some code parts write in uzbek. It's my officiallanguage. 
// But I will try to translate all this part to English. I hope you enjoy :)) 

///=======///=======///=======///=======///=======///=======///=======///=======///=======///=======///

// kerakli barcha o'zgaruvchi va o'zgarmaslarni e'lon qilib olamiz.
// firstly we gonna create all variables and constants

const imageInput = document.querySelector('.resizer_file');
const widthInput = document.querySelector('.resizer_input--width');
const heightInput = document.querySelector('.resizer_input--height');
const ascpetRatio = document.querySelector('.resizer_aspect');
const canvas = document.querySelector('.resizer_canvas');
const canvasCtx = canvas.getContext('2d');

let activeImage, originalRatio;


// kerakli inputning mavjud datasini olamiz va pastda uni openImage funksiyasi yordamida rasmning original hajmini chiqaramiz.
// get the actual data from input(image) and with openImage function(which we gonna create in below) show the original with and height image in input parts.

imageInput.addEventListener('change', (e) => {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
        openImage(reader.result)    
    })

    reader.readAsDataURL(e.target.files[0]);
});


// Hozirda bizda image elementi bor. Codning oxirgi qismlarida biz resize() funksiyasini chaqiramiz. U bizga rasmni html ga qo'shishga xizmat qiladi.
// Now we have image element but we add it in the last part with resize() function which allow us to add our image to html

function openImage(imageSrc) {
    activeImage = new Image();

    activeImage.addEventListener('load', () =>{
        originalRatio = activeImage.width / activeImage.height;

        resize(activeImage.width, activeImage.height);
    })

    activeImage.src = imageSrc;
};


// agar inputimizning width qismi o'zgartirilsa uni o'zgarishi. Va agar rasmning hajmini saqlash belgilangan bo'lsa shunga mos ishlashi.
// there is the logic if user change width input part it will change. And if keep aspect ratio clicked it work as well.
// And exact thing with height also.

widthInput.addEventListener('change', () => {
    if (!activeImage) return;

    const heightValue = ascpetRatio.checked ? widthInput.value / originalRatio : heightInput.value;

    resize(widthInput.value, heightValue );
})

heightInput.addEventListener('change', () => {
    if (!activeImage) return;

    const widthValue = ascpetRatio.checked ? heightInput.value * originalRatio : widthInput.value;

    resize(widthValue, heightInput.value);
});


// resize funksiyasi bilan rasmni htmlga qo'shamiz.
// with resize function we gonna add our img element to html.

function resize(width, height) {
    canvas.width = Math.floor(width);
    canvas.height = Math.floor(height);
    widthInput.value = Math.floor(width);
    heightInput.value = Math.floor(height);

    canvasCtx.drawImage(activeImage, 0, 0, Math.floor(width), Math.floor(height));
}