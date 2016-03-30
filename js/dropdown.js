jQuery('document').ready(function($) {
	dropdowns = $('.dropdown-menu');
	dropdowns.each(function(index) {
		var dropdown = this;
		var slideTime = 100;
		var hoverDelay = 400;
		var parent = $(this).parent('li');
		dropdown.show = false;

		var toggleDropdown = function () {
			visible = $(dropdown).is(':visible');
			console.log(visible);
			if (!visible && !dropdown.show) {
				return;
			}
			if (!visible && dropdown.show) {
				$(dropdown).slideDown(slideTime);
			}
			if (visible && !dropdown.show) {
				$(dropdown).slideUp(slideTime);
			}
			if (visible && dropdown.show) {
				return;
			}
		}

		// Prevent actual link of parent from going anywhere
		parent.children('a').click(function(e) {
			e.preventDefault();
		});

		// Prevent animation when child is clicked
		$(this).click( function(e) {
			e.stopPropagation();
		});

		// Default behavior; hover on parent
		parent.hover( function(e) {
			dropdown.show = true;
			toggleDropdown();
		}, function(e) {
			dropdown.show = false;
			setTimeout(toggleDropdown, hoverDelay);
		});

		// Catch hover on child so dropdown does not close prematurely
		$(this).hover( function(e) {
			dropdown.show = true;
			toggleDropdown();
		}, function(e) {
			dropdown.show = false;
			setTimeout(toggleDropdown, hoverDelay);
		});

		// Add touch events for mobile
		parent.on('touchend', function(e) {
			dropdown.show = !dropdown.show;
			toggleDropdown();
		});

	});
});
