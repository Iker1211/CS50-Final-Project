let sidebar = document.querySelector('#sidebar');

document.querySelector('.navbar-toggler').onclick = function() {

    if (sidebar.style.display === 'none' && window.innerWidth < 860) {
        sidebar.style.display = 'block';
        sidebar.style.width = '100%';
    } else {
        sidebar.style.display = 'none';
    }

}

document.querySelector('.btn-close').onclick = function() {

    if (sidebar.style.display = 'block' && window.innerWidth < 860 ) {
        sidebar.style.display = 'none';
    } else {
        sidebar.style.display = 'block';
    }

}

document.addEventListener('DOMContentLoaded', function() {
    const sidebar = document.getElementById('sidebar');

    function applySidebarStyles() {
        if (window.innerWidth > 860) {
            sidebar.style.display = 'block';
            sidebar.style.width = '280px';
            sidebar.style.backgroundColor = '#5A387B';
            sidebar.style.height = '100vh';
            sidebar.style.paddingLeft = '20px';
            sidebar.style.overflowY = 'auto';
        } else {
            sidebar.style.display = 'none';
        }
    }

    // Apply styles on initial load
    applySidebarStyles();

    // Apply styles on window resize
    window.addEventListener('resize', applySidebarStyles);

    // Ensure sidebar is displayed when toggled or closed
    document.querySelector('.btn-close').addEventListener('click', function() {
        applySidebarStyles();
    });
});