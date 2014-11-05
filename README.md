angular-text-select-restrict
============================

Prevents highlighting of text in input and textareas, Allows ranges, and regex pattern matching of text to allow highlighting.

Live demo + Usage
http://plnkr.co/edit/bbKRBl?p=preview

Usage
```html
<input type="text" value="blah blah blah" text-select-restrict />
<input type="text" value="blahb1123lah123124213asdfablah" text-select-restrict selector-allow-pattern="[0-9]+" />
<input type="text" value="blah blah blah" text-select-restrict selector-allow-start="2" />
<input type="text" value="blah blah blah" text-select-restrict selector-allow-end="5" />
<input type="text" value="blah blah blah" text-select-restrict selector-allow-start="2" selector-allow-end="5" />
<input type="password" value="blah blah blah" text-select-restrict selector-allow-start="2" selector-allow-end="5" />
<textarea text-select-restrict selector-allow-start="1" selector-allow-end="3" >More blah blah blah</textarea>
```
