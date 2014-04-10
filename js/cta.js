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
    var stopName = $(this).text();
    if( $(this).hasClass("transfer") ) {
      if( $(this).hasClass("selected") ) {
        $(this).removeClass("selected");
        $('li:contains(' + stopName + ')' ).removeClass("selected");
      }
      else {
        $(this).addClass("selected");
        $('li:contains(' + stopName + ')' ).addClass("selected");
      }
    }
    else {
      if( $(this).hasClass("selected") ) {
        $(this).removeClass("selected");
      }
      else {
        $(this).addClass("selected");
      } 
    }
  });

  $('.selection').click(function() {
    var column = $(this).parent().find('ul').find('li');
    var stopsArray = [];

    if(column.hasClass("selected")) {
      column.each(function() {
        if( $(this).hasClass("transfer") ) {
          stopsArray.push($(this).text());
        }
      });
      $.each(stopsArray, function(index, value) {
        $("li").filter(function() {
          return $(this).text() === value;
        }).removeClass("selected");
      });
      column.removeClass("selected");
    }
    else {

      column.each(function() {
        if( $(this).hasClass("transfer") ) {
          stopsArray.push($(this).text());
        }
      });
      $.each(stopsArray, function(index, value) {
        $("li").filter(function() {
          return $(this).text() === value;
        }).addClass("selected");
      });
      column.addClass("selected");
    }
  });



  $('.percentage-button').click(function() {
    var rodeRed = $('#red-line').find( ".selected" ).length;
    var rodeBlue = $('#blue-line').find( ".selected" ).length;
    var rodeBrown = $('#brown-line').find( ".selected" ).length;
    var rodeGreen = $('#green-line').find( ".selected" ).length;
    var rodeOrange = $('#orange-line').find( ".selected" ).length;
    var rodePurple = $('#purple-line').find( ".selected" ).length;
    var rodePink = $('#pink-line').find( ".selected" ).length;
    var rodeYellow = $('#yellow-line').find( ".selected" ).length;


    generateChart(rodeRed, rodeBlue, rodeBrown, rodeGreen, rodeOrange, rodePurple, rodePink, rodeYellow);
    generateBarGraphChart(rodeRed, rodeBlue, rodeBrown, rodeGreen, rodeOrange, rodePurple, rodePink, rodeYellow);


    $('.chart').fadeIn("slow");

    //Find how many lines are currently available to ride.
    var n = $('.lines').find( $('li') ).length;
    if (!displayCtaLineCount) {
      $('.data').append("<p class=\"current-train-lines\">There are " + n + " train stops currently on the CTA.</p>");
      displayCtaLineCount = true;
    }
    else {
      $('.current-train-lines').text("There are " + n + " train stops  currently on the CTA.");
    }

    //Find how many lines the user has rode.
    var rode = $('.lines').find(".selected").length;

    if (!displayCtaLineRodeCount) {
      $('.data').append("<p class=\"your-stats\">You've ridden " + rode + " train stops...</p>");
      displayCtaLineRodeCount = true;
    }
    else {
      $('.your-stats').text("You've ridden " + rode + " train stops...");
    }

    //Calculate percentage of train stops a user has visited.
    var percentRode = calculatePercentage(rode, n);

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


  function generateChart(r, bl, br, g, o, pu, pi, y) {
    context = document.getElementById('percentageChart').getContext('2d');
    var Radar = {};
    var data = {
      labels : ["Red Line","Blue Line","Brown Line","Green Line","Orange Line","Purple Line","Pink Line","Yellow Line"],
      datasets : [
        {
          fillColor : "rgba(151,187,205,0.5)",
          strokeColor : "rgba(151,187,205,1)",
          pointColor : "rgba(151,187,205,1)",
          pointStrokeColor : "#fff",
          data : []
        }
      ]
    }

    data.datasets[0].data = [r, bl, br, g, o, pu, pi, y];
    new Chart(context).Radar(data);
  }

  function generateBarGraphChart(r, bl, br, g, o, pu, pi, y) {
    barGraph = document.getElementById('barGraphChart').getContext('2d');
    var Bar = {};
    var data = {
      labels : ["Red Line","Blue Line","Brown Line","Green Line","Orange Line","Purple Line","Pink Line","Yellow Line"],
      datasets : [
        {
          fillColor : "rgba(151,187,205,0.5)",
          strokeColor : "rgba(151,187,205,1)",
          data : []
        }
      ]
    }

    Bar.defaults = { 
      scaleShowLabels : true,
      scaleShowGridLines : false,
      scaleOverride : true,
      scaleSteps : 33,
      scaleStepWidth : 1,
        scaleStartValue : 0
    }

    data.datasets[0].data = [r, bl, br, g, o, pu, pi, y];
    new Chart(barGraph).Bar(data, Bar.defaults);
  }

});
