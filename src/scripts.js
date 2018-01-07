$(document).ready(function() {
    // Initialize the vertical navigation
    $().setupVerticalNavigation(true);
    // Collapse vertical navigation
    //$('.navbar-toggle').trigger('click');

    function setUI(){
      //
      var windowHeight = window.innerHeight;
	    var navHeight = $('nav.navbar').height()+1;
	    var h1_titleHeight = $('#h1_title').height()+1;
	    var finalHeight = (windowHeight-navHeight)-h1_titleHeight-5
	    $("#listTable, #non-list-view").css("height", finalHeight +"px");

    }

    window.onresize = function(){
      setUI();
    }

  });

