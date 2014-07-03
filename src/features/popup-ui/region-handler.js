
var regionHandler = {
	setup: function(root, options) {
        var self = this;
        
		if (!root) {
            throw new Error('missing root');
        }
		this.setRoot(root);
        this.setOptions(options);
        
        // popup disposal utilities
        ko.utils.registerEventHandler(this.root, 'click', function(e) {
            if (e.toElement === self.root) {
                self.clearRegion();
            }
        });
        ko.utils.registerEventHandler(document.body, 'keyup', function(e) {
            if (e.which === 27 && self.previous !== null) {
                e.preventDefault();
                e.stopPropagation();
                self.clearRegion();
            }
        });
        
	},
	update: function(node, viewmodel, options) {
        
        this.clearRegion();
        this.root.classList.add('active');
        
        
		var opt = options || {};
		if(node.nodeType === 11) {
			throw new Error('Document fragments are not allowed!\nIf you are trying to render a template, make sure it has only one root node!');
		}
        
		if (opt.noBinding) { return; }
		this.clearRegion();
		ko.applyBindings(viewmodel, node);
		this.root.appendChild(node);
        
		this.previous = {model: viewmodel, view: node};
	},
	clearRegion: function() {
		if(this.previous){
            this.root.classList.remove('active');
			ko.removeNode(this.previous.view);
			if(this.previous.model && this.previous.model.dispose) {
				this.previous.model.dispose();
			}
            this.previous = null;
		}
	},
	setRoot: function(root) {
		this.root = root;
	},
    setOptions: function(options) {
        this.options = options || {};
    }
};

module.exports = regionHandler;