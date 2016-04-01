(function ($) {
  $(document).ready(function () {
    MenuToggle();
    MenuResponsive();
    FilterClick();
    LoadMoreInit();
    FaqHashCheckerInit();
    checkPageShort();
    checkDisclaimer();

    $(window).resize(function() {
      MenuResponsive();
      checkPageShort();

    });
  });

  /**
   * Menu Responsive.
   */
  function MenuToggle() {
    var window_width = $(window).outerWidth(true);
    $('.branding-bottom').css({'left': window_width});

    $('body').addClass('hide-menu');
    $('.navbar-toggle').click(function() {
      $(this).toggleClass('active');
      $('body').toggleClass('show-menu');
      $('body').toggleClass('hide-menu');
      $('body').css({'transition': 'left 0.5s'});
    });

    var caret = $('li.has-submenu > .caret');
    caret.click(function(){
      $(this).toggleClass('active');
      $(this).next('ul.submenu').slideToggle();
    });
  }

  /**
   * Menu Responsive.
   */
  function MenuResponsive() {
    var window_width = $(window).outerWidth(true);
    var width_menu = window_width - 86;

    $('.branding-bottom').outerWidth(width_menu);
    if ($('body').hasClass('hide-menu')) {
      $('.branding-bottom').css({'left': window_width, 'transition': 'all 0s'});
    }

    $('body.show-menu').css({'left': - width_menu, 'transition': 'all 0s'});

    $('.navbar-toggle').click(function() {
      $('body.show-menu').css({'left': - width_menu});
      if ($('body').hasClass('show-menu')) {
        $('.branding-bottom').css({'left': 86, 'transition': 'left 0.5s'});
      } else {
        $('.branding-bottom').css({'left': window_width});
      }
    });
  }

  /**
   * Returns unique item.
   */
  function unique(list) {
    var result = [];
    $.each(list, function(i, e) {
        if ($.inArray(e, result) == -1) result.push(e);
    });
    return result;
  }

  /**
   * Filter page items by taxonomy.
   */
  function FilterClick() {
    var filterLink = $('.filter__item a[data-category-id]'),
        accordiongroup = $('.filtered-preview');

    filterLink.click(function(e) {
      e.preventDefault();
      $('.form-title-search input').val('');
      accordiongroup.removeClass('show');
      accordiongroup.addClass('hide');
      $('.filtered-preview').removeClass('.fadeInDown');

      if($(this).hasClass('all')) {
        e.preventDefault();
        $('.filter__item  a').removeClass('selected');
        $(this).addClass('selected');
        accordiongroup.removeClass('hide');
      }

      $('.filter__item a').removeClass('selected');
      $(this).toggleClass('selected');
      if(!filterLink.hasClass('selected')) {
        $('.filter__item.all a').trigger( "click" );
      }

      var cat_array = [];

      $('.filter__item').each(function(){
        var cat_id = $(this).find('> .selected').attr('data-category-id');
        cat_array.push(cat_id);
        cat_array = $.grep(cat_array,function(n){ return n == 0 || n });
      }).end();

      accordiongroup.each(function(index) {
        var item_id = $(this).attr('data-item-categories');
        var item_array = item_id.split(",");
        var arrLen = item_array.length;

        var i;
        for (i=0; i < arrLen; ++i) {
          if ($.inArray(item_array[i], cat_array) >= 0) {
            accordiongroup.eq(index).addClass('show');
            accordiongroup.eq(index).removeClass('hide');
          }
        }
      });
      newsPageLoad();
      //FAQ.checkNoResults();
    });
  }

  /**
   * Display/hide load more button.
   */
  function newsPageLoad () {
    var $items = $('.news .news__item:not(.hide)'),
        $load_more_button = $('.load-more');
    $timeline_total = $items.length;
    $timeline_start = 10;
    $timeline_step = 3;
    $items
      .removeClass('fadeInDown')
      .slice(0, $timeline_start)
      .addClass('fadeInDown');

    if($timeline_start >= $timeline_total) {
      $load_more_button.hide();
    }
    else {
      $load_more_button.show();
    }
  }

  function moreTimeLine(e) {
    e.preventDefault();
    $timeline_start = ($timeline_start + $timeline_step <= $timeline_total) ? ($timeline_start + $timeline_step) : $timeline_total;
    $('.news .news__item').slice(0, $timeline_start).addClass('fadeInDown');

    if($timeline_start === $timeline_total) {
      $('.load-more').hide();
      $('.load-less').show();
    }
  }

  function lessTimeLine(e) {
    e.preventDefault();
    $timeline_start = 10;
    var $postion_item_start = $('.news .news__item').eq($timeline_start - 1).offset().top;

    $('.news .news__item').removeClass('fadeInDown');
    $('.news .news__item').slice(0, $timeline_start).addClass('fadeInDown');
    $('.load-more').show();
    $('.load-less').hide();

    $("html, body").animate({
      scrollTop: $postion_item_start
      } ,"slow"
    );
  }

  /**
   * Init Load More button.
   */
  function LoadMoreInit() {
    $('.load-more').click(moreTimeLine);
    $('.load-less').click(lessTimeLine);
    newsPageLoad();
  }

  /**
   * Init Hash Checker.
   */
  function FaqHashCheckerInit() {
    checkHash();
    $(window).on('hashchange', checkHash);
  }

  /**
   * Check hash and activate appropriate FAQ item.
   */
  function checkHash() {
    hash = window.location.hash.substring(1);
    if(hash) {
      faq = $('#'+hash);
      if(faq.length) {
        faq.find('.accordion__question').trigger('click');
      }
    }
  }

  /**
   * Check page short
   */
  function checkPageShort() {
    var window_height = $(window).outerHeight(true);
    var page_height = $('.page-wrapper').outerHeight(true);
    var footer_height = $('#footer').outerHeight();

    if (page_height < window_height) {
      $('#footer').addClass('fix-bottom');
      $('.page-wrapper').addClass('page-short');
      $('.page-wrapper.page-short').css({'padding-bottom': footer_height});
    } else if (page_height >= window_height) {
      $('#footer').removeClass('fix-bottom');
      $('.page-wrapper').removeClass('page-short').css({'padding-bottom': 0});
    }
  }

  function checkDisclaimer() {
    if (document.cookie.replace(/(?:(?:^|.*;\s*)ashford_saw_disclaimer\s*\=\s*([^;]*).*$)|^.*$/, "$1") !== "true") {
      $.get('/wp-json/ashford/disclaimer', {}, function(data) {
        var alert = '<div class="modal__disclaimer">'
            + '<div class="modal__title">Disclaimer</div>'
              + data.post_content
            +'</div>';
        alertify.okBtn('Enter Website').alert(alert, function() {
          document.cookie = "ashford_saw_disclaimer=true; expires=Fri, 31 Dec 9999 23:59:59 GMT";
        });
        $('.alertify nav').prepend('<p class="modal__confirm">I confirm that I have read, understood and accept the terms of this website.</p>');
        resizeDisclaimer();
        $(window).resize(function() {
          resizeDisclaimer();
        });
      });
    }
  }

  function resizeDisclaimer() {
    var height = $(window).height();
    $('.dialog>div').height((height *.9)+'px');
  }
})(jQuery);
