all: lib node_modules

lib: bower.json
	bower install

lint: node_modules
	./node_modules/.bin/grunt

node_modules: package.json
	npm install

clean:
	rm -rf node_modules lib
