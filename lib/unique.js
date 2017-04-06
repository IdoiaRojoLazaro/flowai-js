'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _uuidV = require('uuid-v4');

var _uuidV2 = _interopRequireDefault(_uuidV);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(0, _debug2.default)('flowai:unique');

// Private class

var Unique = function () {
  function Unique(key, value) {
    _classCallCheck(this, Unique);

    if (typeof key !== 'string' || key.length < 2) {
      throw new Error('Invalid key provided');
    }

    this._storageKey = key;
    (0, _debug2.default)('Creating a new Unique with key \'' + key + '\' and value \'' + value + '\'');

    if (typeof localStorage === "undefined" || localStorage === null) {
      (0, _debug2.default)('No LocalStorage (node) so creating one');
      var LocalStorage = require('node-localstorage').LocalStorage;
      this._localStorage = new LocalStorage('./unique');
    } else {
      this._localStorage = localStorage;
    }

    value && this._localStorage.setItem(this._storageKey, value);
  }

  _createClass(Unique, [{
    key: 'id',
    value: function id() {
      var uniqueId = this._localStorage.getItem(this._storageKey);
      if (!uniqueId) {
        // Remove dashes
        uniqueId = (0, _uuidV2.default)().replace(/-/g, '');

        (0, _debug2.default)('Creating a new uniqueId \'' + uniqueId + '\'');

        this._localStorage.setItem(this._storageKey, uniqueId);
      }

      (0, _debug2.default)('Returning uniqueId \'' + uniqueId + '\'');

      return uniqueId;
    }
  }]);

  return Unique;
}();

exports.default = Unique;