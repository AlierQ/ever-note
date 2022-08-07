rm -rf dist &&
yarn build &&
cd dist &&
git init &&
git add . &&
git commit -m "commit page" &&
git branch -m main &&
git remote add origin git@github.com:AlierQ/evernote-page.git &&
git push -u -f origin main &&
cd -