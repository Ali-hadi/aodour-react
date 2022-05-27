f [ $TRAVIS_BRANCH == 'master' ] ; then
  eval "$(ssh-agent -s)"
  ssh-add
  npm run build
  rsync -rq --delete --rsync-path="mkdir -p react-app && rsync" \
  $TRAVIS_BUILD_DIR/var/www/html/devwebsite deploy@139.162.47.4:react-app
else
  echo " Not deploying, since this branch isn't master."
fi