let plus_icon=document.querySelector("#add")
let btn=document.querySelector("#img-btn")
let p_img=document.querySelector("#preview-image")
let img_input=document.querySelector("#file-input")
let caption_box=document.querySelector("#caption-box")
let caption=document.querySelector("#caption")
let drop_box=document.querySelector("#drop-area")
let cross=document.querySelector("#cross")

plus_icon.addEventListener("click",()=>{
    img_input.click()
})

btn.addEventListener("click",()=>{
    img_input.click()
})
img_input.addEventListener('change', (event) => {
    const file = event.target.files[0];  // Get selected file
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
           p_img.src = e.target.result;  // Display image
          p_img.style.display = 'block';
        };
        reader.readAsDataURL(file);
        plus_icon.style.display='none';
        drop_box.style.opacity=1;
        cross.classList.remove("hidden");
    }
});

cross.addEventListener("click",()=>{
    p_img.src = null  // Display image
    p_img.style.display='none';
    plus_icon.style.display='block';
    cross.classList.add("hidden")
    drop_box.style.opacity=0.6;
})

