<?php
/**
 * Tina4 - This is not a 4ramework.
 * Copy-right 2007 - current Tina4
 * License: MIT https://opensource.org/licenses/MIT
 */

namespace Tina4;

/**
 * SQlite3 Query
 */
class SQLite3Query extends DataConnection implements DataBaseQuery
{

    /**
     * Run a SQLite3 Query
     * @param $sql
     * @param int $noOfRecords
     * @param int $offSet
     * @param array $fieldMapping
     * @return DataResult|null
     */
    final public function query($sql, int $noOfRecords = 10, int $offSet = 0, array $fieldMapping = []): ?DataResult
    {
        //check for one liners and reserved methods in sqlite3
        if (stripos($sql, "pragma") === false && stripos($sql, "returning") === false) {
            $countRecords = $this->getDbh()->querySingle("select count(*) as count from (" . $sql . ")");
            $sql .= " limit {$offSet},{$noOfRecords}";
        } else {
            $countRecords = 1;
        }

        $recordCursor = $this->getDbh()->query($sql);
        $records = [];
        if (!empty($recordCursor)) {
            while ($recordArray = $recordCursor->fetchArray(SQLITE3_ASSOC)) {
                if (!empty($recordArray)) {
                    $records[] = (new DataRecord($recordArray, $fieldMapping, $this->getConnection()->getDefaultDatabaseDateFormat(), $this->getConnection()->dateFormat));
                }
            }
        }

        if (!empty($records)) {
            //populate the fields
            $fid = 0;
            $fields = [];
            foreach ($records[0] as $field => $value) {
                $fields[] = (new DataField($fid, $recordCursor->columnName($fid), $recordCursor->columnName($fid), $recordCursor->columnType($fid)));
                $fid++;
            }

            $error = new DataError("0", "none");
        } else {
            $records = null;
            $fields = null;
            $error = $this->getConnection()->error();
        }

        return (new DataResult($records, $fields, $countRecords, $offSet, $error));
    }
}