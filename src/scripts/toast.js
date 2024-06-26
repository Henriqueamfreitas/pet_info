export function toast(color, text) {
    const toastContainer = document.querySelector('.toast__container')
    const toastParagraph = document.querySelector('.toastContainer__p')
  
    toastParagraph.innerText = text
  
    toastContainer.style = `background-color: ${color}; border-color: ${color}`
  
    toastContainer.classList.remove('hidden')
  }