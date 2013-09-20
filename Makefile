LIBDIR=lib
BUILDDIR=dist

all: $(BUILDDIR)

$(LIBDIR): bower.json
	bower install

$(BUILDDIR): node_modules src $(LIBDIR) config.js Gruntfile.js
	grunt build

lint: node_modules
	grunt lint

node_modules: package.json
	npm install

clean:
	rm -rf node_modules $(LIBDIR) $(BUILDDIR)

.PHONY: lint
