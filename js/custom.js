
document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.querySelector("#search");
    const resultsContainer = document.querySelector(".search-results");    
    const searchBtn = document.querySelector(".search-btn"); // The button to open search

    // Fetch JSON data
    fetch("js/demo.json")
        .then(response => response.json())
        .then(data => {
            searchInput.addEventListener("input", function () {
                const filter = this.value.toLowerCase();
                resultsContainer.innerHTML = ""; // Clear previous results

                const filteredData = data.filter(item => item.name.toLowerCase().includes(filter));

                if(filter.length == 0) return; // If no filter, don't show results

                if (filteredData.length > 0) {
                    filteredData.forEach(item => {
                        const li = document.createElement("li");
                        li.classList.add("search-result-item");

                        const img = document.createElement("img");
                        img.src = item.image;                        
                        const textSpan = document.createElement("span");
                        textSpan.textContent = item.name;

                        li.appendChild(img);
                        li.appendChild(textSpan);
                        li.addEventListener("click", function () {
                            searchInput.value = item.name; // Set input to clicked item
                            resultsContainer.innerHTML = ""; // Hide results but keep input
                            window.location.href = "product-details.html"; // Redirect to product page
                        });
                        resultsContainer.appendChild(li);
                    });
                } else {
                    resultsContainer.innerHTML = `<p class="text-center py-3 mb-0">No results found</p>`;                    
                }
            });
        })
        .catch(error => console.error("Error loading data:", error));
        searchInput.addEventListener("focus", function () {
            resultsContainer.style.display = "block"; 
        })
        document.addEventListener("click", function (event) {
            if (!resultsContainer.contains(event.target) && event.target !== searchInput) {
                resultsContainer.style.display = "none"; 
            }
        });
        
        resultsContainer.addEventListener("click", function (event) {
            event.stopPropagation(); 
        });
});


  const backgroundCarousel = document.getElementById('backgroundCarousel');
  const productCarousel = document.getElementById('productCarousel');

  const backgroundCarouselInstance = bootstrap.Carousel.getOrCreateInstance(backgroundCarousel);
  const productCarouselInstance = bootstrap.Carousel.getOrCreateInstance(productCarousel);

  backgroundCarousel.addEventListener('slide.bs.carousel', function (e) {
    productCarouselInstance.to(e.to);
  });

  productCarousel.addEventListener('slide.bs.carousel', function (e) {
    backgroundCarouselInstance.to(e.to);
  });
