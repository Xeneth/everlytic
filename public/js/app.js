/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1);
module.exports = __webpack_require__(2);


/***/ }),
/* 1 */
/***/ (function(module, exports) {

$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});

// Get the modals
var deletemodal = document.getElementById("deleteModal");
var addmodal = document.getElementById("addModal");

// When the user clicks on the delete icon, open the modal and set user ID for delete post
var deleteID = void 0;
$('.deleteBtn').click(function () {
    deleteID = this.id;
    deletemodal.style.display = "block";
});

// When the user clicks on cancel or the close button, close the modal
$('.close').click(function () {
    $('.success').empty();
    $('.errors').html('<ul></ul>');
    $('.confirmBtn').show();
    $('.saveBtn').show();
    $('#addUserForm').show();
    deletemodal.style.display = "none";
    addmodal.style.display = "none";
    window.location.reload(true);
});

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == addmodal || event.target == deletemodal) {
        $('.success').empty();
        $('.errors').html('<ul></ul>');
        $('.confirmBtn').show();
        $('.saveBtn').show();
        $('#addUserForm').show();
        deletemodal.style.display = "none";
        addmodal.style.display = "none";
    }
};

// When the user click delete confirm, do the ajax post and handle JSON response
$('.confirmBtn').click(function () {
    $('.confirmBtn').hide();
    $('.loader').show();
    $.ajax({
        type: "POST",
        dataType: 'json',
        url: "/destroy",
        data: {
            "id": deleteID
        },
        success: function success(data) {
            $('.loader').hide();
            $('.success').html(data.message);
        }
    });
});

// When the user clicks the New User button, open the modal
$('.addBtn').click(function () {
    addmodal.style.display = "block";
});

// When the user clicks save to Add User, do the ajax post and handle JSON response
$("#addUserForm").submit(function (event) {
    event.preventDefault();
    $('.errors').html('<ul></ul>');
    $('.saveBtn').hide();
    $('.loader').show();
    var data = $(this).serialize();
    $.ajax({
        type: "POST",
        dataType: 'json',
        url: "/store",
        data: data,
        success: function success(data) {
            if (data.success == 'true') {
                $('.loader').hide();
                $('#addUserForm').hide();
                $('.success').html(data.message);
            } else {
                $('.saveBtn').show();
                $('.loader').hide();
                $.each(data.errors, function (key, value) {
                    $(".errors").find("ul").append('<li>' + key + ': ' + value + '</li>');
                });
            }
        }
    });
});

/***/ }),
/* 2 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);