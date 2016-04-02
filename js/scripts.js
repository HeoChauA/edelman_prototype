jQuery(document).ready(function($) {
  // Process accordion.
  var jsAccordion = function () {
    var $icons = {
      header: "accordion__close icon-accordion icon-plus",
      activeHeader: "accordion__open icon-accordion icon-minus"
    };

    $( ".accordion" ).accordion({
      header: "> .accordion__group > h3",
      icons: $icons,
      heightStyle: "content",
      collapsible: true,
      active: false,
      autoHeight: false,
    });
  };

  function filterProcess() {
    //Filter bar in mobile.
    var $filter_bar = $( '.filter__title-bar' );
    var filterBarAction = function (e) {
      if(e) {
        e.preventDefault();
      }

      $(this).parents('.filter').toggleClass('filter--open');
    };

    $filter_bar.click(filterBarAction);

    //Close menu filter when click out.
    $(document).on('click', function (e) {
      if ($filter_bar.is(':visible') && !$filter_bar.is(e.target) && !$filter_bar.has(e.target).length) {
        $filter_bar.parents('.filter').removeClass('filter--open');
      }
    });
  }

  jsAccordion();
  filterProcess();
});
