$(document).ready(function() {
  var displayCtaLineCount = false;
  var displayCtaLineRodeCount = false;
  var displayCtaPercentRode = false;

  $('.expand').click(function() {
    var thisList = $(this).parent().parent().find('ul')

    if( thisList.is(":hidden") ) {
      thisList.slideToggle();
      $(this).text("-");
    }
    else {
      thisList.slideToggle();
      $(this).text("+");
    }
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
      $('.data').append("<p class=\"current-train-lines\">There are " + n + " train stops currently on the CTA.</p>");
      displayCtaLineCount = true;
    }
    else {
      $('.current-train-lines').text("There are " + n + " train stops  currently on the CTA.");
    }

    //Find how many lines the user has rode.
    var rode = $('.lines').find(".selected").length;
    console.log(rode);
    if (!displayCtaLineRodeCount) {
      $('.data').append("<p class=\"your-stats\">You've ridden " + rode + " train stops...</p>");
      displayCtaLineRodeCount = true;
    }
    else {
      $('.your-stats').text("You've ridden " + rode + " train stops...");
    }

    //Calculate percentage of train stops a user has visited.
    var percentRode = calculatePercentage(rode, n);
    console.log(percentRode);
    if (!displayCtaPercentRode) {
      $('.data').append("<p class =\"percentRode\">...which amounts to you riding <span class=\"percent-num\">" + percentRode + "%</span> of all the train lines available on the CTA!</p>");
      displayCtaPercentRode = true;
    }
    else {
      $('.percentRode').empty();
      $('.percentRode').append("...which amounts to you riding <span class=\"percent-num\">" + percentRode + "%</span> of all the train lines available on the CTA!");
    }

  });


  function calculatePercentage(linesRode, totalLinesAvailable) {
    if(linesRode > 0) {
      percent = ((linesRode / totalLinesAvailable) * 100).toFixed(1);
    }
    else {
      percent = 0;
    }

    return percent;
  };


  $('.selection').click(function() {
    var column = $(this).parent().find('ul').find('li');

    if(column.hasClass("selected")) {
      column.removeClass("selected");
    }
    else {
      column.addClass("selected");
    }
  });


});
