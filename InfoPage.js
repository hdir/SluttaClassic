const Observable = require('FuseJS/Observable');

var ids = 0;

this.Parameter.onValueChanged(module, function(param) {
    ids = param.data1;
});
module.exports = {
    info: this.Parameter.identity(),
}
