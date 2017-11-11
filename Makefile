default: node_modules
	node index.js

serve:
	http-server build -p 8081

node_modules: package.json
	npm install

deploy:
	aws s3 sync build s3://www.gamedevtreasure.com \
		--cache-control max-age=86400 \
		--size-only \
		--acl public-read \
		--delete \
		--profile richtaur \
		--region us-west-2

deploy-all:
	aws s3 sync build s3://www.gamedevtreasure.com \
		--cache-control max-age=86400 \
		--acl public-read \
		--delete \
		--profile richtaur \
		--region us-west-2
