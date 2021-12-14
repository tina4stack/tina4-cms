<?php
/**
 * Tina4 - This is not a 4ramework.
 * Copy-right 2007 - current Tina4
 * License: MIT https://opensource.org/licenses/MIT
 */

namespace Tina4;

/**
 * The SQLite3 functionality
 * @package Tina4
 */
class DataSQLite3 implements DataBase
{
    use DataBaseCore;

    /**
     * Open an SQLite3 connection
     */
    final public function open(): void
    {
        $this->dbh = (new SQLite3Connection($this->databaseName))->getConnection();
    }

    /**
     * Closes the SQLite3 connection
     */
    final public function close()
    {
        $this->dbh->close();
    }

    /**
     * Executes a query
     * @return mixed
     */
    final public function exec()
    {
        $params = $this->parseParams(func_get_args());
        $params = $params["params"];

        if (isset($params[0]) && stripos($params[0], "returning") !== false) {
            return $this->fetch($params[0]);
        }

        (new SQLite3Exec($this))->exec($params, null);

        return $this->error();
    }

    /**
     * Error from the database
     * @return DataError
     */
    final public function error(): DataError
    {
        return (new DataError($this->dbh->lastErrorCode(), $this->dbh->lastErrorMsg()));
    }

    /**
     * Check if table exists
     * @param string $tableName
     * @return bool
     */
    final public function tableExists(string $tableName): bool
    {
        if (!empty($tableName)) {
            $exists = $this->fetch("SELECT name FROM sqlite_master WHERE type='table' AND name = '{$tableName}'");
            return !empty($exists->records);
        }

        return false;
    }

    /**
     * Native fetch for SQLite
     * @param string $sql
     * @param int $noOfRecords
     * @param int $offSet
     * @param array $fieldMapping
     * @return DataResult
     */
    final public function fetch($sql = "", int $noOfRecords = 10, int $offSet = 0, array $fieldMapping = []): DataResult
    {
        return (new SQLite3Query($this))->query($sql, $noOfRecords, $offSet, $fieldMapping);
    }

    /**
     * The default date format for this database type
     * @return string
     */
    final public function getDefaultDatabaseDateFormat(): string
    {
        return "Y-m-d";
    }

    /**
     * Returns the last id after an insert to a table
     * @return string Gets the last id
     */
    final public function getLastId(): string
    {
        $lastId = $this->fetch("SELECT last_insert_rowid() as last_id");
        return $lastId->records(0)[0]->lastId;
    }

    /**
     * Commit doesn't exist on SQlite3
     * @param null $transactionId
     * @return bool
     */
    final public function commit($transactionId = null): bool
    {
        //No commit for sqlite
        return true;
    }

    /**
     * Rollback does not exist on SQLite3
     * @param null $transactionId
     * @return bool
     */
    final public function rollback($transactionId = null): bool
    {
        //No transactions for sqlite
        return true;
    }

    /**
     * Start transaction
     * @return string
     */
    final public function startTransaction(): string
    {
        //No transactions for sqlite

        return "Resource id #0";
    }

    /**
     * Auto commit on for SQlite
     * @param bool $onState
     * @return bool
     */
    final public function autoCommit(bool $onState = false): void
    {
        //SQlite3 has no commits

    }

    /**
     * Determines the database layout in the form table -> columns
     * @return array
     */
    final public function getDatabase(): array
    {
        return (new SQLite3MetaData($this))->getDatabaseMetaData();
    }

    /**
     * SQlite3 does not have a port
     * @return int
     */
    final public function getDefaultDatabasePort(): ?int
    {
        return null;
    }

    /**
     * @param string $fieldName
     * @param int $fieldIndex
     * @return string
     */
    final public function getQueryParam(string $fieldName, int $fieldIndex): string
    {
        return ":{$fieldIndex}";
    }

    /**
     * Is it a No SQL database?
     * @return bool
     */
    final public function isNoSQL(): bool
    {
        return false;
    }
}