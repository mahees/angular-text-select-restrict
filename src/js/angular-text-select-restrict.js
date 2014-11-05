(function() {
	'use strict';

	var app = angular.module('text-select-restrict', []);

	app.constant('textSelectRestrictConfig', {

	});

	//usage input|textarea - anything that can select text
	//<ANY text-select-restrict /> - restricts any selections
	//<ANY text-select-restrict selector-allow-start="1" /> - allows selection of chars after the second char
	//<ANY text-select-restrict selector-allow-end="3" /> - allows selection of chars before the fourth char
	//<ANY text-select-restrict selector-allow-start="1" selector-allow-end="3" /> - allows selection of chars after the second and fourth char
	app.directive('textSelectRestrict', ['textSelectRestrictConfig',
	function(textSelectRestrictConfig) {
		return {
			restrict : 'A',
			link : function(scope, element, attrs, controller) {
				scope.updateSelection = function(e) {
					var elemVal = e.target.value;
					var start = 0, end = elemVal.length;

					!isAttrSet(attrs.selectorAllowEnd) || ( end = parseInt(attrs.selectorAllowEnd));
					!isAttrSet(attrs.selectorAllowStart) || ( start = parseInt(attrs.selectorAllowStart));

					if (attrs.selectorAllowPattern && attrs.selectorAllowPattern != "") {
						elemVal = elemVal.substring(start, end);
						var regEx = new RegExp(attrs.selectorAllowPattern);
						var matches = elemVal.match(regEx);
						if (matches && matches.length > 0) {
							start = start + elemVal.indexOf(matches[0]);
							end = start + matches[0].length;
						}
					}

					attrs.selectorAllowPattern || attrs.selectorAllowStart || attrs.selectorAllowEnd || ( start = end);

					scope.selectRange(element[0], start, end);
				};

				var isAttrSet = function(attr) {
					return (attr && attr != "" && parseInt(attr) >= 0);
				};

				scope.selectRange = function(e, start, end) {
					if (!e) {
						return;
					} else if (e.setSelectionRange) {
						e.focus();
						e.setSelectionRange(start, end);
					}/* WebKit */
					else if (e.createTextRange) {
						var range = e.createTextRange();
						range.collapse(true);
						range.moveEnd('character', end);
						range.moveStart('character', start);
						range.select();
					}/* IE */
					else if (e.selectionStart) {
						e.selectionStart = start;
						e.selectionEnd = end;
					}
				};

				element.on('select', scope.updateSelection);
			}
		};
	}]);
})(angular);
