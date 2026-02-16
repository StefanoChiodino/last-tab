.PHONY: pack clean

pack: last-tab.zip

last-tab.zip: manifest.json background.js icons/icon16.png icons/icon48.png icons/icon128.png
	@rm -f $@
	python3 -c "import zipfile,sys; z=zipfile.ZipFile('$@','w',zipfile.ZIP_DEFLATED); [z.write(f) for f in sys.argv[1:]]; z.close()" $^

clean:
	rm -f last-tab.zip
