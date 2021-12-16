#!/bin/bash

echo -e "Script start..."

# Rebuilding just to make sure
echo -e "Rebuilding..."
npm run rebuild

# Check the format
echo -e "Checking format..."
npm run check-format

# Run a dry run
echo -e "Run a dry publish..."
npm publish --dry-run

# Prompt confirmation
read -e -p "Is everything valid ? [Y/n]: " -i y CONFIRMATION

[[ $CONFIRMATION == y ]] && npm publish || exit