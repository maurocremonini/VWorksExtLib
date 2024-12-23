Array.prototype.forEach = function(callback){
    for(var i=0; i<this.length; i++){
        callback(this[i],i,this);
    }
}

Array.prototype.forEach2 = function(callback, thisArg){
    for(var i=0; i<this.length; i++){
        callback.apply(thisArg, [this[i], i, this]);
    }
}

Array.prototype.map = function(callback){
    var arr = [];
    for(var i=0; i<this.length; i++){
        arr.push(callback(this[i],i,this));
    }
    return arr;
}

Array.prototype.map2 = function(callback, thisArg){
    var arr = [];
    for(var i=0; i<this.length; i++){
        arr.push(callback.apply(thisArg, [this[i], i, this]));
    }
    return arr;
}

var myArr = [2,1,0];
var myStrArr = ["a","b","c"];
var callbk = function (el,ind,arr) {print(this[+el])};

print("for each original");
myArr.forEach(callbk);

print("for each new");
myArr.forEach2(callbk, myStrArr);

var myObj = {a: "letter A", b: "letter B", c: "letter C"};
var callbk2 = function (el,ind,arr) {print(el + " " + this[el])};
a = "global A";
b = "global B";
c = "global c";
print("for each orginal");
myStrArr.forEach(callbk2);
print("for each new");
myStrArr.forEach2(callbk2, myObj);

print("=== MAP ORIG=== ")
mapCallbk = function (el,ind,arr) {return(this[el])};
newArr = myStrArr.map(mapCallbk)
print(newArr)
print("=== MAP NEW=== ")
mapCallbk = function (el,ind,arr) {return(this[el])};
newArr = myStrArr.map2(mapCallbk, myObj)
print(newArr)

