CREATE TABLE tina4site_page (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    cms_page_id     INTEGER references page(id),
    html       TEXT NULLABLE,
    pages      TEXT NULLABLE,
    assets     TEXT NULLABLE,
    styles     TEXT NULLABLE,
    created_at DateTime CURRENT_TIMESTAMP
)
