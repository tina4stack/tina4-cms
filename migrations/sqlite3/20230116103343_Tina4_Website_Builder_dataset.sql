CREATE TABLE `tina4site_dataset` (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    dataset_table VARCHAR(128),
    dataset_columns VARCHAR(256),
    dataset_conditions VARCHAR(256),
    code VARCHAR(32),
    class VARCHAR(128),
    type VARCHAR(128),
    created_at DATETIME
)