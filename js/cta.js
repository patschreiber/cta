$(document).ready(function() {
  var displayCtaLineCount = false;
  var displayCtaLineRodeCount = false;

  $('.expand').click(function() {
    $(this).parent().parent().find('ul').slideToggle();
  });

  $('li').click(function() {

    if( $(this).hasClass("selected") ) {
      $(this).removeClass("selected");
    }
    else {
      $(this).addClass("selected");
    } 
  });



  $('.percentage-button').click(function() {
    console.log(displayCtaLineCount);
    //Find how many lines are currently available to ride.
    var n = $('.lines').find( $('li') ).length;
    console.log(n);
    if (!displayCtaLineCount) {
      $('.data').append("<p class=\"current-train-lines\">There are " + n + " train lines currently on the CTA.</p>");
      displayCtaLineCount = true;
    }
    else {
      $('.current-train-lines').text("There are " + n + " train lines currently on the CTA.");
    }

    //Find how many lines the user has rode.
    var rode = $('.lines').find(".selected").length;
    console.log(rode);
    if (!displayCtaLineRodeCount) {
      $('.data').append("<p class=\"your-stats\">You've ridden " + rode + " train lines.</p>");
      displayCtaLineRodeCount = true;
    }
    else {
      $('.your-stats').text("You've ridden " + rode + " train lines.");
    }

    //Calculate percentage of train stops a user has visited.
    calculatePercentage(n, rode);

  });


  function calculatePercentage(totalLines, linesRode) {
    percent = linesRode / totalLines;
    return percent;
  };


});
