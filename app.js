const api_key = "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";
const api_URL = "https://router.huggingface.co/hf-inference/models/Salesforce/blip-image-captioning-base";

let plus_icon = document.querySelector("#add")
let btn = document.querySelector("#upload-btn")
let p_img = document.querySelector("#preview-image")
let img_input = document.querySelector("#file-input")
let caption_box = document.querySelector("#caption-box")
let caption = document.querySelector("#caption")
let drop_box = document.querySelector("#drop-area")
let cross = document.querySelector("#cross")
let caption_btn = document.querySelector("#caption-btn")
let load_bar = document.querySelector("#loading")


plus_icon.addEventListener("click", () => {
    img_input.click()
})

btn.addEventListener("click", () => {
    img_input.click()
})
img_input.addEventListener('change', (event) => {
    const file = event.target.files[0];  // Get selected file
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            p_img.src = e.target.result;  // Display image
            p_img.style.display = 'block';
        };
        reader.readAsDataURL(file);
        plus_icon.style.display = 'none';
        drop_box.style.opacity = 1;
        cross.classList.remove("hidden");
    }
});


caption_btn.addEventListener("click", () => {
    if (p_img.src === null)
        alert("Upload a picture")

})

cross.addEventListener("click", () => {
    p_img.src = null  // Display image
    p_img.style.display = 'none';
    plus_icon.style.display = 'block';
    cross.classList.add("hidden")
    drop_box.style.opacity = 0.6;
    caption.innerHTML = "";
})




caption_btn.addEventListener("click", async () => {
    const file = img_input.files[0];

    if (!file) {
        alert("Please select an image first!");
        return;
    }

    caption_box.style.display = "flex";
    caption_box.classList.remove("hidden")
    load_bar.classList.remove("hidden")
    caption_box.style.opacity = "1";
    try {
        const captionText = await generateCaption(file);
        load_bar.classList.add("hidden"); // ✅ Hide loading bar after response
        caption.classList.remove("hidden"); // ✅ Show the caption
        setTimeout(() => { caption_box.style.opacity = "1"; }, 10);
        caption.innerHTML = captionText;
    } catch (error) {
        console.error("Error generating caption:", error);
        caption.innerHTML = "Failed to generate caption.";
    }
});

// Function to generate caption from API
async function generateCaption(file) {
    console.log("Caption function triggered");

    const reader = new FileReader();

    return new Promise((resolve, reject) => {
        reader.onload = async () => {
            const response = await fetch(api_URL, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${api_key}`,
                    "Content-Type": "application/octet-stream", // ✅ Send binary data
                },
                body: reader.result, // ✅ Send raw binary data
            });

            const result = await response.json();

            if (response.ok) {
                resolve(result[0]?.generated_text || "No caption generated.");
            } else {
                reject(new Error(result.error || "API error"));
            }
        };

        reader.onerror = () => reject(new Error("File reading error."));
        reader.readAsArrayBuffer(file); // ✅ Read file as binary
    });
}
