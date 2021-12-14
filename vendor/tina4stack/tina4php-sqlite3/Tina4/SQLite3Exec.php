<?php
/**
 * Tina4 - This is not a 4ramework.
 * Copy-right 2007 - current Tina4
 * License: MIT https://opensource.org/licenses/MIT
 */

namespace Tina4;

/**
 * Execute SQLite3 statement
 */
class SQLite3Exec extends DataConnection implements DataBaseExec
{
    use DataUtility;

    /**
     * Execute an SQLite3 statement
     * @param $params
     * @param $tranId
     * @return mixed
     */
    final public function exec($params, $tranId)
    {
        $sql = $params[0];

        $preparedQuery = $this->getDbh()->prepare($sql);

        $error = $this->getConnection()->error();

        if ($error->getError()["errorCode"] === 0 && !empty($preparedQuery)) {
            unset($params[0]);

            foreach ($params as $pid => $param) {
                if (is_numeric($param)) {
                    $preparedQuery->bindValue((string)($pid), $param, SQLITE3_FLOAT);
                } elseif (is_int($param)) {
                    $preparedQuery->bindValue((string)($pid), $param, SQLITE3_INTEGER);
                } elseif ($this->isBinary($param)) {
                    $preparedQuery->bindValue((string)($pid), $param, SQLITE3_BLOB);
                } else {
                    $preparedQuery->bindValue((string)($pid), $param, SQLITE3_TEXT);
                }
            }

            $preparedQuery->execute();
            $preparedQuery->close();
        }

        return $error;
    }
}