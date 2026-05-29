// favourate listing heart toggle 
const hearts = document.querySelectorAll("#favourite-box");

hearts.forEach((heart) => {
  heart.addEventListener("click", () => {
    if (heart.innerHTML == "♡") {
      heart.innerHTML = "&#9829;";
      heart.style.color = "#ff4444";
    }
    else {
      heart.innerHTML = "&#9825;";
      heart.style.color = "white";
    }
  });
});

// clinet form validation 
// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})();


//add gst for all
const toggleBtn = document.getElementById("toggel-btn");
toggleBtn.addEventListener("change", () => {
  const gstTag = document.getElementsByClassName("gst-tag");
  for (i of gstTag) {
    if (i.style.display != "inline") {
      i.style.display = "inline";
    } else {
      i.style.display = "none";
    }
  }
});