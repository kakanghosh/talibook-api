#!/bin/bash

migration_name=$1

TOOL_SCRIPT="./scripts/migration/tools.sh"
source $TOOL_SCRIPT

# This for generating the .ts version of the migration file using the 
# ormconfig.js file
$ts_node $typeorm migration:generate -n $migration_name