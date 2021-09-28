# ./tag.sh v0.1

npm run build
git add .
git commit -m "$1"
git tag -a -m "$1" $1
git push --follow-tags
