#!/bin/bash

migration_name=$1

migration_files="src/migrations/*.ts"
migration_out_dir="src/migrations/generated/"

TOOL_SCRIPT="./scripts/migration/tools.sh"
source $TOOL_SCRIPT

# This for generating the .ts version of the migration file using the 
# ormconfig.js file
$ts_node $typeorm migration:generate -n $migration_name

# This will transpile the .ts version of the migration 
# into .js file in the relative generated folder

# npx tsc --target $target \
# --module $module \
# --moduleResolution $moduleResolution \
# $migration_files --outDir $migration_out_dir