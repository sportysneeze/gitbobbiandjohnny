document.addEventListener('DOMContentLoaded', function () {
    const yearMenu = document.getElementById('yearMenu');
    const years = yearMenu.querySelectorAll('a');
    let currentYear = null;
    let tapTimeout;
    let tappedRecently = false;

    function scrollToYear(year) {
        const element = document.getElementById('year' + year);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }

    function highlightCurrentYear() {
        const scrollPosition = window.scrollY;

        years.forEach((yearLink) => {
            const targetYear = yearLink.getAttribute('data-year');
            const targetElements = document.querySelectorAll('#year' + targetYear);

            // Check if targetElements is not empty and if it's the first occurrence of the year
            if (targetElements.length > 0 && targetElements[0].offsetTop <= scrollPosition && targetElements[targetElements.length - 1].offsetTop + targetElements[targetElements.length - 1].offsetHeight > scrollPosition) {
                yearLink.classList.add('active');
                currentYear = targetYear;
            } else {
                yearLink.classList.remove('active');
            }
        });

        if (tappedRecently) {
            clearTimeout(tapTimeout);
            tapTimeout = setTimeout(() => {
                tappedRecently = false;
            }, 100); // Adjust the delay as needed
        }
    }

    years.forEach((yearLink) => {
        yearLink.addEventListener('click', function (event) {
            event.preventDefault();
            const targetYear = this.getAttribute('data-year');
            currentYear = targetYear; // Set currentYear on tap
            tappedRecently = true;
            clearTimeout(tapTimeout);
            tapTimeout = setTimeout(() => {
                highlightCurrentYear();
            }, 100); // Adjust the delay as needed
            scrollToYear(targetYear);
        });
    });

    window.addEventListener('scroll', () => {
        clearTimeout(tapTimeout);
        highlightCurrentYear();
        // Uncomment the line below if you want to scroll to the current year even if it's not the first one visible
        // if (currentYear !== null) scrollToYear(currentYear);
    });

    // Initial highlight when the page loads
    highlightCurrentYear();
});
