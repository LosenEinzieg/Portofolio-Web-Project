document.addEventListener("DOMContentLoaded", () => {
  // Prompt user for their name when the page loads
const userName = prompt("Welcome! Please enter your name:")

if (userName && userName.trim()) {
    document.getElementById("username").textContent = userName.trim()
    localStorage.setItem("portfolioUserName", userName.trim())
} else {
    // Check if name is saved in localStorage
    const savedName = localStorage.getItem("portfolioUserName")
    if (savedName) {
    document.getElementById("username").textContent = savedName
    }
}

  // Mobile menu toggle
const mobileMenuBtn = document.getElementById("mobile-menu-btn")
const mobileMenu = document.getElementById("mobile-menu")

if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden")
    })
}

  // Form validation and submission
const contactForm = document.getElementById("contact-form")
const successMessage = document.getElementById("success-message")
if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
    e.preventDefault()

      // Get form elements
    const name = document.getElementById("contact-name")
    const email = document.getElementById("contact-email")
    const subject = document.getElementById("contact-subject")
    const message = document.getElementById("contact-message")

      // Get error elements
    const nameError = document.getElementById("name-error")
    const emailError = document.getElementById("email-error")
    const subjectError = document.getElementById("subject-error")
    const messageError = document.getElementById("message-error")

      // Reset errors
    ;[nameError, emailError, subjectError, messageError].forEach((error) => {
        if (error) error.classList.add("hidden")
    })

    let isValid = true

      // Validate name
    if (!name.value.trim()) {
        if (nameError) nameError.classList.remove("hidden")
        isValid = false
    }

      // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email.value.trim() || !emailRegex.test(email.value)) {
        if (emailError) emailError.classList.remove("hidden")
        isValid = false
    }

      // Validate subject
    if (!subject.value.trim()) {
        if (subjectError) subjectError.classList.remove("hidden")
        isValid = false
    }

      // Validate message
    if (!message.value.trim()) {
        if (messageError) messageError.classList.remove("hidden")
        isValid = false
    }

      // If form is valid, show success message
    if (isValid) {
        const formData = new FormData(contactForm)
        fetch("https://formspree.io/f/movnpgzl", {
            method: "POST",
            body: formData,
            headers: { 'Accept': 'application/json' }
        }).then(response => {
            if (response.ok) {
            contactForm.reset()
            if (successMessage) {
                successMessage.classList.remove("hidden")
                setTimeout(() => {
                successMessage.classList.add("hidden")
                }, 3500)
            }
            }
        })
    }
    })
}

  // Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
        target.scrollIntoView({
        behavior: "smooth",
        block: "start",
        })
        // Close mobile menu if open
        if (mobileMenu) {
        mobileMenu.classList.add("hidden")
        }
    }
    })
})
})

// Update welcome message function

function updateWelcome() {
    const nameInput = document.getElementById("name-input")
    const username = document.getElementById("username")

    if (nameInput && username && nameInput.value.trim()) {
        const name = nameInput.value.trim()
        username.classList.remove("username-typing")
        void username.offsetWidth // trigger reflow
        username.textContent = ""
        username.classList.add("username-typing")
        let i = 0
        function typeChar() {
            if (i <= name.length) {
                username.textContent = name.slice(0, i)
                i++
                setTimeout(typeChar, 60)
            } else {
                username.classList.remove("username-typing")
                username.textContent = name
            }
        }
        typeChar()
        localStorage.setItem("portfolioUserName", name)
        nameInput.value = ""
    }
}
