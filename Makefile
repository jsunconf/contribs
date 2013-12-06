deploy:
	@rm -rf ~/build
	@mkdir ~/build
	@cp -r . ~/build
	@cd ~/build && sed '/public\/css\/*/d' .gitignore > .gitignore && grunt less:production && git init . && git add . && git commit -m \"Deployment\" -n && \
	git aws.push && rm -rf .git
	@rm -rf /build
