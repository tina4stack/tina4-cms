<?php
/**
 * Tina4 - This is not a 4ramework.
 * Copy-right 2007 - current Tina4
 * License: MIT https://opensource.org/licenses/MIT
 */

namespace Tina4;

class SQLite3Connection
{
    /**
     * Database connection
     * @var false|resource
     */
    private $connection;

    /**
     * Creates an ODBC Database Connection
     * @param string $databaseName Connection string
     */
    public function __construct(string $databaseName)
    {
        $this->connection = (new \SQLite3($databaseName)); //create the new database or open existing one
        $this->connection->busyTimeout(5000); //prevent database locks
        $this->connection->exec('PRAGMA journal_mode = wal;'); //help with concurrency
    }

    /**
     * Returns a databse connection or false if failed
     * @return false|resource
     */
    final public function getConnection()
    {
        return $this->connection;
    }
}