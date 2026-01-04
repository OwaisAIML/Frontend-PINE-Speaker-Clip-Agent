const uploadBtn = document.getElementById("uploadBtn");
const videoInput = document.getElementById("videoInput");
const statusDiv = document.getElementById("status");
const resultPre = document.getElementById("result");

// CHANGE THIS IF BACKEND URL CHANGES
const API_URL =
  "https://pine-speaker-clip-agent.onrender.com/diarize-video";


uploadBtn.onclick = async () => {
  if (!videoInput.files.length) {
    alert("Please select a video file.");
    return;
  }

  const file = videoInput.files[0];
  const formData = new FormData();
  formData.append("file", file);

  statusDiv.textContent = "⏳ Processing video… this may take some time.";
  resultPre.textContent = "";

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      body: formData
    });

   if (!response.ok) {
  const text = await response.text();
  throw new Error(text);
}


    const data = await response.json();

    statusDiv.textContent = "✅ Processing complete!";
    resultPre.textContent = JSON.stringify(data, null, 2);

  } catch (err) {
    statusDiv.textContent = "❌ Error processing video.";
    resultPre.textContent = err.toString();
  }
};
