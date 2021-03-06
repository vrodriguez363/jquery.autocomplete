# JQuery Autocomplete plugin

This is a jQuery plugin to add autocomplete functionality to an element.

### Installation 

### Requirements
In order for jQuery.AutoComplete to work the jQuery library needs to be linked either through CDN:

```
<script src='http://code.jquery.com/jquery-x.x.x.js'></script>
```

or local copy:

```
<script src='/path/to/jquery-x.x.x.js'></script>
```

### Installation
Include script in your document using the following line:

```
<script src='/path/to/jquery.autocomplete.min.js'></script>
```

### Usage

Syntax: `$('#your-input-element').autocomplete({ url: 'your-url', callback: function(data_from_server){} });`

html
``` html
<input type="text" id="autocomplete" placeholder="search" autocomplete="off">
<div class="results">
    <ul>
    </ul>
</div>
```

js 
``` javascript
$('#autocomplete').autocomplete({
	url: '/you/url',
	callback: function (data) {
		$('.results ul').empty();
        for (var item in data) {
            if (data.hasOwnProperty(item)) {
                $('.results ul').append('<li>' + data[item].label + ':' + data[item].actor + '</li>');
            }
        }
	}
});
```