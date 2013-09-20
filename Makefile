LIBDIR=lib

all: dist

$(LIBDIR): bower.json
	bower install

dist: node_modules src $(LIBDIR) config.js lint
	grunt build

lint: node_modules
	grunt lint

node_modules: package.json
	npm install

clean:
	rm -rf node_modules $(LIBDIR)
