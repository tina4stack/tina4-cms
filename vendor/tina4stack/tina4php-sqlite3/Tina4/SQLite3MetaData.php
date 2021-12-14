<?php
/**
 * Tina4 - This is not a 4ramework.
 * Copy-right 2007 - current Tina4
 * License: MIT https://opensource.org/licenses/MIT
 */

namespace Tina4;

/**
 * Gets SQLite3 Metadata
 */
class SQLite3MetaData extends DataConnection implements DataBaseMetaData
{

    /**
     * Gets all the tables
     * @return array
     */
    final public function getTables(): array
    {
        $sqlTables = "select name as table_name
                        from sqlite_master
                       where type='table'
                    order by name";

        return $this->getConnection()->fetch($sqlTables, 1000, 0)->asObject();
    }

    /**
     * Gets the primary keys
     * @param string $tableName
     * @return array
     */
    final public function getPrimaryKeys(string $tableName): array
    {
        return [];
    }

    /**
     * Gets the foreign
     * @param string $tableName
     * @return array
     */
    final public function getForeignKeys(string $tableName): array
    {
        return [];
    }

    /**
     * Gets the table information
     * @param string $tableName
     * @return array
     */
    final public function getTableInformation(string $tableName): array
    {
        $tableInformation = [];

        $sqlInfo = "pragma table_info($tableName)";
        $columns = $this->getConnection()->fetch($sqlInfo, 10000)->asObject();

        foreach ($columns as $columnIndex => $columnData) {
            $fieldData = new \Tina4\DataField(
                $columnIndex,
                trim($columnData->name),
                trim($columnData->name),
                trim($columnData->type)
            );

            $fieldData->isNotNull = false;
            if ($columnData->notnull === 1) {
                $fieldData->isNotNull = true;
            }

            $fieldData->isPrimaryKey = false;
            if ($columnData->pk === 1) {
                $fieldData->isPrimaryKey = true;
            }

            $fieldData->isForeignKey = false;
            if (isset($foreignKeyLookup[$fieldData->fieldName])) {
                $fieldData->isForeignKey = true;
            }

            $fieldData->defaultValue = $columnData->dfltValue;
            $tableInformation[] = $fieldData;
        }

        return $tableInformation;
    }

    /**
     * Main function to get metadata
     * @return array
     */
    final public function getDatabaseMetaData(): array
    {
        $database = [];
        $tables = $this->getTables();

        foreach ($tables as $record) {
            $tableInfo = $this->getTableInformation($record->tableName);

            $database[strtolower($record->tableName)] = $tableInfo;
        }

        return $database;
    }
}