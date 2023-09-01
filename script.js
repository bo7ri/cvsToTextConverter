document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById('csv-form');
    const fileInput = document.getElementById('csv-file-input');
    const output = document.getElementById('output');
    const feedback = document.getElementById('feedback');
    const copyButton = document.getElementById('copy-button');
    const convertButton = document.getElementById('convert-button');
  
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      feedback.textContent = "";  // Reset feedback
      convertButton.textContent = "Converting...";
  
      const file = fileInput.files[0];
      
      if (!file) {
        feedback.textContent = 'Please select a CSV file.';
        convertButton.textContent = "Convert";
        return;
      }
      
      const reader = new FileReader();
      
      reader.onload = function(event) {
        const text = event.target.result;
        const lines = text.split("\n");
        let resultText = "";
        
        for (let i = 0; i < lines.length; i++) {
          const row = lines[i].split(",");
          resultText += `Row ${i + 1}: [${row.join(", ")}]\n`;
        }
        
        output.value = resultText;
        copyButton.removeAttribute("disabled");
        convertButton.textContent = "Convert";
      };
      
      reader.readAsText(file);
    });
  
    // Copy to clipboard functionality
    copyButton.addEventListener('click', function() {
      output.select();
      document.execCommand('copy');
      feedback.textContent = 'Text copied to clipboard!';
    });
  });
  