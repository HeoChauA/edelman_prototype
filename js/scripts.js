jQuery(document).ready(function($) {
  // Process accordion.
  var jsAccordion = function () {
    var $icons = {
      header: "accordion__close icon-accordion icon-plus",
      activeHeader: "accordion__open icon-accordion icon-minus"
    };

    $( ".js-accordion__content" ).accordion({
      header: "> .accordion__group > h3",
      icons: $icons,
      heightStyle: "content",
      collapsible: true,
      active: false,
      autoHeight: false,
    });
  };

  jsAccordion();

  //Filter bar in mobile.
  var $filter_bar = $( '.filter__title-bar' );
  var filterBarAction = function (e) {
    if(e) {
      e.preventDefault();
    }

    $(this).parents('.filter').toggleClass('filter--open');
  };

  $filter_bar.click(filterBarAction);
});
