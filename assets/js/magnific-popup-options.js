$(document).ready(function() {
    // MagnificPopup
    var magnifPopup = function() {
      $('.popup-image').magnificPopup({
        type: 'image',
        removalDelay: 300,
        mainClass: 'mfp-with-zoom',
        gallery:{
          enabled:true
        },
        zoom: {
          enabled: true, // By default it's false, so don't forget to enable it
  
          duration: 300, // duration of the effect, in milliseconds
          easing: 'ease-in-out', // CSS transition easing function
  
          // The "opener" function should return the element from which popup will be zoomed in
          // and to which popup will be scaled down
          // By defailt it looks for an image tag:
          opener: function(openerElement) {
          // openerElement is the element on which popup was initialized, in this case its <a> tag
          // you don't need to add "opener" option if this code matches your needs, it's defailt one.
          return openerElement.is('img') ? openerElement : openerElement.find('img');
          }
        }
      });
    };

    var anotherImagePopup = function() {
        $('.another-img-popup').magnificPopup({
          type: 'image', // Keep this as 'image' to display images
          removalDelay: 300,
          mainClass: 'mfp-with-zoom',
          gallery: {
            enabled: true
          },
          zoom: {
            enabled: true,
            duration: 300,
            easing: 'ease-in-out',
            opener: function(openerElement) {
              return openerElement.is('img') ? openerElement : openerElement.find('img');
            }
          }
        });
      };
  
    
      var resumepopup = function() {
        $('.resume-popup').magnificPopup({
          type: 'image', // Adjust the type as needed
          removalDelay: 300,
          mainClass: 'mfp-with-zoom',
          gallery: {
            enabled: true
          },
          zoom: {
            enabled: true,
            duration: 300,
            easing: 'ease-in-out',
            opener: function(openerElement) {
              return openerElement.is('a') ? openerElement : openerElement.find('img');
            }
          }
        });
      };

    // Call the functions 
    magnifPopup();
    anotherImagePopup();
    resumepopup();
  });