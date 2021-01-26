#!/bin/bash

TOOL_SCRIPT="./scripts/migration/tools.sh"
source $TOOL_SCRIPT

$ts_node $typeorm migration:revert