module.exports = function (kibana) {
  return new kibana.Plugin({
    id: 'navigation',
    require: ['elasticsearch'],
  	uiExports: {
  		visTypes: ['plugins/navigation/navigation']
  	}
  });
};