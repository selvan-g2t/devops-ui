$(document).ready(function() {
    // Initialize the vertical navigation
    $().setupVerticalNavigation(true);

    function setUI(){
      // $("#listTable, .mid_list, #non-list-view").css({"height":(window.innerHeight-51)+"px", "overflow":"auto"});
      // $(".mid_list").css({"height":(window.innerHeight-51)-84+"px", "overflow":"auto"});
      var windowHeight = window.innerHeight;
	    var navHeight = $('nav.navbar').height()+1;
	    var h1_titleHeight = $('#h1_title').height()+1;
	    var finalHeight = (windowHeight-navHeight)-h1_titleHeight-5
	    $("#listTable, #non-list-view").css("height", finalHeight +"px");
    }

    window.onresize = function(){
      //alert('resize');
      setUI();
    }

  });

