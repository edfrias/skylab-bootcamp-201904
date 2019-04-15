'use strict';

/**
 *
 */
function Hooray() {
  var first = arguments[0];

  if (arguments.length === 1 && typeof first === 'number')
    if (parseInt(first) !== first) throw RangeError('Invalid hooray');
    else return this.length = first;

  for (var i = 0; i < arguments.length; i++) this[i] = arguments[i];
  this.length = arguments.length;
}

/**
* Adds a value at the end of an hooray, incrementing its length by 1.
*
* @param {*} value The value to push in the hooray.
*
* @returns {number} The length of the hooray after adding the new value.
*/
Hooray.prototype.push = function (value) {
  if (arguments.length > 0)
    for (var i = 0; i < arguments.length; i++)
      this[this.length++] = arguments[i];

  return this.length;
}

/**
 * Iterates the current hooray and evaluates an expression on each of its values.
 *
 * @param {Function} callback The expression to evaluate.
 */
Hooray.prototype.forEach = function (callback) {
  if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function');

  var self = this;

  this.length && (function forEach(index) {
      callback(self[index], index);

      if (++index < self.length)
          forEach(index);
  })(0);
}

/**
 * Function that lets you concatenate an array inside another array
 *
 * @returns {Array} The sum of the two arrays.
 */

Hooray.prototype.concat = function () {
  var arrayResult = new Hooray();

  for (var i = 0; i < arguments.length; i++) {
    var element = arguments[i];

    if (element instanceof Horray) {
      for(var j = 0; j < element.length; j++) {
        arrayResult[arrayResult.length] = element[j];
      }
    } else if(element.length !== 0) {
      arrayResult[arrayResult.length] = element;
    }
  }

  return arrayResult;
}

/**
 * Iterates a Hooray and evaluates an expression on each of its values, returning true if all of them match it. Otherwise returns false.
 *
 * @param {Function} callback The expression to evalute.
 *
 * @returns {boolean} True if all values match the expression, otherwise false.
 */

Hooray.prototype.every = function (callback) {
  if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function');

  for (var i = 0; i < this.length; i++)
    if (!callback(this[i])) return false;

  return true;
}

/**
 *
 * Function that filters a Hooray with a provided callback, and then returns a new Hooray in results.
 *
 * @param {Function} callback Function callback to filter the given array.
 *
 * @returns {Array} Hooray as a result after been filtered.
 */

Hooray.prototype.filter = function (callback) {
  if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function');

  var newArray = new Hooray;

  for (var i = 0; i < this.length; i++) {
    if (callback(this[i])) {
      newArray[newArray.length] = this[i];
    };
  }

  return newArray;
}

/**
 *
 * A function that returns the first index that corresponds with the position in the Hooray of the given value.
 *
 * @param {Value} element Element you want to search inside the provided array.
 *
 * @returns {Value} Value of the index from the element you search for.
 */

Hooray.prototype.indexOf = function (element) {
  if (element === undefined) throw TypeError(element + ' is not a valid element');
  if (typeof element !== 'number') throw TypeError(element + ' is not a valid element');

  var helperVal = 0;

  for(var i = 0; i < this.length; i++) {
    if(this[i] === element) {
      return helperVal >= i ? helperVal : helperVal = i;
    } else if (i === this.length-1){
      return -1;
    }
  }
}

/**
 * Function that evaluates if the parameter passed is a Hooray or not.
 *
 * @returns {boolean} True if any parameter match the array type.
 */

Hooray.prototype.isArray = function (element) {
  if (element === undefined) throw TypeError(element + ' is not a Hooray');

  return (element instanceof Hooray) ? true : false;
}

/**
 * Function that concatenate values from a Hooray and returns a string.
 *
 * @param {[string]} element Optional - If is given it will be inserted between array values.
 *
 * @return {string} The final string with the concatenated array.
 */
Hooray.prototype.join = function (element) {
  var helper = '';

  for (var i = 0; i < this.length; i++) {
    helper += this[i];

    if (i != (this.length-1)) {
      if(element) {
        helper += element;
      } else {
        helper += ',';
      }
    }
  }

  return helper;
}

/**
 *
 * Function that search an element inside a Hooray and if its in it then returns its last position, otherwise it will returns -1.
 *
 * @param {element} element Any element you want to find inside an array.
 *
 * @returns {Number} It will returns the last position in which you find the given element.
*/
Hooray.prototype.lastIndexOf = function (element) {
  if (element === undefined) throw TypeError(element + ' is not a valid element');

  var helperVal = 0;

  for(var i = this.length-1; i >= 0; i--) {
    if(this[i] === element) {
      return helperVal > i ? helperVal : i;
    } else if (i === 0){
      return -1;
    }
  }
}

/**
 * Function that creates a new array as a result of apply a callback above each element inside an given array.
 *
 * @param {Array} array The array where to apply our callback.
 * @param {function} callback Function that will be applied to each element inside the given array.
 *
 * @returns Array as a result of the callback over the given array elements.
 */
Hooray.prototype.map = function (callback) {
  if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function');

  var helperArray = [];

  for (var i = 0; i < this.length; i++) {
    helperArray[i] = callback(this[i]);
  }

  return helperArray;
}

/**
 * Function that will return the given Hooray without its last value.
 *
 * @param {Array} array The given array.
 *
 * @returns An array without its last value.
*/

Hooray.prototype.pop = function () {
  if (this.length) {
    this.length-=1;

    return this;
  }
}

/**
 *
 * Function that adds a new element/s to the given Hooray and returns the new length of it.
 *
 * @param {*} element The desired element to add.
 *
 * @returns The hooray's new length.
*/

Hooray.prototype.push = function (element) {
  if (element === undefined) throw TypeError(element + ' is not a valid element');

  if (arguments.length > 1) {
    for(var i = 1; i < arguments.length; i++) {
      this[this.length] = arguments[i];
    }
  } else {
    this[this.length] = element;
  }

  return this.length;
};

/**
 *
 * Function that applies a callback into an accumulator from right to left. Then it returns a unique value.
 *
 * @param {Function} callback Function that will transform each array value.
 * @param {[Value]} initialValue Optional - If passed, it will be the first item to transform.
 *
 * @returns The product of the callback over the accumulator.
 */

Hooray.prototype.reduceRight = function (callback, initialValue) {
  if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function');

  var arrLength = this.length-1;
  var i = arrLength - 1;
  var prevValue = this[arrLength];
  var currentValue = this[arrLength-1];

  if (initialValue) {
    i = arrLength;
    prevValue = initialValue;
  }

  for (i; i >= 0; i--) {
    currentValue = this[i];
    prevValue = callback(prevValue, currentValue);
  }

  return prevValue;
}

/**
 *
 * Function that applies a callback into an accumulator. Then it returns a unique value.
 *
 * @param {function} callback Function that will transform each array value.
 * @param {[Value]} initialValue Optional - If passed, it will be the first item to transform.
 *
 * @returns The product of the callback over the accumulator.
 */

Hooray.prototype.reduce = function (callback, initialValue) {
  if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function');

  var i = 1;
  var prevValue = this[0];
  var currentValue = this[1];

  if (initialValue) {
    i = 0;
    prevValue = initialValue;
  }

  for (i; i < this.length; i++) {
    currentValue = this[i];
    prevValue = callback(prevValue, currentValue);
  }

  return prevValue;
}

/**
 * Function that given a Hooray it will returns a new Hooray reversed.
 *
 * @returns {Array} The new array reversed!
 */

Hooray.prototype.reverse = function () {
  var newArray = new Hooray;

  // helper Hooray to flip the original Hooray
  for( var i = this.length-1; i >= 0; i--) {
    newArray[newArray.length] = this[i];
  }

  // here you overwrite the original Hooray values
  for(var i = 0; i < newArray.length; i++) {
    this[i] = newArray[i];
  }

  return this;
}

/**
 * Function that gets the first item inside of a Hooray and return it, it also modify the length of the given Hooray.
 *
 * @returns The element that you want to extract from the Hooray.
 */

Hooray.prototype.shift = function () {
  if (this.length !== 0) {
    var returnedEelement = this[0];
    var arrayHelper = this;

    for (var i = 0; i < this.length; i++) {
      this[i] = arrayHelper[i+1];
    }

    this.length = this.length-1;

    return returnedEelement;
  }

  return;
}

/**
 *
 * Function that returns a Hooray that's a copy from the Hooray given from start to end.
 *
 * @param {number} start The index where to start taking elements.
 * @param {number} end The end where to stop taking elements.
 *
 * @returns New array with the content from start to end.
 */
Hooray.prototype.slice = function (start, end){
  if (typeof start !== 'number') throw TypeError(start + ' is not a number');
  if (typeof end !== 'number') throw TypeError(end + ' is not a number');

  if (start === 0) { // star is 0
    if(end === 'undefined') { // end is undefined and nothing applies to the array
      return this;
    } else if (end > 0 || end >= this.length) { // end is at least 1 or gretaer than Hooray.length
      var helperArray = [];
      for(var i = 0; i < end; i++) {
        helperArray[helperArray.length] = this[i];
      }
      return helperArray;
    }
  } else if (start >= this.length) { // start is Hooray.length or greater then nothing is done
    return new Hooray;
  } else if (start > 0) { // start is greater than 0
    if (end >= 1) { // end is positive
      var helperArray = [];
      for(var i = start; i < end; i++) {
        helperArray[helperArray.length] = this[i];
      }
      return helperArray;
    } else if (end < 0) { // end is negative index
      var helperArray = [];
      for(var i = start; i < (this.length+end); i++) {
        helperArray[helperArray.length] = this[i];
      }
      return helperArray;
    }
  } else if (start < 0) { // start is negative
    if (end >= 0 || Math.abs(end) >= Math.abs(start)) { // end is 0, positive value or greater than start, we return empty Hooray.
      return new Hooray;
    } else if (end < 0) { // end is negative but smaller than start
      var helperArray = [];
      for(var i = this.length+start; i <= (this.length-1)+end; i++) {
        helperArray[helperArray.length] = this[i];
      }

      return helperArray;
    }
  }
};

/**
 * Iterates a Hooray and evaluates if a number match with the given function. Otherwise it returns false.
 *
 * @param {function} callback The expression to evaluate.
 *
 * @returns {boolean} True if any number match the expression.
 */

Hooray.prototype.some = function (callback) {
  if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function');

  for (var i = 0; i < this.length; i++)
    if (callback(this[i])) return true;

  return false;
}

/**
 *
 * Function that sort elements and then return the resulting Hooray.
 *
 * @returns The array sorted.
 */
Hooray.prototype.sort = function (callback){
  if (arguments.length > 1 && (typeof callback !== 'function')) throw TypeError(callback + ' is not a function');

  var arrayLength = this.length;

  for (var j = 0; j < arrayLength-1; j++) {
    for (var i = 0; i < arrayLength; i++) {
      if (callback) {
        callback(this[i], this[i+1]);
      } else if (this[i] > this[i + 1]) {
        var swap = this[i + 1];
        this[i + 1] = this[i];
        this[i] = swap;
      }
    }
  }

  return this;
}

/**
 *
 * Function that changes the content of a Hooray by deleting/adding new elements.
 *
 * Disclaimer: This function has the dependency of reverse and concat functions, it won't work without them
 *
 * @param {number} startCount Number to indicate where to start modifying the array.
 * @param {numer} deleteCount Number to indicate how much elements to delete.
 * @param {*} elements If you want to add more elements put them here.
 *
 * @returns The given array modified.
 */

Hooray.prototype.splice = function (startCount, deleteCount) {
  if (typeof startCount !== 'number') throw TypeError(startCount + ' is not a number');

  if (arguments.length === 2) { // Only start provided
    if(startCount >= this.length) {
      return new Hooray; // no transformations over array
    } else if (startCount === 0) { // starCount is 0 or is negative and >= this.length
      var helperArray = [];
      for(var i = 0; i < this.length; i++) {
        helperArray[helperthis.length] = array[i];
      }
      this.length = 0; // all array is cleared
      return helperArray;
    } else if (startCount < 0) {
      if (Math.abs(startCount) >= this.length) { // If (negative startCount) is greater than this.length all array is cleared and the return is the entire this.
        var helperArray = [];
        for(var i = 0; i < this.length; i++) {
          helperArray[helperthis.length] = array[i];
        }
        this.length = 0;
        return helperArray;
      } else { // if (negative startCount) < this.length
        var helperArray= [];
        for (var i = this.length-1; i >= (this.length + startCount); i--) {
          helperArray[helperArray.length] = this[i];
        }

        this.length = (this.length + startCount);

        // As the resulting array was inverted I'm using the reverse function already done,
        // so this is why this can't work if the reverse.js isn't loaded before splice.
        return reverse(helperArray);
      }
    } else if (startCount < this.length) {
      var helperArray= [];

      for (var i = this.length-1; i > (startCount-1); i--) {
        helperArray[helperArray.length] = this[i];
      }

      this.length = startCount;

      // As the resulting array was inverted I'm using the reverse function already done,
      // so this is why this can't work if the reverse.js isn't loaded before splice.
      return reverse(helperArray);
    }
  } else if (arguments.length >= 3) { // Start and Delete provided and maybe some arguments!
    var positionZero = startCount === 0 || (startCount < 0 && Math.abs(startCount) >= this.length);

    // If there are some, store the arguments to fill the array
    var newItems = [];
    for (var y = 3; y <= arguments.length-1; y++) {
      newItems[newItems.length] = arguments[y];
    }

    if (deleteCount === 0 || typeof deleteCount !== 'number') { // deleteCount is 0 or !== number we don't erase but if there are arguments we added to the array
      if(newItems.length === 0) { // No items to add
        return new Hooray;
      } else {
        var positionZero = startCount === 0 || (startCount < 0 && Math.abs(startCount) >= array.length); // startCount === 0 || (-startCount) > array-length _ example array.length = 10 starCount = -11

        if (positionZero) { // startCount 0 or -array.length && deleteCount === 0  | Insert in the start
          var helperArray = [];
          for (var z = 0; z <= this.length-1; z++) { // Save the original array for later
            helperArray[helperArray.length] = this[z];
          }

          for (var i = 0; i <= newItems.length-1; i++) { // Overwriting elements in the given array with the new elements
            this[i] = newItems[i];
          }

          for (var j = 0; j <= helperArray.length-1; j++) { // Adding the original array again
            this[(newItems.length)+j] = helperArray[j];
          }

          return new Hooray;
        } else if (startCount >= 1) { //startCount !== 0 && deleteCount === 0 | Insert in the middle
          var helperArray = [];
          var arrayStart = [];
          var arrayEnd = [];

          for (var i = 0; i <= startCount-1; i++) { // The start of the array
            arrayStart[arrayStart.length] = this[i];
          }

          for (var q = startCount; q <= this.length-1; q++) { // The end of the array
            arrayEnd[arrayEnd.length] = this[q];
          }

          var resultingArray = concat(arrayStart, newItems, arrayEnd);

          for (var x = 0; x <= resultingArray.length-1; x++) {
            this[x] = resultingArray[x];
          }

          this.length = resultingArray.length; // The array given is modified with the resulting array

          return new Hooray; // The function returns an empty array given that we are not deleting anything
        }
      }
    } else if (positionZero && deleteCount !== 0) { // startCount is 0 or greater than array.length and deleteCount is greater than 0
      var arrayEnd = [];
      var helperArray = [];

      for (var i = 0; i <= deleteCount-1; i++) { // The returning array is what we have deleted
        helperArray[helperArray.length] = this[i];
      }

      for (var i = deleteCount; i <= this.length-1; i++) { // We store the rest of the array that is not deleted
        arrayEnd[arrayEnd.length] = this[i];
      }

      for (var i = 0; i <= arrayEnd.length-1; i++) { // Here the array given is reassigned with arrayEnd
        this[i] = arrayEnd[i];
      }

      this.length = arrayEnd.length; // We change here the length of the resulting array

      return helperArray; // The deleted part of the array is returned

    } else if (deleteCount > (this.length - startCount)) { // If deleteCount is > array.length we delete all
      var helperArray = [];
      for (var z = 0; z <= this.length-1; z++) { // The returning array is what we have deleted
        helperArray[helperArray.length] = this[z];
      }
      this.length = 0;

      return helperArray;

    } else if (startCount >= 1 && deleteCount >= 1) { // startCount is >= 0 && deleteCount is a number between 1 and array.length-1
      var helperArray = [];
      var arrayStart = [];
      var arrayEnd = [];

      for (var i = 0; i <= startCount-1; i++) { // The start of the array that is not deleted
        arrayStart[arrayStart.length] = this[i];
      }

      for (var j = startCount; j <= (startCount + deleteCount)-1; j++) { // The returning array is what we have deleted
        helperArray[helperArray.length] = this[j];
      }

      for (var q = (startCount + deleteCount); q <= this.length-1; q++) { // The end of the array that is not deleted
        arrayEnd[arrayEnd.length] = this[q];
      }

      var resultingArray = concat(arrayStart, newItems, arrayEnd);

      for (var x = 0; x <= resultingArray.length-1; x++) {
        this[x] = resultingArray[x];
      }

      this.length = resultingArray.length; // The array given is modified with the resulting array after been deleted one part of it

      return helperArray; // The deleted part of the array is returned
    } else if (startCount < 0 && deleteCount >= 1) { // startCount is negative and < array.length && deleteCount is greater than 0
      var helperArray = [];
      var arrayStart = [];
      var arrayEnd = [];

      for (var i = this.length-1; i >= (this.length+startCount+deleteCount); i--) { // The end of the array that is not deleted
        arrayEnd[arrayEnd.length] = this[i];
      }

      for (var q = (this.length + startCount); q <= (this.length - deleteCount)-1; q++) { // The part deleted of the array
        helperArray[helperArray.length] = this[q];
      }

      for (var i = (this.length + startCount)-1; i >= 0; i--) { // The start of the array that is not deleted
        arrayStart[arrayStart.length] = this[i];
      }

      var resultingArray = concat(reverse(arrayStart), newItems, reverse(arrayEnd));

      return helperArray; // The deleted part of the array is returned
    }
  }
}
