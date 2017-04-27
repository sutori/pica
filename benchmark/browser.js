/* global $, Benchmark */
/* eslint-disable strict, no-console */

$(function () {
  var samples = [
    {
      width: 3200,
      height: 2500
    },
    {
      width: 800,
      height: 800
    },
    {
      width: 50,
      height: 50
    },
    {
      width: 1,
      height: 1
    }
  ];

  var js = window.pica({ features: [ 'js' ] });
  var ww = window.pica({ features: [ 'ww' ] });
  var wasm = window.pica({ features: [ 'wasm' ] });
  var cib = window.pica({ features: [ 'js', 'cib' ] });

  var suite = new Benchmark.Suite;

  samples.forEach(function(sample) {
    sample.buffer = new Uint8Array(sample.width * sample.height * 4);

    suite.add(`Resize of ${sample.width}x${sample.height} (JS)`, {
      defer: true,
      fn: function (defer) {
        js.resizeBuffer({
          src:      sample.buffer,
          width:    sample.width,
          height:   sample.height,
          toWidth:  (sample.width * 0.15)|0,
          toHeight: (sample.height * 0.15)|0,
          quality:  3
        })
          .then(() => defer.resolve());
      }
    })

    .add(`Resize of ${sample.width}x${sample.height} (WW)`, {
      defer: true,
      fn: function (defer) {
        ww.resizeBuffer({
          src:      sample.buffer,
          width:    sample.width,
          height:   sample.height,
          toWidth:  (sample.width * 0.15)|0,
          toHeight: (sample.height * 0.15)|0,
          quality:  3
        })
          .then(() => defer.resolve());
      }
    })

    .add(`Resize of ${sample.width}x${sample.height} (WASM)`, {
      defer: true,
      fn: function (defer) {
        wasm.resizeBuffer({
          src:      sample.buffer,
          width:    sample.width,
          height:   sample.height,
          toWidth:  (sample.width * 0.15)|0,
          toHeight: (sample.height * 0.15)|0,
          quality:  3
        })
          .then(() => defer.resolve());
      }
    })

    .add(`Resize of ${sample.width}x${sample.height} (CIB)`, {
      defer: true,
      fn: function (defer) {
        cib.resizeBuffer({
          src:      sample.buffer,
          width:    sample.width,
          height:   sample.height,
          toWidth:  (sample.width * 0.15)|0,
          toHeight: (sample.height * 0.15)|0,
          quality:  3
        })
          .then(() => defer.resolve());
      }
    });
  });

  suite.on('cycle', event => {
    var $el = $('<p></p>');

    $el.text(`> ${event.target}`);
    $('body').append($el);

    console.log(`> ${event.target}`);
  })
  .run();
});
