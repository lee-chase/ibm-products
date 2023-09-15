
#  Copyright IBM Corp. 2023, 2023
#  This source code is licensed under the Apache-2.0 license found in the
#  LICENSE file in the root directory of this source tree.

# Usage `sh update-disttags.sh <folder> <package>`
#  - param 1: folder/path to package.json e.g. packages/ibm-products
#  - param 2: package e.g. @carbon/ibm-products

# This script reads the current version number from package.json and the `latest` and `v1-latest`
# dist-tags from npm.
#
# If the package version does not match the `latest` on npm but does match `v1-latest` then
# the dist-tag `latest` is updated.

FOLDER=$1;
PACKAGE=$2;

cd $FOLDER;
VERSION=$(npm pkg get version --workspaces=false | tr -d \");
cd ../..
NPM_LATEST=$(npm dist-tag ls $PACKAGE@latest | grep ^latest | cut -d " " -f2);
NPM_V1_LATEST=$(npm dist-tag ls $PACKAGE@latest | grep ^v1-latest | cut -d " " -f2);

if [ "$VERSION" == "$NPM_LATEST" ]; then
  echo "No dist-tag update needed, \"$PACKAGE\" published as \"latest\""
elif [ "$VERSION" == "$NPM_V1_LATEST" ]; then
  echo "Correcting dist tags" $PACKAGE@$NPM_V1_LATEST latest;
  # npm dist-tag rm $PACKAGE v1-latest; No need to remove this
  npm dist-tag add $PACKAGE@$NPM_V1_LATEST latest;
else
  echo "Not sure what's happening. Here are the versions of \"$2\""
  echo "package version =" $VERSION
  echo "npm latest =" $NPM_LATEST
  echo "npm v1-latest =" $NPM_V1_LATEST
fi
