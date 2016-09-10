# audio-player-html5-es5
Audio Player HTML5 ES5

## Example HTML Player
```html
<fieldset id="player" data-loop="true" data-autoplay="true" data-origin="anonymous">
  <legend>Audio Player</legend>
  <canvas id="analyser"></canvas>
  <div id="controls">
    <button type="button" data-control="play">Play</button>
    <button type="button" data-control="pause">Pause</button>
    <input type="range" name="volume" min="0.0" max="1" step="0.1" value="1">
    <input type="text" name="volval">
  </div>
  <div id="list">
    <select multiple name="list"></select>
  </div>
</fieldset>
```

## Example JS Player
```javascript
var musics = [{
  label: 'Raimundos - Baily Funk - Lapadas do Povo',
  value: 'src/musics/Raimundos-Baily_Funk.mp3'
},{
  label: 'Sepultura - Refuse Resist - Chaos A.D.',
  value: 'src/musics/Sepultura-Refuse_Resist.mp3'
}];
window.addEventListener('load', Player().init('player', musics), false);
```