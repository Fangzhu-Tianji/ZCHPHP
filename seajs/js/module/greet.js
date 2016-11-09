
// define(function (require, exports) {
//     function helloPython() {
//         document.write("Hello,Python");
//     }
//     function helloJavaScript() {
//         document.write("Hello,JavaScript");
//     }
//     exports.helloPython = helloPython;
//     exports.helloJavaScript = helloJavaScript;
// });

define(function(require,exports) {
	function hellowPython() {
		console.log("Hello,Python");
	}
	function hellowJavascript() {
		console.log("Hello,JavaScript");
	}
	exports.hellowPython = hellowPython;
	exports.hellowJavascript = hellowJavascript;
})