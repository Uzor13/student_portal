
(function ($) {
  "use strict";


  /*==================================================================
  [ Focus input ]*/
  $('.input100').each(function(){
    $(this).on('blur', function(){
      if($(this).val().trim() !== "") {
        $(this).addClass('has-val');
      }
      else {
        $(this).removeClass('has-val');
      }
    })
  });


  /*==================================================================
  [ Validate ]*/
  const input = $('.validate-input .input100');

  $('.validate-form').on('submit',function(){
    let check = true;

    for(let i=0; i<input.length; i++) {
      if(validate(input[i]) === false){
        showValidate(input[i]);
        check=false;
      }
    }

    return check;
  });


  $('.validate-form .input100').each(function(){
    $(this).focus(function(){
      hideValidate(this);
    });
  });

  function validate (input) {
    if($(input).attr('type') === 'email' || $(input).attr('name') === 'email') {
      if($(input).val().trim().match(/^([a-zA-Z0-9_\-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(]?)$/) == null) {
        return false;
      }
    }
    else {
      if($(input).val().trim() === ''){
        return false;
      }
    }
  }

  function showValidate(input) {
    const thisAlert = $(input).parent();

    $(thisAlert).addClass('alert-validate');
  }

  function hideValidate(input) {
    const thisAlert = $(input).parent();

    $(thisAlert).removeClass('alert-validate');
  }

  /*==================================================================
  [ Show pass ]*/
  let showPass = 0;
  $('.btn-show-pass').on('click', function(){
    if(showPass === 0) {
      $(this).next('input').attr('type','text');
      $(this).find('i').removeClass('zmdi-eye');
      $(this).find('i').addClass('zmdi-eye-off');
      showPass = 1;
    }
    else {
      $(this).next('input').attr('type','password');
      $(this).find('i').addClass('zmdi-eye');
      $(this).find('i').removeClass('zmdi-eye-off');
      showPass = 0;
    }

  });


})(jQuery);




// Set constants and grab needed elements
const sidenavEl = $('.sidenav');
const gridEl = $('.grid');
const SIDENAV_ACTIVE_CLASS = 'sidenav--active';
const GRID_NO_SCROLL_CLASS = 'grid--noscroll';

function togglerClass(el, className) {
  if (el.hasClass(className)) {
    el.removeClass(className);
  } else {
    el.addClass(className);
  }
}

// User avatar dropdown functionality
function setUserDropdownListener() {
  const userAvatar = $('.header__avatar');
  userAvatar.on('click', function(e) {
    const dropdown = $(this).children('.dash__dropdown');
    togglerClass(dropdown, 'dropdown--active');
  });
}

// Sidenav list sliding functionality
function setSidenavListeners() {
  const subHeadings = $('.navList__subheading'); console.log('subHeadings: ', subHeadings);
  const SUBHEADING_OPEN_CLASS = 'navList__subheading--open';
  const SUBLIST_HIDDEN_CLASS = 'subList--hidden';

  subHeadings.each((i, subHeadingEl) => {
    $(subHeadingEl).on('click', (e) => {
      const subListEl = $(subHeadingEl).siblings();

      // Add/remove selected styles to list category heading
      if (subHeadingEl) {
        toggleClass($(subHeadingEl), SUBHEADING_OPEN_CLASS);
      }

      // Reveal/hide the sublist
      if (subListEl && subListEl.length === 1) {
        toggleClass($(subListEl), SUBLIST_HIDDEN_CLASS);
      }
    });
  });
}

// --------------------------------------------------------------------------------------------------------------

// Side Bar Chart

// Draw the chart
am4core.useTheme(am4themes_animated);

const chart = am4core.createFromConfig({
  // Reduce saturation of colors to make them appear as toned down
  "colors": {
    "saturation": 0.5
  },

  // Setting data
  "data": [{
    "course": "CSC 221",
    "attended": 100
  }, {
    "course": "CSC 222",
    "attended": 78
  }, {
    "course": "CSC 224",
    "attended": 89
  }, {
    "course": "CSC 227",
    "attended": 100
  }, {
    "course": "MAT 222",
    "attended": 75
  }, {
    "course": "MAT 228",
    "attended": 50
  }, {
    "course": "CSM 222",
    "attended": 100
  }, {
    "course": "GST 221",
    "attended": 85
  }, {
    "course": "GST 222",
    "attended": 65
  }, {
    "course": "EDS 221",
    "attended": 80
  }, {
    "course": "MDA 221",
    "attended": 43
  }, {
    "course": "TMC 221",
    "attended": 100
  }],

  // Add Y axis
  "yAxes": [{
    "type": "CategoryAxis",
    "renderer": {
      "minGridDistance": 20,
      "grid": {
        "location": 0
      }
    },
    "dataFields": {
      "category": "course"
    }
  }],

  // Add X axis
  "xAxes": [{
    "type": "ValueAxis",
    "renderer": {
      "maxLabelPosition": 1
    }
  }],

  // Add series
  "series": [{
    // Set type
    "type": "ColumnSeries",

    // Define data fields
    "dataFields": {
      "categoryY": "course",
      "valueX": "attended"
    },

    // Modify default state
    "defaultState": {
      "transitionDuration": 1000
    },

    // Set animation options
    "sequencedInterpolation": true,
    "sequencedInterpolationDelay": 100,

    // Modify color appearance
    "columns": {
      // Disable outline
      "strokeOpacity": 0,

      // Add adapter to apply different colors for each column
      "adapter": {
        "fill": function (fill, target) {
          return chart.colors.getIndex(target.dataItem.index);
        }
      }
    }
  }],

  // Enable chart cursor
  "cursor": {
    "type": "XYCursor",
    "behavior": "zoomY"
  }
}, "chartdiv", "XYChart");


function toggleClass(el, className) {
  if (el.hasClass(className)) {
    el.removeClass(className);
  } else {
    el.addClass(className);
  }
}

// If user opens the menu and then expands the viewport from mobile size without closing the menu,
// make sure scrolling is enabled again and that sidenav active class is removed
function addResizeListeners() {
  $(window).resize(function(e) {
    const width = window.innerWidth; console.log('width: ', width);

    if (width > 750) {
      sidenavEl.removeClass(SIDENAV_ACTIVE_CLASS);
      gridEl.removeClass(GRID_NO_SCROLL_CLASS);
    }
  });
}

// Menu open sidenav icon, shown only on mobile
function setMenuClickListener() {
  $('.header__menu').on('click', function(e) {
    toggleClass(sidenavEl, SIDENAV_ACTIVE_CLASS);
    toggleClass(gridEl, GRID_NO_SCROLL_CLASS);
  });
}

// Sidenav close icon
function setSidenavCloseListener() {
  $('.sidenav__brand-close').on('click', function(e) {
    toggleClass(sidenavEl, SIDENAV_ACTIVE_CLASS);
    toggleClass(gridEl, GRID_NO_SCROLL_CLASS);
  });
}
(function ($) {
  'use strict';
  /*==================================================================
      [ Daterangepicker ]*/
  try {
    $('.js-datepicker').daterangepicker({
      "singleDatePicker": true,
      "showDropdowns": true,
      "autoUpdateInput": false,
      locale: {
        format: 'DD/MM/YYYY'
      },
    });

    const myCalendar = $('.js-datepicker');
    let isClick = 0;

    $(window).on('click',function(){
      isClick = 0;
    });

    $(myCalendar).on('apply.daterangepicker',function(ev, picker){
      isClick = 0;
      $(this).val(picker.startDate.format('DD/MM/YYYY'));

    });

    $('.js-btn-calendar').on('click',function(e){
      e.stopPropagation();

      if(isClick === 1) isClick = 0;
      else if(isClick === 0) isClick = 1;

      if (isClick === 1) {
        myCalendar.focus();
      }
    });

    $(myCalendar).on('click',function(e){
      e.stopPropagation();
      isClick = 1;
    });

    $('.daterangepicker').on('click',function(e){
      e.stopPropagation();
    });


  } catch(er) {console.log(er);}
  /*[ Select 2 Config ]
      ===========================================================*/

  try {
    const selectSimple = $('.js-select-simple');

    selectSimple.each(function () {
      let that = $(this);
      const selectBox = that.find('select');
      const selectDropdown = that.find('.select-dropdown');
      selectBox.select2({
        dropdownParent: selectDropdown
      });
    });

  } catch (err) {
    console.log(err);
  }


})(jQuery);


