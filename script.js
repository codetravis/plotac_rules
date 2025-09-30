// Mobile navigation toggle
document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.getElementById("nav-toggle")
  const navMenu = document.getElementById("nav-menu")

  navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active")
  })

  // Close mobile menu when clicking on a link
  const navLinks = document.querySelectorAll(".nav-menu a")
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active")
    })
  })

  // Close mobile menu when clicking outside
  document.addEventListener("click", (event) => {
    const isClickInsideNav = navToggle.contains(event.target) || navMenu.contains(event.target)

    if (!isClickInsideNav && navMenu.classList.contains("active")) {
      navMenu.classList.remove("active")
    }
  })

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        const offsetTop = target.offsetTop - 80 // Account for fixed navbar
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        })
      }
    })
  })

  // Add scroll effect to navbar
  window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar")
    if (window.scrollY > 50) {
      navbar.style.background = "linear-gradient(135deg, rgba(26, 26, 46, 0.95) 0%, rgba(22, 33, 62, 0.95) 100%)"
      navbar.style.backdropFilter = "blur(10px)"
    } else {
      navbar.style.background = "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)"
      navbar.style.backdropFilter = "none"
    }
  })

  // Add loading animation for tables
  const tables = document.querySelectorAll("table")
  tables.forEach((table) => {
    table.style.opacity = "0"
    table.style.transform = "translateY(20px)"

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.transition = "opacity 0.6s ease, transform 0.6s ease"
          entry.target.style.opacity = "1"
          entry.target.style.transform = "translateY(0)"
        }
      })
    })

    observer.observe(table)
  })

  // Add hover effects to cards
  const cards = document.querySelectorAll(".ship-card, .upgrade-card, .career-card")
  cards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-8px) scale(1.02)"
    })

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)"
    })
  })
})

// Add search functionality
function addSearchFunctionality() {
  const searchContainer = document.createElement("div")
  searchContainer.className = "search-container"
  searchContainer.innerHTML = `
        <input type="text" id="search-input" placeholder="Search the campaign guide..." />
        <div id="search-results"></div>
    `

  const navbar = document.querySelector(".nav-container")
  navbar.appendChild(searchContainer)

  const searchInput = document.getElementById("search-input")
  const searchResults = document.getElementById("search-results")

  searchInput.addEventListener("input", function () {
    const query = this.value.toLowerCase()
    if (query.length < 3) {
      searchResults.style.display = "none"
      return
    }

    const sections = document.querySelectorAll(".section")
    const results = []

    sections.forEach((section) => {
      const sectionTitle = section.querySelector("h2").textContent
      const sectionContent = section.textContent.toLowerCase()

      if (sectionContent.includes(query)) {
        results.push({
          title: sectionTitle,
          id: section.id,
          snippet: getSnippet(sectionContent, query),
        })
      }
    })

    displaySearchResults(results)
  })

  function getSnippet(content, query) {
    const index = content.indexOf(query)
    const start = Math.max(0, index - 50)
    const end = Math.min(content.length, index + 100)
    return content.substring(start, end) + "..."
  }

  function displaySearchResults(results) {
    if (results.length === 0) {
      searchResults.innerHTML = '<div class="no-results">No results found</div>'
    } else {
      searchResults.innerHTML = results
        .map(
          (result) => `
                <div class="search-result" onclick="navigateToSection('${result.id}')">
                    <h4>${result.title}</h4>
                    <p>${result.snippet}</p>
                </div>
            `,
        )
        .join("")
    }
    searchResults.style.display = "block"
  }
}

function navigateToSection(sectionId) {
  const section = document.getElementById(sectionId)
  if (section) {
    const offsetTop = section.offsetTop - 80
    window.scrollTo({
      top: offsetTop,
      behavior: "smooth",
    })
  }
  document.getElementById("search-results").style.display = "none"
  document.getElementById("search-input").value = ""
}

// Initialize search functionality
// addSearchFunctionality();
